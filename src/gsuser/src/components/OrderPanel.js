import React from 'react';
import { Card, CardHeader, CardFooter, CardBody, Media, Button } from 'reactstrap';
import {baseUrl} from '../shared/baseUrl';
function RenderMenuItem({ dish, deleteFavorite }) {
    return(
        <Media tag="li">
            <Media left middle>
                <Media object src={baseUrl + dish.image} alt={dish.name} />
            </Media>
            <Media body className="ml-5">
                <Media heading>{dish.name}</Media>
                <p>{dish.description}</p>
                <Button outline color="danger" onClick={() => deleteFavorite(dish._id)}>
                    <span className="fa fa-times"></span>
                </Button>
            </Media>
        </Media>
    );
}

function RenderCart ({cart}){
  return(
    <Card>
      <CardHeader>Current Cart</CardHeader>
      <CardBody>

      </CardBody>
      <CardFooter>Place Order</CardFooter>
    </Card>
  )
}


function OrderPanel(props) {
    
    return (
        <div className="container">
      Hello {props.user}
    </div>  
    );
}

export default OrderPanel;