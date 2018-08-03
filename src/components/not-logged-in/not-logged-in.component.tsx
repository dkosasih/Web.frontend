import { ComponentAuth } from 'auth/auth';
import * as React from 'react';

class NotLoggedIn extends React.Component<ComponentAuth> {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-offset-4 col-md-4">
                        <div className="loading center-block">
                            {!this.props.auth!.isAuthenticated() && ("Please login to view products")}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default NotLoggedIn;