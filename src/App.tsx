import React, {Component} from 'react';
import Homepage from "./views/homepage/homepage";
import SignIn from "./components/SignIn/SignIn";

import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";


class App extends Component <any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            firebaseApp: undefined
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div id="main" role='main'>
                {/*<Homepage/>*/}
                <SignIn/>
            </div>
        );
    }
}

export default App;
