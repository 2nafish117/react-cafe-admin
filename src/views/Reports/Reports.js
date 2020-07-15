import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel";
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
// api
import { reports } from "api/endpoints_report";
import firebase from "firebase/app";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

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

function Reports(props) {
  const { user_type } = props
  const classes = useStyles();

  const [_tableHeadings, setTableHeadings] = React.useState(user_type === "manager" ? ["Name", "Admin ID", "Amount"] : ["Name", "Employee ID", "Workstation", "Amount"])
  const [_reportType, setReportType] = React.useState(user_type === "manager" ? "admin_transactions" : "employee_transactions")
  const [_reportResults, setReportResults] = React.useState([])

  const [_redirectToTransactionPage, setRedirectToTransactionPage] = React.useState(false)
  const [_name, setName] = React.useState("")
  const [_employeeID, setEmployeeID] = React.useState("")
  const [_amount, setAmount] = React.useState(0)

  function employeePayHandler(name, employeeID, amount) {
    return (event) => {
      setRedirectToTransactionPage(true)
      setName(name)
      setEmployeeID(employeeID)
      setAmount(amount)
    }
  }

  function submitForm(event) {
    var user = firebase.auth().currentUser;
    console.log(user)

    console.log('submitting')
    switch (_reportType) {
      case 'employee_transactions':
        reports.getAll(_reportType).then(res => {
          console.log(res)
          var results = res.payload.map(it => {
            var employee_id = it.employee_id
            var workstation = it.workstation
            var name = it.name
            var amount = it.amount
            return [name, employee_id, workstation, amount, <Button color="warning" onClick={employeePayHandler(name, employee_id, amount)}>Pay</Button>]
          })
          // console.log(results)
          setReportResults(results)
        })
        break;
      case 'admin_transactions':
        reports.getAll(_reportType).then(res => {
          var results = res.payload.map(it => {
            var admin_id = it.admin_id
            var name = it.name
            var amount = it.amount
            return [name, admin_id, amount]
          })
          console.log(results)
          setReportResults(results)
        })
        break;
      case 'meal_entries':
        reports.getAll(_reportType).then(res => {
          var results = res.payload.map(it => {
            var employee_id = it.employee_id
            var workstation = it.workstation
            var name = it.name
            var breakfasts = String(it.breakfast_quantity)
            var lunches = String(it.lunch_quantity)
            var snacks = String(it.snack_quantity)
            return [name, employee_id, workstation, breakfasts, lunches, snacks]
          })
          console.log(results)
          setReportResults(results)
        })
        break;
    }
  }

  // function onChange(event) {
  //   let error;
  //   switch (event.target.id) {
  //     case 'employee-id':
  //       setEmployeeID(event.target.value)
  //       break;
  //   }
  // }

  function reportTypeChangeHandler(event) {
    setReportType(event.target.value)
    switch (event.target.value) {
      case 'employee_transactions':
        setTableHeadings(["Name", "Employee ID", "Workstation", "Amount"]);
        break;
      case 'admin_transactions':
        setTableHeadings(["Name", "Admin ID", "Amount"]);
        break;
      case 'meal_entries':
        setTableHeadings(["Name", "Employee ID", "Workstation", "Breakfasts", "Lunches", "Snacks"]);
        break;
    }
    setReportResults([])
  }

  
  if(_redirectToTransactionPage) {
    return <Redirect to={{pathname: (user_type ? '/admin' : '/manager') + "/transactions", state: { name: _name, employeeID: _employeeID, amount: _amount }}}/>
  }
  else 
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Reports</h4>
              <p className={classes.cardCategoryWhite}>Get Reports</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <InputLabel id="report-type-label">Transaction Type</InputLabel>
                  <Select
                    labelId="report-type"
                    id="report-type"
                    value={_reportType}
                    onChange={reportTypeChangeHandler}
                    fullWidth
                  >
                    {user_type === 'manager' ? <div></div>: <MenuItem id="report-type" value={"employee_transactions"}>Employee Transactions</MenuItem>}
                    <MenuItem id="report-type" value={"admin_transactions"}>Admin Transactions</MenuItem>
                    {user_type === 'manager' ? <div></div>: <MenuItem id="report-type" value={"meal_entries"}>MealEntries</MenuItem>}
                  </Select>
                </GridItem>
              </GridContainer>

              {/* <GridItem xs={12} sm={12} md={6}>
                <TextField id="employee-id" label="Employee ID"
                    value={_employeeID}
                    onChange={onChange}
                    fullWidth
                  />
                </GridItem> */}

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={_tableHeadings}
                    tableData={_reportResults}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={submitForm}>Get Reports</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}


function mapStateToProps(state) {
  console.log('from map state to props', state)
  return {
      user_type: state.auth.user_type,
      user_id: state.auth.user_id,
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user
  };
}

export default connect(mapStateToProps)(Reports);