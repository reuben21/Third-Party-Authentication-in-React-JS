import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ColorButton from '../Button/Button'
import {NavLink} from 'react-router-dom';
// import * as actions from "../../store/actions/patientAuthActions";
// import * as actions2 from "../../store/actions/hospitalAuthActions";
// import {connect} from "react-redux";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Drawer from "@material-ui/core/Drawer";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import css from './Navbar.module.css'
import firebase from "../../firebaseConfig/firebaseConfig";


class Navbar extends Component {
    state = {
        AnchorEl: null,
        right: false,
        anchor: false,
        anchorDrawer: false,
        anchorDrawerEl: false,
        AvatarInitails: "",
        isAuth:false
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isAuth: !!user })
            console.log("user", !!user)
        })
        // this.props.onTryAutoSignUp();
        // console.log("Printing",this.props.user_type,
        //    );
    }

    handleClose = () => {
        this.setState({AnchorEl: null})
    };

    toggleDrawerClose1 = (event) => {
        this.setState({anchorDrawer: false});
    };

    toggleDrawer1 = (event) => {
        this.setState({anchorDrawer: true});
        // console.log(this.context.priority)
    };
    toggleDrawerClose = (event) => {
        this.setState({anchor: false});
    };

    toggleDrawer = (event) => {
        this.setState({anchor: true});
        // console.log(this.context.priority)
    };

    render() {

        //https://colorhunt.co/palette/253250
        // const {classes} = {...this.props};

        const list = (anchor) => (
            <div
                style={{
                    width: 250,
                    background: "#1a508b",
                    height: "100%",
                    color: "#fff3e6",

                }}
                role="presentation"
                onClick={this.toggleDrawer}
                onKeyDown={this.toggleDrawer}
            >
                <Avatar style={{
                    margin: "20px auto",
                    color: "#c1a1d3",
                    background: "#fff3e6",
                    width: "100px",
                    height: "100px",
                    fontSize: "20px"
                }}>{this.props.user_type}</Avatar>
                <Divider/>
                <List>


                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >

                        {this.state.isAuth && <ColorButton component={NavLink} to={"/user/profile"} color="inherit" style={{
                            width: "200px",
                            marginTop:"20%"

                        }}>Profile</ColorButton> }

                        {this.state.isAuth && <ColorButton onClick={()=>firebase.auth().signOut()} color="inherit" style={{
                            width: "200px",
                            marginTop:"20%"

                        }}>Logout</ColorButton> }



                    </Grid>


                </List>
            </div>
        );

        // const list1 = (anchor) => (
        //     <div
        //         style={{
        //             width: 250,
        //             background: "#1a508b",
        //             height: "100%",
        //
        //             color: "#fff3e6",
        //
        //         }}
        //         role="presentation"
        //         onClick={this.toggleDrawer}
        //         onKeyDown={this.toggleDrawer}
        //     >
        //         <Avatar style={{
        //             margin: "20px auto",
        //             width: "100px",
        //             height: "100px",
        //             fontSize: "50px"
        //         }}>
        //
        //
        //         </Avatar>
        //         <Divider/>
        //         <List>
        //
        //
        //             <Grid
        //                 container
        //                 direction="column"
        //                 justify="center"
        //                 alignItems="center"
        //             >
        //
        //
        //                 <ColorButton color="inherit" component={NavLink} to={"/patient/home"}>Home</ColorButton>
        //                 <ColorButton component={NavLink} to={"/hospital/home"} color="inherit">Hospitals</ColorButton>
        //                 <ColorButton component={NavLink} to={"/health"} color="inherit">Vaccination Centers</ColorButton>
        //
        //             </Grid>
        //
        //
        //         </List>
        //     </div>
        // );
        return (
            <>
                <AppBar position="static" style={{
                    backgroundColor: "#1a508b"
                }}>
                    <Toolbar variant="dense" style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontFamily: "'Julius Sans One', sans-serif",
                        fontSize: "20px",
                        marginBottom: "-30px",
                        color: "#fff3e6"
                    }}>

                        {this.props.NavbarTitle}

                    </Toolbar>
                    <Toolbar>


                        {/*<Typography variant="h6" className={classes.title}>*/}
                        {/*    News*/}
                        {/*</Typography>*/}
                        <span className={css.Menu_Css}>
                        {/*{["left"].map((anchor) => (*/}
                        {/*    <React.Fragment key={anchor}>*/}
                        {/*        <ColorButton*/}

                        {/*            style={{*/}
                        {/*                color: "white"*/}
                        {/*            }}*/}
                        {/*            onClick={this.toggleDrawer}*/}
                        {/*        >*/}
                        {/*            <MenuIcon style={{*/}
                        {/*                width: "30px",*/}
                        {/*                height: "40px"*/}
                        {/*            }}/>*/}
                        {/*        </ColorButton>*/}
                        {/*        <Drawer*/}
                        {/*            anchor={anchor}*/}
                        {/*            open={this.state.anchor}*/}
                        {/*            onClose={this.toggleDrawerClose}*/}
                        {/*        >*/}
                        {/*            {list1(anchor)}*/}
                        {/*        </Drawer>*/}
                        {/*    </React.Fragment>*/}
                        {/*))}*/}
                        </span>
                        <span className={css.categories_Css}>
                        <ColorButton color="inherit" component={NavLink} to={"home"}>Home</ColorButton>



                         </span>
                        <div style={{
                            flexGrow: 1
                        }}>

                        </div>
                        {
                            this.state.isAuth ?
                                <>   <div>
                                    {["right"].map((anchor) => (
                                        <React.Fragment key={anchor}>
                                            <ColorButton

                                                style={{
                                                    color:"white"
                                                }}
                                                onClick={this.toggleDrawer1}
                                            >
                                                <AccountBoxIcon style={{
                                                    width:"30px",
                                                    height:"40px"
                                                }}/>
                                            </ColorButton>
                                            <Drawer
                                                anchor={anchor}
                                                open={this.state.anchorDrawer}
                                                onClose={this.toggleDrawerClose1}
                                            >
                                                {list(anchor)}
                                            </Drawer>
                                        </React.Fragment>
                                    ))}


                                </div></> : <><ColorButton  component={NavLink} to={"/authenticate"}  color="inherit"
                                                            style={{
                                                                width: "100px",

                                                            }}>Sign In</ColorButton></>



                        }


                    </Toolbar>
                </AppBar>

            </>
        );
    }
}

// const mapStateToProps = state => {
//     console.log("APP JS STATE: ", state.token)
//     return {
//         isAuthenticated: state.token !== null,
//         isAdmin: state.admin_priority
//     }
// }

// const mapStateToProps = state => {
//
//     return {
//         isAuthenticated: state.patientReducer.token || state.hospitalReducer.token !== null,
//         isAdmin: state.patientReducer.admin_priority === null ? state.hospitalReducer.token : state.patientReducer.admin_priority,
//         user_type:state.patientReducer.user_type === null ? state.hospitalReducer.user_type : state.patientReducer.user_type,
//         user_id:state.patientReducer.user_id === null ? state.hospitalReducer.user_id : state.patientReducer.user_id,
//
//     }
// }
//
//
//
// const mapDispatchToProps = dispatch => {
//     return {
//         onTryAutoSignUp: () => dispatch(actions.authCheckState()),
//         logout: () => dispatch(actions.logout()),
//         logoutHospital: () => dispatch(actions2.logout())
//     }
// }
export default (Navbar);
// export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
