import React, { Component } from 'react';
import { Card, CardImg, CardTitle, Breadcrumb, BreadcrumbItem , Button, CardBody, CardText, CardImgOverlay, CardHeader} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import dishes from '../shared/dishes';

function RenderMenuItem({ dish }) {
    return (
        <Card>
            <Link to={`/menu/${dish._id}` } >
            <CardImg top width="100%" src={baseUrl + dish.pictureURL} alt="Card image cap" />
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
                    <CardTitle>{dish.dish_name}</CardTitle>
                    <CardText>{dish.category}</CardText>
                </CardBody>
            </Link>
        </Card>
    );
}

class Menu extends Component {
    constructor(props){
        super(props);
    }
componentWillMount(){
    this.props.fetchMenu(this.props.user._id);
}


render(){
     if (this.props.menu.isLoading) {
         return (
             <div className="container gs-body">
                 <div className="row">
                     <Loading />
                 </div>
             </div>
         );
     }
     else if (this.props.menu.errMess) {
         return (
             <div className="container gs-body">
                 <div className="row">
                 <h4>{this.props.dishes.errMess}</h4>
                 </div>
            </div>
         );
 }
    else if(this.props.menu.dishes != null)
    {
        const menu = this.props.menu.dishes.map((dish) => {
            return (
                <div key={dish._id} className="col py-3">
                    <RenderMenuItem dish={dish} />
                </div>
            );
        });
        return (
            <div className="container gs-body">
                <div className="row">
<Button > ADD Dish </Button>
                </div>
                <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4">
                    {menu}
                </div>
            </div>
        );
    }
    else return(
        <div className="container gs-body">
            <div>No Dish Added</div>
            <div className="row">
<Button> ADD DISH </Button>
            </div>
        </div>
    );
}}

export default Menu;
