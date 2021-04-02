import React, {Component} from 'react';
import css from './auth.module.css';
import firebase from "../../firebaseConfig/firebaseConfig";
import StyledFirebaseUI from "react-firebaseui/StyledFirebaseAuth";
import {Redirect} from 'react-router';
import Css from "../profile/profile.module.css";
import CssTextField from "../../component/TextField/TextField";
import * as actions from "../../store/actions/userAuthActions";
import {connect} from "react-redux";

class Authenticate extends Component {
    state = {
        isAuth: false,
        photoURL: null,
        displayName: null,
        emailId: null,
        phoneNumber: null,
        redirect:false
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
            signInSuccessWithAuthResult: () => {
                this.props.onAuthLogin()
                this.setState({

                    redirect:true
                })
            }
        }
    }

    componentDidMount = () => {

        firebase.auth().onAuthStateChanged(user => {

            this.setState({
                isAuth: !!user,
            })
            console.log("user", user)
        })
    }

    render() {
        if (this.state.redirect){
            return <Redirect to={'/user/profile'}/>;
        }
        return (
            <div className={css.App}>
                {
                    this.props.isAuth ?
                        <>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 80,
                                flexDirection: "column",

                            }}>

                            </div>
                        </>
                        :
                        <StyledFirebaseUI uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
                }
            </div>
        );
    }


}

const mapStateToProps = state => {

    return {
        isAuth: state.user.refreshToken !== null,
        userType: state.user.userType,
        userId:state.user.userId,
        emailId:state.user.emailId

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthLogin: () => dispatch(actions.userAuthentication()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);

// export default Authenticate;
