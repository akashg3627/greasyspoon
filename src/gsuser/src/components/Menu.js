import React from 'react';
import { Card, CardBody, CardImg, CardImgOverlay, CardTitle, CardHeader, Button } from 'reactstrap';
import {Loading} from './LoadingComponent';
import {Link} from 'react-router-dom'
import {baseUrl} from '../shared/baseUrl'

const RenderCafe = ({ cafe }) => {
    return (
        <Card>
            <Link to={`/menu/${cafe._id}`} >
                <CardImg width="100%" src={baseUrl + cafe.image} alt={cafe.name} />
                <CardImgOverlay>
                    <CardTitle>{cafe.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    )
}




function Menu(props) {


    const cafe = props.cafeList.list.map((cafe) => {
        return (
            <div key={cafe._id} className="col col-md-4 m-1" >
                <RenderCafe cafe={cafe} />
            </div>
        )
    })

    if (props.cafeList.isLoading) {
        return (
            <div>
                <Loading />
            </div>
        )
    }
    else if (props.cafeList.errMess) {
        return (
            <div>{props.cafeList.errMess}</div>
        )
    }
    else
        return (
            <div className="container">
                <div className="row">
                    {cafe}
                </div>
            </div>
        );
}

export default Menu;