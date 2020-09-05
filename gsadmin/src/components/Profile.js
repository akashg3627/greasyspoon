import React from 'react';
import { CardImg, Card, CardHeader, CardBody} from 'reactstrap';

function RenderProfile({profile}) {
    return(
<div className="row">
                <div className="col-12 col-sm-4 offset-sm-1">
                <Card>
                <CardImg top width="100%" src={profile.image} alt="Card image cap" />
            </Card>
                </div>
                <div className="col-12 col-sm-5 offset-sm-1">
                <Card>
    <CardHeader className="bg-primary text-white">{profile.name}</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Email Address</dt>
    <dd className="col-6">{profile.email}</dd>
                                <dt className="col-6">Contact No.</dt>
                                <dd className="col-6">{profile.telenum}</dd>
                                <dt className="col-6">Follow us on</dt>
                                <dd className="col-6"></dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
            </div>
    );
}




function Profile(props) {
    return (
        <div className="container">
            <RenderProfile profile= {this.props.profile} />
        </div>
    );
}

export default Profile;