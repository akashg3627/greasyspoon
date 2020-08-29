import React from 'react';
import { Card, CardHeader, CardBody, Table, ButtonGroup, Button, CardFooter } from 'reactstrap';
import { Loading } from './LoadingComponent';

function RenderPendingOrder(props) {
  const handleAccept = () => {
    const orderId = props.order._id.toString();
    props.acceptOrder(orderId);
    console.log("Accepted");
  }
  const handleReject = () => {
    const orderId = props.order._id.toString();
    props.rejectOrder(orderId);
    console.log("Rejected");
  }
  const handleComplete = () => {
    const orderId = props.order._id.toString();
    props.completeOrder(orderId);
    console.log("Completed");
  }
  const dishes = props.order.dishes.map((dish) => {
    return (
      <tr>
        <td>{dish.dish_name}</td>
        <td>{dish.quantity}</td>
        <td>{dish.quantity * dish.price / 100}</td>
      </tr>
    );
  })
  return (
    <Card className="gs-color-dark">
      <CardHeader className=" row justify-content-between"><span className="col-auto">Ordered by {props.order.user_name}</span>
        <span className="col-auto">
          {new Intl.DateTimeFormat('default', {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric'
          }).format(new Date(Date.parse(props.order.time_placed)))}
        </span>
      </CardHeader>
      <CardBody>
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
              <th></th>
              <th>Total Price</th>
              <th>{props.order.total_price}</th>
            </tr>
          </tbody>
        </Table>
      </CardBody>

      {props.order.status === 0
        ?
        <CardFooter className="row justify-content-between">
          <div className="col-6">
            <Button block color="success" onClick={handleAccept} className="btn btn-sm">Accept</Button>
          </div>
          <div className="col-6">
            <Button block color="danger" onClick={handleReject} className="btn btn-sm">Reject</Button>
          </div>
        </CardFooter>
        :
        <CardFooter className="row">
          <Button block color="primary" onClick={handleComplete} className="btn btn-sm">Ready</Button>
        </CardFooter>
      }

    </Card>
  );
}
function RenderCompleteOrder({ order }) {

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
    <Card className="gs-color-dark">
      <CardHeader className=" row justify-content-between"><span className="col-auto">Ordered by {order.user_name}</span>
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
              <th>Dish Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {dishes}
            <tr>
              <th></th>
              <th>Total Price </th>
              <th>{order.total_price} </th>
            </tr>
          </tbody>
        </Table>
      </CardBody>
      <CardFooter>
        {order.status === 2
          ?
          <Button color="success" disabled className="btn btn-sm" block>Completed</Button>
          :
          <Button color="danger" disabled className="btn btn-sm" block>Rejected</Button>
        }
      </CardFooter>
    </Card>
  );
}

function OrderPanel(props) {

  if (props.orders.isLoading) {
    return <div>
      <Loading />
    </div>
  }
  else if (props.orders.orders != null) {
    const pendingOrders = props.orders.orders.map((order) => {
      if (order.status === 0 || order.status === 1) {
        return (
          <div className="col-12">
            <RenderPendingOrder order={order} acceptOrder={props.acceptOrder} rejectOrder={props.rejectOrder} completeOrder={props.completeOrder} />
          </div>
        );
      }
    });
    const completedOrders = props.orders.orders.map((order) => {
      if (order.status === 2 || order.status === -1) {
        return (
          <div className="col-12">
            <h3>Completed Orders</h3>
            <RenderCompleteOrder order={order} />
          </div>
        );
      }
    });
    return (
      <div className="container">
        <div className="row mt-2">
          {pendingOrders}
        </div>
        <div className="row mt-2">
          {completedOrders}
        </div>
      </div>
    );
  }
  else return (
    <div>No Order Yet</div>
  );
}


export default OrderPanel;