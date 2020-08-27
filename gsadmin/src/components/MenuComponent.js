import React, { Component, useState } from 'react';
import { Card, CardImg, CardTitle, Breadcrumb, BreadcrumbItem, Button, CardBody, CardText, CardImgOverlay, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


function RenderMenuItem({ dish, deleteDish }) {
function handleDishdelete() {
deleteDish(dish._id);
}
    return (
        <Card>
            
                <CardImg top width="100%" src={baseUrl + dish.pictureURL} alt={dish.dish_name} />
                <CardImgOverlay>
                    <div className="row">
                        <div className="col-auto mr-auto">
                        <Link to={`/menu/${dish._id}`} >
                            <Button className="btn btn-success" >
                                <span className="fa fa-pencil fa-lg"></span>
                            </Button>
                        </Link>
                        </div>
                        <div className="col-auto">
                            <Button className="btn btn-warning" onClick={handleDishdelete}>
                                <span className="fa fa-times"></span>
                            </Button>
                        </div>
                    </div>
                </CardImgOverlay>

                <CardBody>
                    <CardTitle>{dish.dish_name}</CardTitle>
                    <CardText>{dish.category}</CardText>
                </CardBody>
            
        </Card>
    );
}

function RenderMenu (props) {

    const [modal,setModal] = useState(false);
        const toggle = () => {
            setModal(!modal);
        }

        if (props.isLoading) {
            return (
                <div className="container gs-body">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return (
                <div className="container gs-body">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.menu != null) {
            const menu = props.menu.items.map((dish) => {
                return (                    
                <div key={dish._id} className="col py-3">
                        <RenderMenuItem dish={dish} deleteDish={props.deleteDish} />
                    </div>
);
            });
            
            return (                
            <div className="container gs-body">
                    <div className="row">
                        <Button onClick={toggle}> ADD Dish </Button>
                    </div>
                    <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4">
                        {menu}
                    </div>
                    <div>
                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader>
ADD DISH
                            </ModalHeader>
                            <ModalBody>
FORM
                            </ModalBody>
                            <ModalFooter>
<Button onClick={toggle}>Submit</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            );
        }
        else return (
            <div className="container gs-body">
                <div>No Dish Added</div>
                <div className="row">
                    <Button> ADD DISH </Button>
                </div>
            </div>
        );

} 


class MenuComponent extends Component {
    constructor(props){
        super(props);
    }

componentDidMount(){
console.log("menu entered", this.props.user);
const cafeId = this.props.user._id;
}

componentWillUnmount(){
    console.log("exit menu");
}

    render(){

        return (
<div>
<RenderMenu menu={this.props.menu} isLoading={this.props.isLoading} errMess={this.props.errMess} deleteDish={this.props.deleteDish} />
</div>
        );

    } 
}

export default MenuComponent;
