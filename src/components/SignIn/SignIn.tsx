import React, {Component} from 'react';
import firebase from "firebase/compat";

const firebaseui = require('firebaseui');

interface IState {

}

class SignIn extends Component <any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <React.Fragment>
                {/*The surrounding HTML is left untouched by FirebaseUI.*/}
                {/*Your app may use that space for branding, controls and other customizations.*/}
                <div id="firebaseui-auth-container"/>
                <div id="loader">Loading...</div>
            </React.Fragment>
        );
    }

    componentDidMount() {
        const ui = new firebaseui.auth.AuthUI(firebase.auth());

        const uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function(authResult: any, redirectUrl: any) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    return false;
                },
                uiShown: function() {
                    // The widget is rendered.
                    // Hide the loader.
                    const loader: HTMLElement | null = document.getElementById('loader')
                    if (loader) loader.style.display = 'none';
                }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            // signInSuccessUrl: '',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                // firebase.auth.GithubAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                // firebase.auth.PhoneAuthProvider.PROVIDER_ID
            ],
            // Terms of service url.
            // tosUrl: '<your-tos-url>',
            // Privacy policy url.
            // privacyPolicyUrl: '<your-privacy-policy-url>'
        };

        ui.start('#firebaseui-auth-container', uiConfig);
    }
}

export default SignIn;