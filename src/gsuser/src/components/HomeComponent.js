import React from 'react';
import { Button } from 'reactstrap';

function HomeComponent(props) {
    return (
        <div className="container gs-container">
            <div className="row row-700">
            <div className="col-12 col-md-5 align-self-center">
            <h4><span className="line"> </span> Discover your taste</h4>
<h1><span className="space"></span>Eat healthy stay wealthy</h1>
<span className="space"></span><Button className="btn-nav">
Discover Now    <span className="fa fa-angle-right i-nav"></span>
</Button><br></br>
<span className="line"></span><span className="fa-stack ">
  <i className="fa fa-circle-o fa-stack-2x"></i>
  <i className="fa fa-twitter fa-stack-1x"></i>
</span><span className="space-s"></span><span className="fa-stack ">
  <i className="fa fa-circle-o fa-stack-2x"></i>
  <i className="fa fa-facebook fa-stack-1x"></i>
</span><span className="space-s"></span><span className="fa-stack ">
  <i className="fa fa-circle-o fa-stack-2x"></i>
  <i className="fa fa-play fa-stack-1x"></i>
</span>
            </div>
            <div className="col-12 col-md-6 box-h">
            </div>
            <div className="col-1"></div>
            </div>
        </div>
    );
}

export default HomeComponent;