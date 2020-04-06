import React, {Component} from 'react';
import "./Footer.css"

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <p className="float-right">
                    © 2020 Copyright: <a href="https://www.linkedin.com/in/boris-van-norren-b14388129/"> Boris</a>
                    </p>
                </div>
            </div>
        );
    }
}

export default Footer;
