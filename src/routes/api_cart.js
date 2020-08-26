const {
    ensureUser
} = require('../config/auth');
const {
    Cafe
} = require('../models/Cafe');
const {
    Cart,
    cartDish
} = require('../models/Cart');

const Dish = require('../models/Dish');
const Menu = require('../models/Menu');
const router = require('express').Router();
var bodyParser = require('body-parser')

router.use(bodyParser.json())
    //only one cart allowed
router.get('/', ensureUser, async(req, res) => {
    try {

        var cart = await Cart.findOne({
            user_id: req.user._id
        }).exec();
        if (cart) {
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({
                message: 'cart not found'
            })
        }
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});

router.post('/', ensureUser, async(req, res) => {
    //mantain only one cart at a time
    //find all carts first
    //make sure only one cart is present at a time
    console.log('the req body is', req.body)
    if (!req.body.cafe_id || !req.body.dish_id) {
        return res.status(404).json({
            error: 'cafe_id and dish_id required in body of the post request.'
        })
    }
    let workingMenu;
    try {
        workingMenu = await Menu.findOne({
            cafe_id: req.body.cafe_id
        }).exec();
    } catch (err) {
        console.log(err.message);
    }
    if (!workingMenu) {
        res.status(404).json({
            error: 'Menu not found'
        })
    }
    Cart.findOne({
        user_id: req.user._id,
    }, async(err, cart) => {
        if (err) {
            console.log(err)
            return res.status(501).json({
                error: err.message
            });
        }
        console.log(workingMenu.items);
        let dish = await workingMenu.items.id(req.body.dish_id);
        dish = JSON.parse(JSON.stringify(dish))
        console.log('the dish is', dish);
        if (dish == undefined
            //||!dish.availablity
        ) {
            return res.status(405).send({
                error: 'Unable to add to cart,either it is not available or dish id is invalid'
            });
        }
        dish.dish_id = dish._id;
        delete dish._id;
        // for (let i = 0; i < workingMenu.items.length; i++) {
        //     let workingDish = workingMenu.items[i];
        //     if (workingDish._id == req.params.dish_id) {
        //         dish = workingMenu.items[i];
        //         break;
        //     }

        // }
        let cafe_id = req.body.cafe_id;
        if (cart) {
            console.log(cart)
            if (cart.cafe_id == cafe_id) {
                let dishesCopy = JSON.parse(JSON.stringify(cart.dishes));
                let dishExists = false;
                for (let index = 0; index < dishesCopy.length; index++) {
                    if (dishesCopy[index].dish_id == dish.dish_id) {
                        dishExists = true;
                        dishesCopy[index].quantity++;
                        break;
                    }

                }
                if (!dishExists) {
                    let tobepushed = new cartDish({
                        quantity: 1,
                        ...dish
                    })
                    dishesCopy.push(tobepushed);
                }
                cart.total_price = Number(cart.total_price) + Number(dish.price);

                cart.dishes = dishesCopy;
                try {
                    const newCart = await cart.save();
                    res.json({
                        success: 'added successfully',
                        cart: newCart
                    });
                } catch (err) {
                    res.status(500).json({
                        error: 'Unable to add',
                        err: err.message
                    })
                }



            } else {
                // contains dish of some other cafe //overwrite it 
                const tobepushed = new cartDish({
                    quantity: 1,
                    ...dish
                })
                cart.overwrite({
                    user_id: req.user._id,
                    cafe_id,
                    total_price: Number(dish.price),
                    dishes: [tobepushed]
                });

                try {
                    const newCart = await cart.save();
                    await res.status(200).json({
                        success: 'added successfully',
                        cart: newCart
                    });
                } catch (err) {
                    await res.status(500).json({
                        error: 'Unable to add',
                        err: err.message
                    })
                };
            }
        } else { //no cart for the user
            const tobepushed = new cartDish({
                quantity: 1,
                ...dish
            })
            let newCart = new Cart({
                user_id: req.user._id,
                cafe_id,
                total_price: Number(dish.price),
                dishes: [tobepushed]
            })
            try {
                const newCart1 = await newCart.save();
                res.json({
                    success: 'added successfully',
                    cart: newCart1
                });
            } catch (err) {
                res.status(500).json({
                    error: 'Unable to add',
                    err: err.message
                })
            }

        }


    })
})

router.delete('/:dish_id/', ensureUser, async(req, res) => {
    try {
        let resp1 = await Cart.updateOne({
            user_id: req.user._id,
            "dishes.dish_id": req.params.dish_id
        }, {
            $inc: {
                "dishes.$.quantity": -1
            }
        }).exec();
        if (!resp1.nModified) {
            let cart = await Cart.findOne({
                user_id: req.user._id
            });
            return res.status(200).json({

                error: 'Cart is unchanged. Please check if the dish exists or dishid is correct',
                cart
            });
        }
        let resp2 = await Cart.findOneAndUpdate({
            user_id: req.user._id
        }, {
            $pull: {
                dishes: {
                    quantity: {
                        $lte: 0
                    }
                }
            }
        }, {
            new: true
        }).exec()
        const reducer = (accumulator, item) => {
            console.log(accumulator);
            return accumulator + (item.quantity) * (item.price);

        };
        resp2.total_price = resp2.dishes.reduce(reducer, 0);
        let newCart = await resp2.save();
        res.json({
            message: 'removed one instance of the dish',
            cart: newCart
        })
    } catch (err) {
        console.log(err);

        res.status(500).json({
            error: 'Unable to remove dish',
            err: err.message,
            cart
        });
    }
});

router.delete('/:dish_id/all', ensureUser, (req, res) => {
    Cart.findOneAndUpdate({
        user_id: req.user._id
    }, {
        $pull: {
            dishes: {
                dish_id: req.params.dish_id
            }
        },
        $set: {
            total_price: 0
        }
    }, {
        new: true
    }, (err, result) => {
        if (err) throw err;
        else {
            console.log(result);
            res.status(200).json({
                message: 'removed all instances of the dish',
                cart: result
            });
        }
    })
});
module.exports = router