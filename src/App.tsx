import React, {Component} from 'react';
import './App.css';
import FactItem from "./models/FactItem";
import Fact from "./components/Fact";

const randomApiUrl: string = "https://nl.wikipedia.org/api/rest_v1/page/random/summary"
const apiUrl = (query: string): string => `https://nl.wikipedia.org/api/rest_v1/page/summary/${query}`

const errorFacts: string[] = [
    "Ik heb geen idee wat dit zou moeten betekenen.",
    "Ik heb het hele universum afgezocht, maar tevergeefs.",
    "Zelfs The Dark Web heeft niets over dit onderwerp te melden.",
    "Error: 404 Not found."
]

const jokes: string[] = [
    "Kaylee is van oorsprong een Ierse of Engelse voornaam. Over het algemeen wordt de naam uitgesproken als Kay-Lee."
]

interface IState {
    fact?: FactItem
    searchValue: string
    searching: boolean
    inputPlaceholder: string
}


class App extends Component <any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchValue: "",
            searching: false,
            inputPlaceholder: "Smijt mij een feit over:"
        }
    }

    handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({searchValue: event.target.value});
    }

    handleSearch(text: string){
        if(text){
            if (text.toLowerCase() === 'kaylee'){
                if (!this.state.searching) {
                    this.setState({...this.state, searching: true})
                    const newFact: FactItem = {
                        id: 1,
                        text: jokes[0]
                    }
                    this.setState({...this.state, fact: newFact})
                }
            } else {
                this.searchFact(apiUrl(text))
            }
        }
    }

    stopSearching(){
        this.setState({...this.state, searching: false, searchValue: ""})
    }

    searchFact(url: string){
        if (!this.state.searching) {
            this.setState({...this.state, searching: true})
            fetch(url, {
                method: 'GET'
            }).then(async (response: Response) => {
                const json: any = await response.json()
                const splitFact: string[] = json.extract.split(". ")
                const sentence1: string = splitFact[0];
                const sentence2: string = splitFact[1];
                const sentence3: string = splitFact[2];
                let finalSentence: string
                if(sentence3 && (sentence1 + sentence2 + sentence3).length < 40) {
                    finalSentence = sentence1 + ". " + sentence2 + ". " + sentence3
                }
                else if(sentence2) {
                    finalSentence = sentence1 + ". " + sentence2
                } else {
                    finalSentence = sentence1
                }
                if(finalSentence.charAt(finalSentence.length -1 ) !== ".") finalSentence = finalSentence + "."

                const newFact: FactItem = {
                    id: 1,
                    text: finalSentence
                }
                this.setState({...this.state, fact: newFact, inputPlaceholder: "Smijt er nog één:"})
            }).catch((error) => {
                const errorFact: FactItem = {
                    id: 1,
                    text: errorFacts[Math.floor(Math.random() * errorFacts.length)]
                }
                console.log(error)
                this.setState({...this.state, fact: errorFact, inputPlaceholder: "Smijt er nog één:"})
            })
        }
    }

    onDogEarClick(): void {
        const win = window.open("https://github.com/pietjanssen/feitensmijter", '_blank');
        if(win) win.focus();
    }

    render() {
        return (
            <div>
                <div id="main" role='main'>
                    <div id='factContainer'>
                        <div id='innerContainer'>
                            <div id='dogEar' onClick={this.onDogEarClick}/>
                            <Fact fact={this.state.fact} stopSearch={this.stopSearching.bind(this)}/>
                            <hr className={this.state.searching? 'fade' : ''}/>
                            <form id='factForm' onSubmit={(e) => {e.preventDefault(); this.handleSearch(this.state.searchValue)}}>
                                <input value={this.state.searchValue} onChange={(e) => this.handleInput(e)}
                                       autoFocus={true} autoComplete='off' id='factInput' type="textarea"
                                       className={this.state.searching? 'fade' : ''}
                                       placeholder={this.state.inputPlaceholder} />
                                <input type="submit" style={{width: 0, height: 0}} tabIndex={-1}/>
                            </form>
                            <hr className={this.state.searching? 'fade' : ''}/>
                            <p id='dividerTitle' className={this.state.searching? 'fade' : ''}>Of</p>
                            <button id='factButton' onClick={() => this.searchFact(randomApiUrl)} className={this.state.searching? 'fade' : ''}>
                                Smijt een feit!
                            </button>
                        </div>
                    </div>

                </div>
                <div id='footer'>
                    made by <a href="https://www.linkedin.com/in/boris-van-norren-b14388129/">me</a>
                </div>
            </div>
        );
    }
}

export default App;
