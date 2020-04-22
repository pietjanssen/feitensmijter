import React, {Component} from 'react';
import './App.css';
import Footer from "./components/Footer/Footer";

const apiUrl = query =>
    `https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=${query}&rvslots=*&rvprop=content&format=json`


class App extends Component {

    async componentDidMount(): Promise<void> {
        const searchTerm = "Boris"
        const response = await fetch(apiUrl(searchTerm), {
            method: 'GET',
            mode: "no-cors",
        });
        console.log(response)
        const json: any = JSON.parse(await response.json())
        console.log(json);
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
