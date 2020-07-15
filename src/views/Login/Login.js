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
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { withStyles } from "@material-ui/styles";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";

import { db, myFirebase } from "../../firebase/firebase";
import firebase from "firebase/app";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser, cacheUserInfo } from "actions";

const styles = () => ({
    "@global": {
      body: {
        backgroundColor: "#fff"
      }
    },
    paper: {
      marginTop: 100,
      display: "flex",
      padding: 20,
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      marginLeft: "auto",
      marginRight: "auto",
      backgroundColor: "#f50057"
    },
    form: {
      marginTop: 1
    },
    errorText: {
      color: "#f50057",
      marginBottom: 5,
      textAlign: "center"
    }
  });

const useStyles = makeStyles(styles);

function Login(props) {
    const classes = useStyles();

    const [_userType, setUserType] = React.useState("")
    const [_userID, setUserID] = React.useState("")

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
                    setUserID(doc.data().user_id)
                    // dispatch(cacheUserInfo(doc.data().user_id, doc.data().type));
                    console.log(doc.data().type, doc.data().user_id)
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
      const { dispatch } = props;
      console.log(_userID, _userType)
      dispatch(cacheUserInfo(_userID, _userType));
        if (_userType === "admin")
            return (<Redirect to="/admin" />)
        else if (_userType === "manager")
            return (<Redirect to="/manager" />)
        else return null;
    } else {
        return (
            <Container component="main" maxWidth="xs">
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id='email'
              label="Email Address"
              name="email"
              onChange={onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type={_showPassword ? 'text' : 'password'}
              id="password"
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
            {loginError && (
              <Typography component="p" className={classes.errorText}>
                Incorrect email or password.
              </Typography>
            )}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submitForm}
            >
              Sign In
            </Button>
          </Paper>
        </Container>
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


