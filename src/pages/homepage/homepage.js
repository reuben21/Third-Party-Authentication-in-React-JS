import React,{Component} from "react";
import * as actions from "../../store/actions/userAuthActions";
import {connect} from "react-redux";
import css from './homepage.module.css'
class Homepage extends Component {

    componentDidMount() {
     this.props.onTryAutoSignUp()
        console.log(this.props.emailId)
    }

    render() {
        return (
            <div className={css.homepage}>
                Homepage
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
        onTryAutoSignUp: () => dispatch(actions.authCheckState()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
// export default Homepage;
