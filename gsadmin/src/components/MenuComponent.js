import React from 'react';
import { Card, CardImg, CardTitle, Breadcrumb, BreadcrumbItem , Button, CardBody, CardText, CardImgOverlay, CardHeader} from 'reactstrap';
import { Link } from 'react-router-dom';
// import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import dishes from '../shared/dishes';

function RenderMenuItem({ dish }) {
    return (
        <Card>
            <Link to={`/menu/${dish._id}` } >
            <CardImg top width="100%" src={dish.image} alt="Card image cap" />
                <CardImgOverlay>
                    <div className="row">
                        <div className="col-auto mr-auto">
                        <Button outline color="success" active>                                   
                    <span className="fa fa-pencil fa-lg"></span>
                </Button>
                        </div>
                        <div className="col-auto">
                        <Button outline color="warning" active>                                   
                    <span className="fa fa-times"></span>
                </Button>
                        </div>
                    </div>
                </CardImgOverlay>
                
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.category}</CardText>
                </CardBody>
            </Link>
        </Card>
    );
}

const Menu = (props) => {

    const menu = props.dishes.map((dish) => {
        return (
            <div key={dish._id} className="col py-3">
                <RenderMenuItem dish={dish} />
            </div>
        );
    });

    // if (props.dishes.isLoading) {
    //     return (
    //         <div className="container">
    //             <div className="row">
    //                 <Loading />
    //             </div>
    //         </div>
    //     );
    // }
    // else if (props.dishes.errMess) {
    //     return (
    //         <div className="container">
    //             <div className="row">
    //                 <h4>{props.dishes.errMess}</h4>
    //             </div>
    //         </div>
    //     );
    // }
    // else
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4">
                    {menu}
                </div>
            </div>
        );
}

export default Menu;