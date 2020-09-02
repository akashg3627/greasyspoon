import React, { useState } from 'react';
import { Button, Modal, ModalBody, Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import GoogleLogin from 'react-google-login';

function LoginModal(props) {
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    }
    const responseGoogle = (res) => {
        if (res.tokenId) {
            props.loginGoogleUser({ "googleId": res.profileObj.googleId, "name": res.profileObj.name, "email": res.profileObj.email, "tokenId": res.tokenId });
        }
        else {
            console.log("Invalid");
        }
        toggleModal();
    }
    const Userlogin = () => {
        return (
            <GoogleLogin
                clientId="931450817326-25po48n0tc1q5f81e06mdgp74k2tumhh.apps.googleusercontent.com"
                render={renderProps => (
                    <button className="btn btn-danger" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google Login</button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                className="btn btn-outline-danger"
            />
        )
    };
    return (
        <div>
            {
                props.auth.isAuthenticated
                    ?
                    <Button color="link" className="nav-link btn-login" onClick={props.logoutUser}>
                        <span className="fa fa-sign-out fa-lg"></span> Logout
                    </Button>
                    :
                    <Button color="link" onClick={toggleModal} className="nav-link btn-login">
                        <span className="fa fa-sign-in fa-lg"></span> Login
                    </Button>
            }
            <Modal size="lg" isOpen={modal} toggle={toggleModal} >
                <ModalBody>
                    <div className="row align-items-center justify-content-center">
                        <span className="g">GREASY</span><span className="s-active">SPOON</span>
                    </div>
                    <div className="row align-items-center justify-content-center">
                        <Card>
                            <CardImg className="user-i" src="/user.png" alt="user" />
                            <CardBody className="text-center">
                               <CardTitle> <Userlogin /></CardTitle>
                               <CardText><small className="text-muted">Please use institute id only!</small></CardText> 
                            </CardBody>
                        </Card>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default LoginModal;