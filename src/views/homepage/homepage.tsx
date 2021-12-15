import React, {Component} from 'react';
import {ReactComponent as Logo} from "../../assets/images/feitensmijter_logo.svg";
import smijt_button from "../../assets/images/smijt-een-feit-button-geen-dropshadow.png";
import FactItem from "../../models/FactItem";
import Fact from "../../components/Fact";
import {errorFacts, jokes} from "./util";
import '../../App.css';
import WikiResponse from "../../models/WikiResponse";

const randomApiUrl: string = "https://nl.wikipedia.org/api/rest_v1/page/random/summary"
const exactApiUrl = (query: string): string => `https://nl.wikipedia.org/api/rest_v1/page/summary/${query}`
const relatedApiUrl = (query: string): string => `https://nl.wikipedia.org/api/rest_v1/page/related/${query}`

interface IState {
    fact?: FactItem
    searchValue: string
    searching: boolean
    inputPlaceholder: string
    likeButtonActive: boolean
    disLikeButtonActive: boolean
}


class Homepage extends Component <any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchValue: "",
            searching: false,
            inputPlaceholder: "Smijt mij een feit over:",
            likeButtonActive: false,
            disLikeButtonActive: false
        }
    }

    render() {
        return (
            <div id='pageContainer'>
                <Logo title={'Feitensmijter logo'} id='brandLogo'/>
                <div id='innerContainer'>
                    <div id='brandContainer'/>
                    {/*<img src="/assets/images/Feitensmijter%20logo%20RGB.svg" alt={'Feitensmijter logo'}/>*/}
                    <Fact fact={this.state.fact} searching={this.state.searching} stopSearch={this.stopSearching.bind(this)}/>
                    <form id='factForm' onSubmit={(e) => {
                        e.preventDefault();
                        this.handleSearch(this.state.searchValue)
                    }}>
                        {/*<input value={this.state.searchValue} onChange={(e) => this.handleInput(e)}*/}
                        {/*       autoFocus={true} autoComplete='off' id='factInput' type="textarea"*/}
                        {/*       className={this.state.searching ? 'fade' : ''}*/}
                        {/*       placeholder={this.state.inputPlaceholder}/>*/}
                        {/*<input type="submit" style={{width: 0, height: 0}} tabIndex={-1}/>*/}
                        <input type='image' alt='Smijt-een-feit!' className={this.state.searching ? 'fade' : ''} src={smijt_button} id='factButton'/>
                        {/*<div style={this.state.fact ? {marginLeft: 5, opacity: 1} : {marginLeft: 5, opacity: 0}} className="btn-group-vertical btn-group-sm" role="group" >*/}
                        {/*    <button type={"button"} style={this.state.likeButtonActive ? {backgroundColor: "skyblue"} : undefined}*/}
                        {/*            className={this.state.searching ? 'fade btn btn-secondary btn-sm' : 'btn btn-secondary btn-sm'}*/}
                        {/*            onClick={() => this.onUpvote()}>*/}
                        {/*        &#8593;*/}
                        {/*    </button>*/}
                        {/*    <button type={"button"} style={this.state.disLikeButtonActive ? {backgroundColor: "indianred"} : undefined}*/}
                        {/*            className={this.state.searching ? 'fade btn btn-secondary btn-sm' : 'btn btn-secondary btn-sm'}*/}
                        {/*            onClick={() => this.onDownVote()}>*/}
                        {/*        &#8595;*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                        {/*<input type='image' onClick={() => this.onUpvote()} alt='Like-het-feit!' className={this.state.searching ? 'fade' : ''} src={like_button}/>*/}
                        {/*<input type='image' onClick={() => this.onDownVote()} alt='Dislike-het-feit!' className={this.state.searching ? 'fade' : ''} src={dislike_button}/>*/}
                    </form>
                </div>
            </div>
        )
    }

    private handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({searchValue: event.target.value});
    }

    private handleSearch(text: string) {
        if (text) {
            if (text.toLowerCase() === 'kaylee') {
                if (!this.state.searching) {
                    this.setState({...this.state, searching: true})
                    const newFact: FactItem = {
                        id: 1,
                        text: jokes[0]
                    }
                    this.setState({...this.state, fact: newFact})
                }
            } else {
                this.searchFact(text.toLowerCase());
            }
        } else {
            this.getRandomFact()
        }
    }

    private stopSearching() {
        this.setState({...this.state, searching: false, searchValue: ""})
    }

    private async getRandomFact() {
        if (!this.state.searching) {
            this.setState({...this.state, searching: true})
            const response: any = await fetch(randomApiUrl, {method: 'GET'})
            let newFact: FactItem;
            if (response.ok) {
                const wiki: WikiResponse = await response.json();
                newFact = await createFact(wiki);
            } else {
                newFact = {
                    id: 1,
                    text: errorFacts[Math.floor(Math.random() * errorFacts.length)]
                }
            }
            this.setState({
                ...this.state,
                fact: newFact,
                inputPlaceholder: "Smijt er nog één:",
                likeButtonActive: false,
                disLikeButtonActive: false
            })
        }
    }

    private async searchFact(search: string): Promise<void> {
        // TODO: Skip "Wikimedia-lijst"
        if (!this.state.searching) {
            this.setState({...this.state, searching: true})
            let newFact: FactItem;
            // Try to get a list of related wiki pages by search term.
            const response: any = await fetch(relatedApiUrl(search), {method: "GET"});
            if (response.ok) {
                const json: { pages: WikiResponse[] } = await response.json()
                const wiki: WikiResponse = json.pages[Math.floor(Math.random() * json.pages.length)];
                newFact = await createFact(wiki);
            } else {
                // Try to get the exact wiki page by search term.
                const response: any = await fetch(exactApiUrl(search), {method: "GET"});
                if (response.ok) {
                    const wiki: WikiResponse = await response.json();
                    newFact = await createFact(wiki);
                } else {
                    // Generate an error Fact
                    newFact = {
                        id: 1,
                        text: errorFacts[Math.floor(Math.random() * errorFacts.length)]
                    }
                }
            }
            this.setState({
                ...this.state,
                fact: newFact,
                inputPlaceholder: "Smijt er nog één:",
                likeButtonActive: false,
                disLikeButtonActive: false
            })
        }
    }

    private onRepoClick(): void {
        const win = window.open("https://github.com/pietjanssen/feitensmijter", '_blank');
        if (win) win.focus();
    }

    private onUpvote(): void {
        this.setState(prevState => ({likeButtonActive: !prevState.likeButtonActive, disLikeButtonActive: false}))
    }

    private onDownVote(): void {
        this.setState(prevState => ({disLikeButtonActive: !prevState.disLikeButtonActive, likeButtonActive: false}))
    }
}

function createFact(wiki: WikiResponse): FactItem {
    console.log(wiki)
    const splitFact: string[] = wiki.extract.split(". ")
    const sentence1: string = splitFact[0];
    const sentence2: string = splitFact[1];
    const sentence3: string = splitFact[2];
    let finalSentence: string
    if (sentence3 && (sentence1 + sentence2 + sentence3).length < 40) {
        finalSentence = sentence1 + ". " + sentence2 + ". " + sentence3
    } else if (sentence2) {
        finalSentence = sentence1 + ". " + sentence2
    } else {
        finalSentence = sentence1
    }
    if (finalSentence.charAt(finalSentence.length - 1) !== ".") finalSentence = finalSentence + "."
    return {
        id: wiki.pageid,
        text: finalSentence,
        imgSrc: wiki.thumbnail?.source,
        imgOriginalSrc: wiki.originalimage?.source
    };
}

export default Homepage;
