import React from 'react';
import { Card, CardHeader, CardBody, Table, ButtonGroup, Button } from 'reactstrap';
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
  const handleComplete=()=>{
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
    <Card>
      <CardHeader><span className="mr-auto">Ordered by {props.order.user_name}</span><span className="ml-auto"> {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(props.order.time_placed)))}</span> </CardHeader>
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
              <th>Total Price {props.order.total_price}</th>
              <th>
                {props.order.status === '0'
                  ?
                  <ButtonGroup>
                    <Button block color="success" onClick={handleAccept} className="btn btn-sm">Accept</Button>
                    <Button block color="danger" onClick={handleReject} className="btn btn-sm">Reject</Button>
                  </ButtonGroup>
                  :
                  <Button block color="primary" onClick={handleComplete} className="btn btn-sm">Ready</Button>
                }
              </th>
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
              <th></th>
              <th>Total Price {order.total_price}</th>
              <th>{order.status === '2'
                ?
                <Button color="success" disabled className="btn btn-sm" block>Completed</Button>
                :
                <Button color="danger" disabled className="btn btn-sm" block>Rejected</Button>
              } </th>
            </tr>
          </tbody>
        </Table>
      </CardBody>
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
      if (order.status === '0' || order.status === '1') {
        return (
          <div className="col-6">
            <RenderPendingOrder order={order} acceptOrder={props.acceptOrder} rejectOrder={props.rejectOrder} completeOrder={props.completeOrder} />
          </div>
        );
      }
    });
    const completedOrders = props.orders.orders.map((order) => {
      if (order.status === '2' || order.status === '-1') {
        return (
          <div className="col-6">
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