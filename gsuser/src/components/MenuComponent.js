import React from 'react';
import { Button, Media, Card, CardHeader, CardFooter, CardBody, ButtonGroup, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { reduceCartdish } from '../redux/ActionCreators';
import { baseUrl } from '../shared/baseUrl'



function RenderCafe({ cafe }) {

    if (cafe != null)
        return (
            <Media className="media-menu col-12 justify-content-center">
                <Media heading className="text-align-center">
                    {cafe.name}
                </Media>
            </Media>
        );
    else return (<div>
        cafe detail not found
    </div>);

}

function RenderMenuItem({ dish, reduceCartdish, postCart }) {
    function handlepost() {
        postCart(dish._id, dish.cafe_id);
    };
    function handledelete() {
        reduceCartdish(dish._id);
    };
    return (
        <Media tag="li" className="media-menu row align-items-center mb-1">
            <Media left className="mr-2">
                <Media object src={baseUrl + dish.pictureURL} alt={dish.dish_name} className="menuImage" />
            </Media>

            <Media middle body className=" ml-5">
                <Media heading>
                    {dish.dish_name}
                </Media>
                {dish.category}
                    Price  Rs {dish.price / 100}
            </Media>

            <Media right className="mr-5">
                <ButtonGroup size="sm">
                    <Button onClick={handledelete} color="danger"><span className="fa fa-minus fa-lg"> </span></Button>
                    <Button onClick={handlepost} color="light"><span className="fa fa-plus fa-lg"> </span></Button>
                </ButtonGroup>
            </Media>
        </Media >
    );
}

function RenderCart({ cart }) {

    if (cart.isLoading) {
        return (
            <div className="cartinner">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (cart.cart != null) {
        const AddedDish = cart.cart.dishes.map((dish) => {
            return (
                <div key={dish._id}>
                    <dl className="row p-1">
                        <dt className="col-4">{dish.dish_name}</dt>
                        <dd className="col-4">Quantity: {dish.quantity}</dd>
                        <dd className="col-4">Rs. {dish.quantity * dish.price / 100}</dd>
                    </dl>
                </div>
            )
        });
        return (
            <div>
                <CardBody className="cartinner">
                    {AddedDish}
                </CardBody>
                <CardFooter className="bg-info">Total Price    Rs. {cart.cart != null ? cart.cart.total_price / 100 : 0} <Link to="/order"><Button className="btn float-right" color="light">Order</Button></Link> </CardFooter>
            </div>
        );
    }
    else return (
        <CardBody className="cartinner">Empty Cart</CardBody>
    )


}

const MenuComponent = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <RenderCafe cafe={props.cafe} />
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.cafemenu != null) {
        const menu = props.cafemenu.items.map((dish) => {
            return (
                <div key={dish._id}>
                    <RenderMenuItem dish={dish} reduceCartdish={props.reduceCartdish} postCart={props.postCart} />
                </div>
            );
        });
        return (
            <div className="container gs-container">
                <div className="row"><RenderCafe cafe={props.cafe} /></div>
                <div className="row">
                    <div className="col-12 col-sm-7 offset-md-1 mt-2">
                        {menu}
                    </div>
                    <div className="col-12 col-sm-4 mt-2">
                        <Card>
                            <CardHeader className="bg-info">Cart</CardHeader>
                            <RenderCart cart={props.cart} />
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
    else return (
        <div className="container">
            <RenderCafe cafe={props.cafe} />
            <div className="row">
                <h4> No Dish Found</h4>
            </div>
        </div>
    );
}

export default MenuComponent;