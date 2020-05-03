import React, {Component} from 'react';
import './App.css';
import FactItem from "./models/FactItem";
import Fact from "./components/Fact";
import Footer from "./components/Footer";

const apiUrl = "https://nl.wikipedia.org/api/rest_v1/page/random/summary"

const errorFacts: string[] = [
    "Ik heb geen idee wat dit zou moeten betekenen.",
    "Ik heb het hele universum afgezocht, maar tevergeefs.",
    "Zelfs The Dark Web heeft niets over dit onderwerp te melden.",
    "Error: 404 Not found."
]

interface IState {
    fact?: FactItem
    searchValue: string
    searching: boolean
}


class App extends Component <any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchValue: "",
            searching: false,
        }
    }

    // handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    //     this.setState({searchValue: event.target.value});
    // }
    //
    // handleSearch(text: string){
    //     if(text){
    //         this.searchFact("www.google.nl")
    //     }
    // }

    stopSearching(){
        // document.getElementById('factInput').placeholder = "Smijt er nog eentje!"
        this.setState({...this.state, searching: false, searchValue: ""})
    }

    searchFact(url: string = apiUrl){
        if (!this.state.searching) {
            this.setState({...this.state, searching: true})
            fetch(url, {
                method: 'GET'
            }).then(async (response: Response) => {
                const json: any = await response.json()
                const splitFact: string[] = json.extract.split(". ")
                const sentence1: string = splitFact[0];
                const sentence2: string = splitFact[1];
                let finalSentence: string
                if(sentence2) {
                    finalSentence = sentence1 + ". " + sentence2
                    if(finalSentence.charAt(finalSentence.length -1 ) !== ".") finalSentence = finalSentence + "."
                } else {
                    finalSentence = sentence1
                    if(finalSentence.charAt(finalSentence.length -1 ) !== ".") finalSentence = finalSentence + "."
                }

                const newFact: FactItem = {
                    id: 1,
                    text: finalSentence
                }
                this.setState({...this.state, fact: newFact})
            }).catch((error) => {
                const errorFact: FactItem = {
                    id: 1,
                    text: errorFacts[Math.floor(Math.random() * errorFacts.length)]
                }
                console.log(error)
                this.setState({...this.state, fact: errorFact})
            })
        }
    }

    render() {
        return (
            <div>
                <div id="main">
                    <div id='factContainer'>
                        <div id='innerContainer'>
                            <div id='dogEar'/>
                            <Fact fact={this.state.fact} stopSearch={this.stopSearching.bind(this)}/>
                            <button id='factButton' onClick={() => this.searchFact()} className={this.state.searching? 'hide' : ''}>
                                Smijt een feit!
                            </button>
                            {/*<form id='factForm' onSubmit={(e) => {e.preventDefault(); this.handleSearch(this.state.searchValue)}}>*/}
                            {/*    <input value={this.state.searchValue} onChange={(e) => this.handleInput(e)}*/}
                            {/*           autoFocus={false} autoComplete='off' id='factInput' type="textarea"*/}
                            {/*           className={this.state.searching? 'hide form-control' : 'form-control'}*/}
                            {/*           placeholder="Geef mij een feit over:" />*/}
                            {/*    <input type="submit" style={{width: 0, height: 0}} tabIndex={-1}/>*/}
                            {/*</form>*/}
                        </div>
                    </div>

                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
