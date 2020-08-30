import React, { useState } from 'react';
import { Button, Modal, ModalBody, Card, CardImg } from 'reactstrap';
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
                clientId="899648060120-1mcodnjvohl5rpi4rfep56ms682f20t6.apps.googleusercontent.com"
                render={renderProps => (
                    <button className="btn btn-danger" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google</button>
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
                        <span className="g">GREASY</span><span className="s">SPOON</span>
                    </div>
                    <div className="row align-items-center justify-content-center">
                        <Card>
                        </Card>
                        <Userlogin />
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default LoginModal;