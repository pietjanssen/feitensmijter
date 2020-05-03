import React, {Component} from 'react';
import './App.css';
import Footer from "../src/components/Footer";
import FactItem from "../src/models/FactItem";
import Fact from "../src/components/Fact";

const apiUrl = (query: string) =>
    `https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=${query}&rvslots=*&rvprop=content&format=json`

const errorFacts: string[] = [
    "Ik heb geen idee wat dit zou moeten betekenen.",
    "Ik heb het hele universum afgezocht, maar tevergeefs.",
    "Zelfs The Dark Web heeft niets over dit onderwerp te melden.",
    "Error: 404 Not found."
]

interface IState {
    fact?: FactItem
}


class App extends Component <any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {}
    }

    searchFact(){
        const currentComponent = this;
        const searchTerm = "Boris"
        const search: string = apiUrl(searchTerm)

        fetch(search, {
            method: 'GET'
        }).then(async (response: Response) => {
            const json: any = JSON.parse(await response.json())
            console.log(json);
        }).catch((error) => {
            const errorFact: FactItem = {
                id: 1,
                text: errorFacts[Math.floor(Math.random() * errorFacts.length)]
            }
            console.log(error)
            currentComponent.setState({...this.state, fact: errorFact})
        })
    }

    render() {
        return (
            <div>
                <div id="main">
                    <div id='fact-container'>
                        <div id='inner-container'>
                            <div id='dog-ear'/>
                            <div className="input-group">
                                <input autoFocus={true} id='fact-input' type="text" className="form-control"
                                       placeholder="Request a fact" onMouseEnter={() => this.searchFact()}/>
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
