import React, {Component} from 'react';
import "./fact.css"
import FactItem from "../../models/FactItem";

interface IProps {
    fact?: FactItem
}

class Fact extends Component <IProps, any> {

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<any>, snapshot?: any) {
        if(this.props.fact && this.props.fact !== prevProps.fact) {
            const fact: HTMLElement | null = document.getElementById('fact');
            if(fact)
                fact.innerHTML = ''
            typeWriter(this.props.fact.text)
        }
    }

    render() {
        return (
            <div id='fact' className="fact"/>
        );
    }
}

function typeWriter(text: string, i: number=0): void {
    const speed: number = Math.floor(Math.random() * 100);
    const fact: HTMLElement | null = document.getElementById('fact');

    if (fact && i < text.length) {
        fact.innerHTML += text.charAt(i);
        i++;
        setTimeout(() => typeWriter(text, i), speed);
    }
}

export default Fact;