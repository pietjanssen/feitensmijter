import React, {Component} from 'react';
import "../Fact/fact.css"
import FactItem from "../../models/FactItem";

interface IProps {
    fact?: FactItem
    stopSearch: any
}

interface IState {
    timeout: any
}

class FactFactory extends Component <IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            timeout: null
        }
    }


    typeWriter(text: string, i: number=0): void {
        const speed: number = Math.floor(Math.random() * 100);
        const fact: HTMLElement | null = document.getElementById('fact');

        if (fact && i < text.length) {
            fact.innerHTML += text.charAt(i);
            i++;
            this.setState({...this.state, timeout: setTimeout(() => this.typeWriter(text, i), speed)});
        } else {
            this.props.stopSearch();
        }
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<any>, snapshot?: any) {
        if(this.props.fact && this.props.fact !== prevProps.fact) {
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
            <div id='fact' className="fact"/>
        );
    }
}

export default FactFactory;