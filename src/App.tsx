import React, {Component} from 'react';
import './App.css';
import Footer from "../src/components/Footer";
import FactItem from "../src/models/FactItem";
import Fact from "../src/components/Fact";

const apiUrl = (query: string) =>
    `https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=${query}&rvslots=*&rvprop=content&format=json`

interface IState {
    fact?: FactItem
}


class App extends Component <any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            fact: undefined
        }
    }

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
            <div>
                <div id="main">
                    <div id='fact-container'>
                        <div id='inner-container'>
                            <div id='dog-ear'/>
                            <div className="input-group">
                                <input autoFocus={true} id='fact-input' type="text" className="form-control" placeholder="Request a fact"/>
                                    {/*<div className="input-group-append">*/}
                                    {/*    <button className="btn btn-outline-secondary" type="button">Button</button>*/}
                                    {/*</div>*/}
                            </div>
                            <Fact fact={this.state.fact}/>
                        </div>
                    </div>

                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
