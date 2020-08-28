import React from 'react';
import { Card, CardHeader, CardBody, Table } from 'reactstrap';

function RenderPendingOrder({ order }) {
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
    <Card>
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
              <td> </td>
              <th>Total Price</th>
              <th>{order.total_price}</th>
            </tr>
          </tbody>
        </Table>
      </CardBody>
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
    <Card>
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
              <td> </td>
              <th>Total Price</th>
              <th>{order.total_price}</th>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
function OrderPanel(props) {

  if (props.user != null) {
    if (props.user.orders == null) {
      return (
        <div>
          No orders placed yet
        </div>
      );
    }
    else {
      const pendingOrders = props.user.orders.map((order) => {
        if (order.status === 'pending') {
          return (
            <div>
              <RenderPendingOrder order={order} />
            </div>
          );
        }
        else return (<div>
          No pending
        </div>)
      });
      const completedOrders = props.user.orders.map((order) => {
        if (order.status === 'done') {
          return (
            <div>
              <h3>Completed Orders</h3>
              <RenderCompleteOrder order={order} />
            </div>
          );
        }
        else return (<div>
          No Order Yet
        </div>)
      });
      return (
        <div className="container">
          <div className="row">
            {pendingOrders}
          </div>
          <div className="row">
            {completedOrders}
          </div>
        </div>
      );
    }
  }
  else return (
    <div>No Order Yet</div>
  );
}


export default OrderPanel;