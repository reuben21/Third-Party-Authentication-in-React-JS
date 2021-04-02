import React,{Component} from "react";
import Navbar from "./component/navbar/navbar";
import Homepage from './pages/homepage/homepage';
import Authenticate from "./pages/authentication/authenticate";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";


class App extends Component {

    // componentDidMount() {
    //   this.props.onTryAutoSignUp();
    // }

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

export default (App);
