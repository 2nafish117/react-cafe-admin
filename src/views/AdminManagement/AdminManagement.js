import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField'
import Search from "@material-ui/icons/Search";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
// api
import { admins } from 'api/endpoints_admins.js'
import { search } from "api/endpoint_search";

import { db, myFirebase } from "../../firebase/firebase";
import firebase from "firebase/app";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function AdminManagement() {
  const classes = useStyles();

  const [_search, setSearch] = React.useState("")
  const [_searchResults, setSearchResults] = React.useState([])

  const [_name, setName] = React.useState("")
  const [_adminID, setAdminID] = React.useState("")
  const [_adminIDHelper, setAdminIDHelper] = React.useState("")
  const [_contact, setContact] = React.useState("")
  const [_contactHelper, setContactHelper] = React.useState("")
  const [_email, setEmail] = React.useState("")
  const [_emailHelper, setEmailHelper] = React.useState("")
  const [_joinDate, setJoinDate] = React.useState("")
  const [_joinDateHelper, setJoinDateHelper] = React.useState("")

  const [_errorMessage, setErrorMessage] = React.useState("");
  const [_errorLevel, setErrorLevel] = React.useState();

  function submitForm(event) {
    console.log('submitting')
    let data = {
      "name": _name,
      "admin_id": _adminID,
      "contact": _contact,
      "email": _email,
      // "join_date": _joinDate
    }

    console.log(data)

    admins.post(data).then(res => {setErrorMessage(res.status.message); setErrorLevel("danger"); return res;} ).then(res => console.log(res))

    // Add a new document with a generated id.
    db.collection("users").add({
      email: _email,
      type: "admin"
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  function joinDateChangeHandler(event) {
    let value = event.target.value
    console.log(value)
    setJoinDate(value)
  }

  function onChange(event) {
    let error;
    switch (event.target.id) {
      case 'full-name':
        setName(event.target.value)
        break;

      case 'admin-id':
        setAdminID(event.target.value)
        break;

      case 'contact':
        setContact(event.target.value)
        error = /^[0-9]{10}$/.test(event.target.value)
        if (!error) {
          setContactHelper("Invalid Phone Number")
        }
        else {
          setContactHelper("")
        }
        break;

      case 'email':
        setEmail(event.target.value)
        error = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$/.test(event.target.value)
        // regex test
        if (!error) {
          setEmailHelper("Invalid Email")
        }
        else {
          setEmailHelper("")
        }
        break;
    }
  }

  function searchQuery() {
    search.getAll('admins', _search).then(res => {
      var results = res.payload.map(it => {
        var name = it.name
        var admin_id = it.admin_id
        var email = it.email
        var contact = it.contact
        return [name, admin_id, email, contact]
      })
      console.log(results)
      setSearchResults(results)
    })
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card profile>
            <CardBody profile>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField id="search"
                    placeholder="Search Admins"
                    value={_search}
                    onChange={event => setSearch(event.target.value)}
                    fullWidth
                  />
                </GridItem>
                <Button color="white" aria-label="edit" justIcon round onClick={searchQuery}>
                  <Search />
                </Button>
              </GridContainer>
              <GridContainer>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Name", "Admin ID", "Email", "Contact"]}
                  tableData={_searchResults}
                />
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>

        {/* <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Search results</h4>
            <p className={classes.cardCategoryWhite}>
              {"Here's what i found for " + _search}
            </p>
          </CardHeader>
          <CardBody>
            
          </CardBody>
        </Card>
      </GridItem> */}

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add Admin</h4>
              <p className={classes.cardCategoryWhite}>Add an Admin</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField id="full-name" label="Full Name"
                    value={_name}
                    onChange={onChange}
                    fullWidth
                  />

                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField id="admin-id" label="Admin ID"
                    value={_adminID}
                    onChange={onChange}
                    fullWidth
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField id="contact" label="Contact"
                    value={_contact}
                    onChange={onChange}
                    fullWidth
                    error={_contactHelper.length !== 0}
                    helperText={_contactHelper}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField id="email" label="Email"
                    value={_email}
                    onChange={onChange}
                    fullWidth
                    error={_emailHelper.length !== 0}
                    helperText={_emailHelper}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    id="join-date"
                    label="Join Date"
                    type="datetime-local"
                    // className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={_joinDate}
                    onChange={(event) => { console.log('changed') }}
                  />
                  {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="join-date"
                    label="Join Date"
                    format="MM/dd/yyyy"
                    value={_joinDate}
                    onChange={joinDateChangeHandler}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider> */}

                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={submitForm}>Add Admin</Button>
              <GridItem xs={12} sm={12} md={6}
                hidden={_errorMessage === ''}
              >
                <SnackbarContent
                  message={_errorMessage}
                  color={_errorLevel}
                />
              </GridItem>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
