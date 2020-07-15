import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { withStyles } from "@material-ui/styles";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";

import { db, myFirebase } from "../../firebase/firebase";
import firebase from "firebase/app";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "actions";

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
        textAlign: "center"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        textAlign: "center"
    }
};

const useStyles = makeStyles(styles);

function Login(props) {
    const classes = useStyles();

    const [_userType, setUserType] = React.useState("")
    const [_email, setEmail] = React.useState("")
    const [_password, setPassword] = React.useState("")
    const [_showPassword, setShowPassword] = React.useState(false)

    function submitForm(event) {
        console.log('submitting')
        const { dispatch } = props;

        dispatch(loginUser(_email, _password));
        db.collection("users").where("email", "==", _email)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    setUserType(doc.data().type)
                    console.log(doc.data().type)
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }

    function onChange(event) {
        let error;
        switch (event.target.id) {
            case 'email':
                setEmail(event.target.value)
                break;
            case 'password':
                setPassword(event.target.value)
                break;
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!_showPassword)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const { loginError, isAuthenticated } = props;
    if (isAuthenticated && _userType !== "") {
        if (_userType === "admin")
            return (<Redirect to="/admin" />)
        else if (_userType === "manager")
            return (<Redirect to="/manager" />)
        else return null;
    } else {
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Login</h4>
                                <p className={classes.cardCategoryWhite}>Select Login Type</p>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <TextField id="email" label="Email"
                                            value={_email}
                                            onChange={onChange}
                                            fullWidth
                                        />

                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        {/* <TextField id="password" label="Password"
                                            value={_password}
                                            onChange={onChange}
                                            fullWidth
                                        /> */}
                                        <Input
                                            id="password"
                                            type={_showPassword ? 'text' : 'password'}
                                            value={_password}
                                            onChange={onChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {_showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </GridItem>
                                </GridContainer>

                            </CardBody>
                            <CardFooter>
                                <Button color="primary" onClick={submitForm}>Login</Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default withStyles(styles)(connect(mapStateToProps)(Login));


