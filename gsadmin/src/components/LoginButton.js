import React, { useState } from 'react';
import { Nav, Button, Modal, Card, ModalHeader, NavItem, TabContent, TabPane, ModalBody, Media } from 'reactstrap';
import SignIn from './SignIn';
import SignUp from './SignUp';

function LoginButton(props) {
    
    const [activeTab, setActive] = useState("1");
    const toggleTab = tab => {
        if (activeTab !== tab)
            setActive(tab);
    }
    return (
        <div>
            {props.user != null
                ?
                <Button color="link" className="nav-link btn-login" style={{ color: 'white' }} onClick={props.logout}>
                    <span className="fa fa-sign-out fa-lg"></span> Logout
                </Button>
                :
                <Button color="link" className="nav-link btn-login" onClick={props.toggleModal}>
                    <span className="fa fa-sign-in fa-lg"></span> Login
                </Button>
            }
            <Modal isOpen={props.loginmodal} toggle={props.toggleModal} size="lg" >
                <div className="row justify-content-around mt-3">
                    <div className="col-4">
                        <Button outline block color="link" onClick={() => toggleTab("1")} >SignIn</Button>
                    </div>
                    <div className="col-4">
                        <Button block outline color="link" onClick={() => toggleTab("2")} >SignUp</Button>
                    </div>
                </div>
                <ModalBody>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Card>
                            <SignIn signin={props.signin} toggleModal={props.toggleModal} />
                        </Card>
                    </TabPane>
                    <TabPane tabId="2">
                        <Card>
                            <SignUp signup={props.signup} toggleModal={props.toggleModal} />
                        </Card>
                    </TabPane>
                </TabContent>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default LoginButton;