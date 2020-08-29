import React from 'react';
import { Card, CardHeader, CardFooter, CardBody, Button, Table } from 'reactstrap';
//import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

function RenderUserProfile({ user }) {
    if (user != null){
        return (
          <Card className="cartinner">
            <CardBody>
              <dl className="row p-1">
                <dt className="col">Name: </dt>
                <dd className="col">{user.name} </dd>
              </dl>
              <dl className="row p-1">
                <dt className="col">Mobile No: </dt>
        <dd className="col">{user.number}</dd>
              </dl>
              <dl className="row p-1">
                <dt className="col">Email Id: </dt>
                <dd className="col">{user.email}</dd>
              </dl>
            </CardBody>
          </Card>
        );
    }
    else return (
        <div>Empty Cart</div>
    )
}

function RenderOrder (props){
  if(props.orders.isLoading)
  {
    return (
      <div>
        <Loading />
      </div>
    )
  }
  else if(props.orders.orders != null)
  {
    const pendingOrders = props.orders.orders.map((order)=>{
      if(order.status == 0)
      return (
        <div>
        <RenderOrderItem order={order} />
        </div>
        )
      else return(
        <div></div>
      )
    })
    const completedOrders = props.orders.orders.map((order)=>{
      if(order.status == 2)
      return (
        <div>
        <RenderOrderItem order={order} />
        </div>
        )
      else return(
        <div></div>
      )
    })
    return (
<div className="col-12 ">
  <h2>Pending Orders</h2>
  <div>
  {pendingOrders}
  </div>
  <h2>Completed Orders</h2>
  <div>
{completedOrders}
  </div>
</div>
    );
  }
  else return(
    <div>
      No order found
    </div>
  )
}


function RenderOrderItem({ order }) {
  const dishes = order.dishes.map((dish) => {
    return (
      <tr>
        <td>{dish.dish_name}</td>
        <td>{dish.quantity}</td>
        <td>{dish.quantity * dish.price / 100}</td>
      </tr>
    );
  })
  return (
    <Card className="mt-2">
      <CardBody className="cartinner">
        <Table>
          <thead>
            <tr>
              <th>Dish Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {dishes}
            <tr>
              <td> </td>
              <th>Total Price</th>
              <th>{order.total_price / 100}</th>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}

function RenderCart({cart}) {
  if (cart.isLoading) {
    return (
        <div className="cartinner">
        
                <Loading />

        </div>
    );
}
else if (cart.cart != null){
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
        <CardBody>{AddedDish}</CardBody>
        );
    }
    else return (
      <CardBody>Empty Cart</CardBody>
    )
}


function OrderPanel(props) {
  function handleOrder(){
    props.postOrder();
  }

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
          <Card className="cartinner">
            <CardHeader>Cart</CardHeader>
          <RenderCart cart={props.cart} />
          <CardFooter><Button onClick={handleOrder} className="btn" color="primary">Place Order</Button></CardFooter>
          </Card>
        </div>
      </div>
     <div className="row">
        <RenderOrder orders={props.orders} />
        </div>
        </div>
  );
}

export default OrderPanel;