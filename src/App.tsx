import React, {Component} from 'react';
import HomePage from "./views/HomePage/HomePage";
import firebase from 'firebase/compat/app';
import {firebaseApp} from "./config";
import { UserContext } from './components/Context/UserContext';



class App extends Component <any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            user: undefined
        }
    }

    componentDidMount() {
        firebase.auth(firebaseApp).onAuthStateChanged((user) => {
            if (user) {
                console.log(user)
                this.setState({user: user})
            } else {
                this.setState({user: undefined})
            }
        })
    }

    render() {
        return (
            <div id="main" role='main'>
                <UserContext.Provider value={{user: this.state.user}}>
                    <HomePage/>
                </UserContext.Provider>
            </div>
        );
    }
}

export default App;
