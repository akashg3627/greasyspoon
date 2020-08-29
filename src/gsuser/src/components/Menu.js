import React from 'react';
import { Card, CardBody, CardImg, CardImgOverlay, CardTitle, CardHeader, Button } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom'
import { baseUrl } from '../shared/baseUrl'

const RenderCafe = ({ cafe }) => {
    return (
        <Card>
            <Link to={`/menu/${cafe._id}`} >
                <CardHeader>{cafe.name}</CardHeader>
                <CardImg width="100%" src={baseUrl + cafe.logoURL} alt={cafe.name} />
                {cafe.image
                    ?
                    <CardImgOverlay>
                        <CardTitle>{cafe.name}</CardTitle>
                    </CardImgOverlay>
                    : null}
            </Link>
        </Card>
    )
}




function Menu(props) {


    const cafe = props.cafeList.list.map((cafe) => {
        return (
            <div key={cafe._id} className="col-12 col-sm-4 col-md-3" >
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
    else if (props.cafeList.list != null)
        return (
            <div className="container">
                <div className="row">
                    {cafe}
                </div>
            </div>
        );
    else return (
        <div>No Cafe Found</div>
    );
}

export default Menu;