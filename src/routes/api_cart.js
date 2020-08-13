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
//only one cart allowed
router.get('/', ensureUser, async(req, res) => {
    try {

        var cart = await Cart.findOne({
            user_id: req.user._id
        }).exec();
        if (cart) {
            res.send(cart);
        } else {
            res.status(404).json({
                message: 'cart not found'
            })
        }
    } catch (err) {
        res.send(err);
    }
});

router.post('/:cafe_id/:dish_id', ensureUser, async(req, res) => {
    //mantain only one cart at a time
    //find all carts first
    //make sure only one cart is present at a time
    let workingMenu = Menu.findOne({
        cafe_id: req.params.cafe_id
    });

    Cart.findOne({
        user_id: req.user._id,
    }, async(err, cart) => {
        if (err) {
            console.log(err)
            res.status(501).send('error');
        }
        let dish = workingMenu.items.id(req.params.dish_id);
        let cafe_id = req.params.cafe_id;
        if (cart) {
            if (cart.cafe_id == cafe_id) {
                let dishesCopy = JSON.parse(JSON.stringify(cart.dishes));
                let dishExists = false;
                for (let index = 0; index < dishesCopy.length; index++) {
                    if (dishesCopy[index].dish_id == dish._id) {
                        dishExists = true;
                        dishesCopy[index].quantity++;
                        break;
                    }

                }
                if (!dishExists) {
                    let tobepushed = new cartDish({
                        quantity: 1,
                        dish_id: dish._id,
                        dish_name: dish.dish_name,
                        cafe_id: dish.cafe_id,
                        price: dish.price,
                        availablity: dish.availablity,
                        totalRating: dish.totalRating,
                        ratingCount: dish.ratingCount,
                        pictureURL: dish.pictureURL,
                    })
                    dishesCopy.push(tobepushed);
                }
                cart.total_price = cart.total_price + dish.price;

                cart.dishes = dishesCopy;
                cart.save();
            } else {
                // contains dish of some other cafe //overwrite it 
                const tobepushed = new cartDish({
                    quantity: 1,
                    dish_id: dish._id,
                    dish_name: dish.dish_name,
                    cafe_id: dish.cafe_id,
                    price: dish.price,
                    availablity: dish.availablity,
                    totalRating: dish.totalRating,
                    ratingCount: dish.ratingCount,
                    pictureURL: dish.pictureURL,
                })
                cart.overwrite({
                    user_id: req.user._id,
                    cafe_id,
                    total_price: dish.price,
                    dishes: [tobepushed]
                });
                await cart.save();
            }
        } else { //no cart for the user
            const tobepushed = new cartDish({
                quantity: 1,
                dish_id: dish._id,
                dish_name: dish.dish_name,
                cafe_id: dish.cafe_id,
                price: dish.price,
                availablity: dish.availablity,
                totalRating: dish.totalRating,
                ratingCount: dish.ratingCount,
                pictureURL: dish.pictureURL,
            })
            let newCart = new Cart({
                user_id: req.user._id,
                cafe_id,
                total_price: dish.price,
                dishes: [tobepushed]
            })
            newCart.save();
        }


    })
})

router.delete('/:dish_id/', ensureUser, async(req, res) => {
    try {
        await Cart.updateOne({
            user_id: req.user._id,
            "dishes.dish_id": req.params.dish_id
        }, {
            $inc: {
                "dishes.$.quantity": -1
            }
        }).exec();
        await Cart.updateOne({
            user_id: req.user._id
        }, {
            $pull: {
                dishes: {
                    quantity: 0
                }
            }
        }).exec()
        res.json({
            message: 'removed one instance of the dish'
        })
    } catch (err) {
        res.send(err);
    }
});

router.delete('/:dish_id/all', ensureUser, (req, res) => {
    Cart.updateOne({
        user_id: req.user._id
    }, {
        $pull: {
            dishes: {
                dish_id: req.params.dish_id
            }
        }
    }, (err, result) => {
        if (err) throw err;
        else {
            console.log(result);
            res.send(result);
        }
    })
});
module.exports = router