import React, {Component} from 'react';
import './App.css';
import Footer from "./components/Footer/Footer";

const apiUrl = query =>
    `https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=${query}&rvslots=*&rvprop=content&format=json`


class App extends Component {

    componentDidMount() {
        const searchTerm = "Boris"
        fetch(apiUrl(searchTerm), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000/',
                'Access-Control-Allow-Methods': 'GET'
            }
        })
            .then(res => {
                    const data = res.data;
                    console.table(data);
                    this.setState({data: data});
                },
                (error) => {
                    this.setState({data: error});
                })
    }

    render() {
        return (
            <main role="main">
                <div className="container">
                    <div className="col-12 fact-container">
                        {/*<Fact fact={this.state.fact}/>*/}
                    </div>
                </div>
                <Footer/>
            </main>
        );
    }
}

export default App;
