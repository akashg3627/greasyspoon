import React from 'react';
import { Card, CardHeader, CardFooter, CardBody, Button } from 'reactstrap';
//import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

function RenderUserProfile({ user }) {
    if (user != null){
        return (
        <div className="cartinner">Name: {user.name}</div>
        );
    }
    else return (
        <div>Empty Cart</div>
    )
}




/*function RenderOrder({ order }) {

}*/

function RenderCart({cart}) {
  if (cart.isLoading) {
    return (
        <div className="cartinner">
        
                <Loading />

        </div>
    );
}
else if (cart.errMess) {
    return (
    
            <div className="cartinner">
                <h4>{cart.errMess}</h4>
            </div>
        
    );
}
else {
    if (cart.cart != null){
        const AddedDish = cart.cart.dishes.map((dish) => {
            return (
                <div key={dish._id}>
                    <dl className="row p-1">
                        <dt className="col-6">{dish.dish_name}</dt>
                        <dd className="col-6">Quantity: {dish.quantity}</dd>
                    </dl>
                </div>
            )
        });
        return (
        <div className="cartinner">{AddedDish}</div>
        );
    }
    else return (
        <div className="cartinner">Empty Cart</div>
    )
}
}


function OrderPanel(props) {

  return (
    <div className="container">
      <div className="row">
        <div className="col col-md-6">
          {
            props.auth.user != null ?
            <Card>
              <RenderUserProfile user={props.auth.user} />
              </Card>
              : null
          }
        </div>
        <div className="col col-md-6">
          <Card>
          <RenderCart cart={props.cart} />
          <CardFooter><Button className="btn btn-primary">Place Order</Button></CardFooter>
          </Card>
        </div>
      </div>
      {/*<div className="row">
        <RenderOrder order={props.order} />
  </div>*/}
    </div>
  );
}

export default OrderPanel;