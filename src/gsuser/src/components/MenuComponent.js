import React from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Media, Card, CardHeader, CardFooter, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
// import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import dishes from '../shared/dishes';


function RenderCafe({ cafe }) {
    return (
        <div>
            <div>
            </div>
            <div>
            </div>
        </div>
    );

}

function RenderMenuItem({ dish }) {
    return (
        <Media tag="li" className="media-menu row align-items-center mb-1">
            <Media left middle className="col-5 col-sm-4 col-md-3">
                <Media object src={dish.image} alt="Generic placeholder image" />
            </Media>
            <Media className="col-7 col-sm-8 col-md-9">
                <Media className="row ml-1">
                    <Media body className="col-12 col-sm-7">
                        <Media heading>
                            {dish.name}
                        </Media>
                        {dish.category}
                    </Media>
                    <Media className="col-12 col-sm-5 ">
                        <Button>Quantity</Button>
                    </Media>
                </Media>
            </Media>
        </Media>
    );
}

function RenderCart({ cart }) {
    //     const AddedDish = cart.dishes.map((dish)=>{
    // return(
    //     <div key={dish._id}>
    // <dl className="row p-1">
    // <dt className="col-6">{dish.name}</dt>
    // <dd className="col-6">Quantity: {cart.quantity}</dd>
    // </dl>
    //     </div>
    // )
    //     });
    return (
        <Card>
            <CardHeader className="bg-success">Cart</CardHeader>
            <CardBody>
                <div>No dishes added</div>

            </CardBody>
            <CardFooter className="bg-success">Price</CardFooter>
        </Card>
    );
}

const Menu = (props) => {

    const menu = props.dishes.dishes.map((dish) => {
        return (
            <div key={dish._id}>
                <RenderMenuItem dish={dish} />
            </div>
        );
    });

    const cart =
    {
        dishes: [
            {
                _id: 1,
                name: 'A'
            },
            {
                _id: 1,
                name: 'A'
            }
        ],
        quantity: 5
    }


    // if (props.dishes.isLoading) {
    //     return (
    //         <div className="container">
    //             <div className="row">
    //                 <Loading />
    //             </div>
    //         </div>
    //     );
    // }
    // else if (props.dishes.errMess) {
    //     return (
    //         <div className="container">
    //             <div className="row">
    //                 <h4>{props.dishes.errMess}</h4>
    //             </div>
    //         </div>
    //     );
    // }
    // else
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Menu</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Menu</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-sm-7 offset-sm-1 mt-2">
                    {menu}
                </div>
                <div className="col-12 col-sm-4 mt-2">
                    <RenderCart cart={cart} />
                </div>

            </div>
        </div>
    );
}

export default Menu;