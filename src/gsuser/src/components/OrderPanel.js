import React from 'react';
import { Card, CardHeader, CardFooter, CardBody } from 'reactstrap';
//import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

function RenderUserProfile({ user }) {

}
/*function RenderOrder({ order }) {

}*/

function RenderCart(props) {
  const AddedDish = (dishes) => dishes.map((dish) => {
    return (
      <div key={dish._id}>
        <dl className="row p-1">
          <dt className="col-6">{dish.name}</dt>
          <dd className="col-6">Quantity: {dish.quantity}</dd>
        </dl>
      </div>
    )
  });

  if (props.cart.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  else if (props.cart.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }
  else {
    return (
      <Card>
        <CardHeader className="bg-success">Cart</CardHeader>
        {
        props.cart.cart
            ?
            <div><CardBody>
            <AddedDish dishes={props.cart.cart.dishes} />
        </CardBody>
        <CardFooter className="bg-success">Price {props.cart.cart.total_price}</CardFooter>
        </div>
        :
            <div>Empty Cart</div>
          }
      </Card>
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
              <RenderUserProfile user={props.auth.user} />
              : null
          }
        </div>
        <div className="col col-md-6">
          <RenderCart cart={props.cart} />
        </div>
      </div>
      {/*<div className="row">
        <RenderOrder order={props.order} />
  </div>*/}
    </div>
  );
}

export default OrderPanel;