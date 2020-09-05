import React from 'react';
import {Link} from 'react-router-dom';

function Footer(props) {
    return (
        <div className="footer">
            <div className="container">
                <div className="row justify-content-center">             
                    <div className="col-4 offset-1 col-sm-2">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/aboutus">About Us</Link></li>
                            <li><Link to="/menu">Menu</Link></li>
                            <li><Link to="/order">Order</Link></li>
                        </ul>
                    </div>
                    <div className="col-7 col-sm-5">
                        <h5>Our Address</h5>
                        <address>
                        Indian Institute of Technology, Indore<br />
                        Simrol campus<br />
                        Indore (M.P.)<br />
                        <i className="fa fa-phone fa-lg"></i>: +91 8770423627<br />
                        <i className="fa fa-fax fa-lg"></i>: +91 9711993343<br />
                        <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:greasyspoon@gmail.com">
                            greasyspoon@gmail.com</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-4 align-self-center">
                        <div className="text-center">
                            <a className="btn btn-social-icon btn-google" target="parent" href="http://google.com"><i className="fa fa-google-plus"></i></a>
                            <a className="btn btn-social-icon btn-facebook" target="parent" href="http://www.facebook.com"><i className="fa fa-facebook"></i></a>
                            <a className="btn btn-social-icon btn-linkedin" target="parent" href="http://www.linkedin.com"><i className="fa fa-linkedin"></i></a>
                            <a className="btn btn-social-icon btn-twitter" target="parent" href="http://twitter.com"><i className="fa fa-twitter"></i></a>
                            <a className="btn btn-social-icon btn-google" target="parent" href="http://youtube.com"><i className="fa fa-youtube"></i></a>
                            
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">             
                    <div className="col-auto">
                        <p>© Copyright 2020 @GREASYSPOON</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;