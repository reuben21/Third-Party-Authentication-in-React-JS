import React, {Component} from "react";
import CssTextField from "../../component/TextField/TextField";
import Css from './profile.module.css';
import firebase  from "../../firebaseConfig/firebaseConfig";

class Profile extends Component{
    state={
        photoURL:null,
        displayName:null,
        emailId:null,
        phoneNumber:null
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({
                photoURL:user.photoURL,
                displayName:user.displayName,
                emailId:user.email,
                phoneNumber:user.phoneNumber,
            })
            console.log("user", user)
        })
    }

    render(){
        return (
            <>
                <div style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    marginTop:80,
                    flexDirection:"column",

                }}>
                    <br/>
                    <img className={Css.imageProfile} src={this.state.photoURL === null ? "Not Found" : this.state.photoURL} alt=""/>
                    <br/>
                    <CssTextField className={Css.textFiled} value={this.state.displayName === null ? "Not Found" : this.state.displayName} label={"Name"} />
                    <br/>
                    <CssTextField className={Css.textFiled} value={this.state.emailId === null ? "Not Found" : this.state.emailId} label={"Email ID"} />
                    <br/>
                    <CssTextField className={Css.textFiled} value={this.state.phoneNumber === null ? "Not Found" : this.state.phoneNumber} label={"Phone Number"} />


                </div>

            </>
        );
    }


}

export default Profile;
