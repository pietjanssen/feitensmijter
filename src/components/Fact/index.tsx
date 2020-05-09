import React, {Component} from 'react';
import './factStyling.css'
import FactItem from "../../models/FactItem";

interface IProps {
    fact?: FactItem
    stopSearch: any
}

interface IState {
    timeout: any
    searching: boolean
}

class Fact extends Component <IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            timeout: null,
            searching: true
        }
    }


    typeWriter(text: string, i: number=0): void {
        const speed: number = Math.floor(Math.random() * 50);
        const fact: HTMLElement | null = document.getElementById('fact');
        if (fact && i < text.length) {
            fact.innerHTML += text.charAt(i);
            i++;
            this.setState({...this.state, timeout: setTimeout(() => this.typeWriter(text, i), speed)});
        } else {
            this.setState({searching: false})
            this.props.stopSearch();
        }
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<any>, snapshot?: any) {
        if(this.props.fact && this.props.fact !== prevProps.fact) {
            this.setState({searching: true})
            const fact: HTMLElement | null = document.getElementById('fact');
            if(fact) {
                fact.innerHTML = '';
                const timeout = this.state.timeout;
                if(timeout) {
                    clearTimeout(timeout)
                }
            }
            this.typeWriter(this.props.fact.text)
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.fact?.imgSrc ?
                    <a href={this.props.fact.imgSrc}>
                        <img id='factImage' src={this.props.fact.imgSrc} alt='Fact' className={this.state.searching? 'fade' : ''}/>
                    </a>
                    : null}
                <div id='fact' className="fact"/>
            </React.Fragment>
        );
    }
}

export default Fact;