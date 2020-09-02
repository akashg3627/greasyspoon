import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, CardHeader } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom'
import { baseUrl } from '../shared/baseUrl';


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
            <div key={cafe._id} className="col-12 col-sm-6 col-md-4 py-3" >
                <RenderCafe cafe={cafe} />
            </div>
        )
    })

    if (props.cafeList.isLoading) {
        return (
            <div className="Error">
                <Loading />
            </div>
        )
    }
    else if (props.cafeList.list != null)
        return (
            
            <div className="container-fluid gs-container">
                <div className="row ">
                    {cafe}
                </div>
            </div>
            
        );
    else return (
        <div className="container-fluid Error">No Cafe Found</div>
    );
}

export default Menu;