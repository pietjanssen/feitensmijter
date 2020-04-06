import React, {Component} from 'react';
import './App.css';
import Fact from './components/Fact/Fact';
import Footer from "./components/Footer/Footer";
import axios from 'axios';

class App extends Component {

    state = {
        fact: {
            id: 1,
            text: "Boris is de beste."
        }
    };

    // componentDidMount() {
    //     axios.get('https://jsonplaceholder.typicode.com/todos')
    //         .then(res => this.setState({fact: res.data}))
    // }

    render() {
        return (
            <main role="main">
                <div className="container">
                    <Fact fact={this.state.fact}/>
                </div>
                <Footer/>
            </main>
        );
    }
}

export default App;
