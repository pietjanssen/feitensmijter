import React, {Component} from 'react';
import "./Fact.css"

class Fact extends Component {

    render() {
        return (
            <div className="Fact">
                <p>{this.props.fact.text}</p>
            </div>
        );
    }
}

export default Fact;