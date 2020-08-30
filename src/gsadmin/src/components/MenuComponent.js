import React, { useState } from 'react';
import { Card, CardImg, CardTitle, Breadcrumb, BreadcrumbItem, Button, CardBody, CardText, CardImgOverlay, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import DishPost from './DishPost';
import EditDish from './EditDish';

function RenderMenuItem({ dish, deleteDish, addDishWI, editDishWI }) {
    function handleDishdelete() {
        deleteDish(dish._id);
    }
    const [editmodal, setEditModal] = useState(false);
    const toggleEdit = () => {
        setEditModal(!editmodal);
    }
    return (
        <Card>
            {dish.pictureURL ? <CardImg top width="100%" src={baseUrl + dish.pictureURL} alt={dish.dish_name} /> : null}
            <CardImgOverlay>
                <div className="row">
                    <div className="col-auto mr-auto">
                        <Button className="btn btn-success" onClick={toggleEdit}>
                            <span className="fa fa-pencil fa-lg"></span>
                        </Button>
                        <Modal isOpen={editmodal} toggle={toggleEdit}>
                            <ModalHeader>
                                EDIT DISH
                </ModalHeader>
                            <ModalBody>
                                <EditDish dish={dish} editDishWI={editDishWI} toggleEdit={toggleEdit} />
                            </ModalBody>
                        </Modal>
                    </div>
                    <div className="col-auto">
                        <Button className="btn btn-warning" onClick={handleDishdelete}>
                            <span className="fa fa-times"></span>
                        </Button>
                    </div>
                </div>
            </CardImgOverlay>

            <CardBody className="gs-color-dark">
                <CardTitle>{dish.dish_name}</CardTitle>
                <CardText>{dish.category}  Price: Rs. {dish.price / 100}
                </CardText>
            </CardBody>

        </Card>
    );
}

function RenderAddDish({ addDishWI }) {
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    }

    return (
        <div>
            <Button onClick={toggle} className="btn" color="primary" > ADD DISH </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>
                    ADD DISH
                </ModalHeader>
                <ModalBody>
                    <DishPost addDishWI={addDishWI} />
                </ModalBody>
            </Modal>
        </div>
    );
}

const MenuComponent = (props) => {
    if (props.isLoading) {
        return (
            <div className="container gs-body">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.menu != null) {
        const menu = props.menu.items.map((dish) => {
            return (
                <div key={dish._id} className="col py-3">
                    <RenderMenuItem dish={dish} deleteDish={props.deleteDish} addDishWI={props.addDishWI} editDishWI={props.editDishWI} />
                </div>
            );
        });

        return (
            <div className="container gs-body">
                <div className="row">
                    <RenderAddDish addDishWI={props.addDishWI} />
                </div>
                <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4">
                    {menu}
                </div>
            </div>
        );
    }
    else return (
        <div className="container gs-body gs-error">
            <div>No Dish Added</div>
            <RenderAddDish addDishWI={props.addDishWI} />
        </div>
    );

}


export default MenuComponent;
