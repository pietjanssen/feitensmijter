import React, {Component} from 'react';

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