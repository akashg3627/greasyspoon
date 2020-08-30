import React from 'react';
import { Card, CardHeader, CardFooter, CardBody, Button, Table } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Link } from 'react-router-dom'
import { Loading } from './LoadingComponent';

function RenderUserProfile({ user }) {
  if (user != null) {
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

function RenderOrder(props) {
  if (props.orders.isLoading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }
  else if (props.orders.orders != null) {
    const yourOrders = props.orders.orders.map((order) => {
        return (
          <div>
            <RenderOrderItem order={order} />
          </div>
        )
    })
    return (
      <div className="col-12 ">
        <div>
          {yourOrders}
        </div>
      </div>
    );
  }
  else return (
    <div>
      No order found
    </div>
  )
}


function RenderOrderItem({ order }) {
  const Status = () => {
    switch (order.status) {
      case 1:
        return <Button className="btn btn-sm" disabled color="primary" block>Accepted</Button>
      case 2:
        return <Button className="btn btn-sm" disabled color="success" block>Completed</Button>
      case -1:
        return <Button className="btn btn-sm" disabled color="danger" block>Rejected</Button>
      default:
        return <Button className="btn btn-sm" disabled color="warning" block>Pending</Button>
    }
  }

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
    <Card className="cartinner mt-2">
      <CardHeader className=" row justify-content-between"><span className="col-auto">{order.cafe_name ? <div>Ordered @ <Link to={`/menu/${order.cafe_id}`} >{order.cafe_name}</Link></div> : null}</span>
        <span className="col-auto">
          {new Intl.DateTimeFormat('default', {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric'
          }).format(new Date(Date.parse(order.time_placed)))}
        </span>
      </CardHeader>
      <CardBody>
        <Table>
          <thead>
            <tr>
              <th scope="col">Dish Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {dishes}
            <tr>
              <th scope="row"> </th>
              <th>Total Price</th>
              <th>{order.total_price / 100}</th>
            </tr>
          </tbody>
        </Table>
      </CardBody>
      <CardFooter>
        <Status />
      </CardFooter>
    </Card>
  );
}

function RenderCart({ cart }) {
  if (cart.isLoading) {
    return (
      <div className="cartinner">

        <Loading />

      </div>
    );
  }
  else if (cart.cart != null) {
    const AddedDish = cart.cart.dishes.map((dish) => {
      return (
        <div key={dish._id}>
          <dl className="row p-1">
            <dt className="col-6">{dish.dish_name}</dt>
            <dd className="col-3">Quantity: {dish.quantity}</dd>
      <dd className="col-3"> Rs. {dish.price * dish.quantity /100}</dd>
          </dl>
        </div>
      )
    });
    return (
      <CardBody>
        {AddedDish}
        <div className="row">
          <dt className="col-6"></dt>
          <dt className="col-3">Total Price</dt>
          <dt className="col-3">Rs. {cart.cart.total_price / 100} </dt>
        </div>
      </CardBody>
    );
  }
  else return (
    <CardBody>Empty Cart</CardBody>
  )
}


function OrderPanel(props) {
  function handleOrder() {
    props.postOrder();
  }

  return (
    <div className="container gs-container">
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
            <CardFooter className="row"><Button block onClick={handleOrder} className="btn btn-block" color="primary">Place Order</Button></CardFooter>
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