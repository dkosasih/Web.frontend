import * as React from 'react';
import logo from '../../logo.svg';
import './callback.component.css';

class Callback extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-offset-4 col-md-4">
                        <div className="loading center-block">
                            <img src={logo} className="App-logo" alt="logo" /><br />
                            Please wait while we are processing your request
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Callback;