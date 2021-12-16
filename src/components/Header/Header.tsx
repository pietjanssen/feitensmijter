import React, {Component} from 'react';
import SignIn from "../SignIn/SignIn";
import {UserContext} from "../Context/UserContext";
import firebase from "firebase/compat/app";

class Header extends Component <any, any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {}

    private displayUserPicture (): string | undefined {
        if (this.context.user?.photoURL) {
            let photoUrl: string = this.context.user.photoURL;
            if ((photoUrl.indexOf('googleusercontent.com') !== -1) || (photoUrl.indexOf('ggpht.com') !== -1)) {
                photoUrl = `${photoUrl}?sz=${document.getElementById('profilePhoto')?.clientHeight}`
            }
            return photoUrl;
        }
        return undefined
    }

    private logOut() {
        firebase.auth().signOut()
            .then((response: any) => {
                console.log(response);

            })
    }

    render() {
        return (
            <div className="dropdown text-end">
                <button className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    {!this.displayUserPicture()
                        ? <span>Sign in</span> :
                        <img src={this.displayUserPicture()} id="profilePhoto" alt="profile" width="32" height="32" className="rounded-circle"/>
                    }
                </button>
                <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                    <li className=""><SignIn/></li>
                    <li><button onClick={() => this.logOut()} className="btn btn-outline-danger">Logout</button></li>
                </ul>
            </div>
        );
    }
}

Header.contextType = UserContext;
export default Header;

