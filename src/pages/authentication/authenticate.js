import React ,{Component} from 'react';
import css from './auth.module.css';
import firebase  from "../../firebaseConfig/firebaseConfig";
import StyledFirebaseUI from  "react-firebaseui/StyledFirebaseAuth";

class Authenticate extends Component{
    state = {
        isAuth:false
    }
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }

    componentDidMount = () => {

        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isAuth: !!user })
            console.log("user", !!user)
        })
    }
    render() {
        return (
            <div className={css.App}>
                {
                    this.state.isAuth ?
                        <>
                            <div> Signed In! </div>
                            <h1>{firebase.auth().currentUser.displayName}</h1>
                            <h1>{firebase.auth().currentUser.email}</h1>
                            <h1>{firebase.auth().currentUser.phoneNumber}</h1>
                            <img src={firebase.auth().currentUser.photoURL} width={200} alt=""/>
                            <br/>
                            <button onClick={()=>firebase.auth().signOut()}>Sign Out</button>
                        </>
                        :
                        <StyledFirebaseUI  uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
                }
            </div>
        );
    }


}

export default Authenticate;
