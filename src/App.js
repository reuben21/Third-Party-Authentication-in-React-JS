import React,{Component} from "react";
import Navbar from "./component/navbar/navbar";
import Homepage from './pages/homepage/homepage';
import Authenticate from "./pages/authentication/authenticate";
import * as actions from './store/actions/userAuthActions';
import {connect} from "react-redux";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";


class App extends Component {

    componentDidMount() {
      this.props.onTryAutoSignUp();
    }

    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Navbar {...this.props} NavbarTitle={"Firebase Authentication"} />
                    <Switch>
                        <Redirect from="/" to="/home" exact/>
                        <Route path="/home" component={Homepage}/>
                        <Route path="/authenticate" component={Authenticate}/>

                    </Switch>
                </React.Fragment>

            </BrowserRouter>
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
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
