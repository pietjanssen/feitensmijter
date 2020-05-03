import React, {Component} from 'react';
import './App.css';
import Footer from "../src/components/Footer";
import FactItem from "../src/models/FactItem";
import FactFactory from "../src/components/Fact";

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
    searchValue: string
    searching: boolean
    loading: boolean
}


class App extends Component <any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchValue: "",
            searching: false,
            loading: false
        }
    }

    handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({searchValue: event.target.value});
    }

    stopSearching(){
        this.setState({...this.state, searching: false, searchValue: ""})
    }

    searchFact(text: string){
        if(text) {
            const search: string = apiUrl(text)

            if (!this.state.searching) {
                this.setState({...this.state, searching: true, loading: true})
                setTimeout(() => this.setState({...this.state, loading: false}), 3000)
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
                    this.setState({...this.state, fact: errorFact})
                })
            }
        }
    }

    render() {
        return (
            <div>
                <div id="main">
                    <div id='factContainer'>
                        <div id='innerContainer'>
                            <div id='dogEar'/>
                            <form id='factForm' onSubmit={(e) => {e.preventDefault(); this.searchFact(this.state.searchValue)}}>
                                <input value={this.state.searchValue} onChange={(e) => this.handleInput(e)}
                                       autoFocus={false} autoComplete='off' id='factInput' type="text"
                                       className={this.state.searching? 'hide form-control' : 'form-control'}
                                       placeholder="Request a fact" />
                                <input type="submit" style={{width: 0, height: 0}} tabIndex={-1}/>
                            </form>
                            <FactFactory fact={this.state.fact} stopSearch={this.stopSearching.bind(this)}/>
                        </div>
                    </div>

                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
