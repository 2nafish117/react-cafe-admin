import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField'
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";

import { meal_entries } from 'api/endpoints_meal_entries.js'
import { meal_types } from 'api/endpoints_meal_types.js'

import { getHHMMSS } from 'util/dates'

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

export default function EmployeeManagement() {
  const classes = useStyles();

  const [_mealType, setMealType] = React.useState("")
  const [_cost, setCost] = React.useState("")
  const [_costHelper, setCostHelper] = React.useState("")
  const [_employeeCost, setEmployeeCost] = React.useState("")
  const [_employeeCostHelper, setEmployeeCostHelper] = React.useState("")
  const [_companyCost, setCompanyCost] = React.useState("")
  const [_companyCostHelper, setCompanyCostHelper] = React.useState("")
  const [_fromTime, setFromTime] = React.useState("")
  const [_toTime, setToTime] = React.useState("")
  const [_catererID, setCatererID] = React.useState("")

  const [_mealTypeUpdate, setMealTypeUpdate] = React.useState("")
  const [_costUpdate, setCostUpdate] = React.useState("")
  const [_costUpdateHelper, setCostUpdateHelper] = React.useState("")
  const [_employeeCostUpdate, setEmployeeCostUpdate] = React.useState("")
  const [_employeeCostUpdateHelper, setEmployeeCostUpdateHelper] = React.useState("")
  const [_companyCostUpdate, setCompanyCostUpdate] = React.useState("")
  const [_companyCostUpdateHelper, setCompanyCostUpdateHelper] = React.useState("")
  const [_fromTimeUpdate, setFromTimeUpdate] = React.useState("")
  const [_toTimeUpdate, setToTimeUpdate] = React.useState("")
  const [_catererIDUpdate, setCatererIDUpdate] = React.useState("")

  const [_tableHeadings, setTableHeadings] = React.useState(["Meal ID", "Cost", "Employee Cost", "Company Cost", "Caterer ID", "From", "To", "Status"])
  const [_mealTypeResults, setMealTypeResults] = React.useState([])

  function submitForm(event) {
    console.log('submitting')
    let data = {
      "meal_id": _mealType,
      "cost": _cost,
      "employee_cost": _employeeCost,
      "company_cost": _companyCost,
      // "from_time": _fromTime,
      // "to_time": _toTime,
      "caterer_id": _catererID,
      "inactive": false
    }
    console.log(data)
    meal_types.post(data).then(res => console.log(res))
  }

  function submitUpdateForm(event) {
    console.log('updateiung')
    let data = {
      "meal_id": _mealTypeUpdate,
      "cost": _costUpdate,
      "employee_cost": _employeeCostUpdate,
      "company_cost": _companyCostUpdate,
      // "from_time": _fromTimeUpdate,
      // "to_time": _toTimeUpdate,
      "caterer_id": _catererIDUpdate,
      "inactive": false
    }
    console.log(data)
    meal_types.put(data).then(res => console.log(res))
  }

  function onChange(event) {
    let error;
    console.log(event.target.id)
    switch(event.target.id) {
      case 'meal-type':
        setMealType(event.target.value)
        break;
        
      case 'total-cost':
        setCost(event.target.value)
        error = /^[0-9]+$/.test(event.target.value)
        if(!error) {
          setCostHelper("Invalid Cost")
        }
        else {
          setCostHelper("")
          if(_employeeCost != "")
            setCompanyCost(String(event.target.value - _employeeCost))
        }
        break;
      
      case 'employee-cost':
        setEmployeeCost(event.target.value)
        error = /^[0-9]+$/.test(event.target.value)
        if(!error) {
          setEmployeeCostHelper("Invalid Employee Cost")
        }
        else {
          setEmployeeCostHelper("")
          if(_cost != "")
            setCompanyCost(String(_cost - event.target.value))
        }
        break;
      
      case 'caterer-id':
        setCatererID(event.target.value)
      case 'from-time':
        console.log(event.target.value)
        //setFromTime(event.target.value)
      case 'to-time':
        console.log(event.target.value)
        //setToTime(event.target.value)
    }
  }

  function onUpdateChange(event) {
    let error;
    console.log(event.target.id)
    switch(event.target.id) {
      case 'meal-type':
        setMealTypeUpdate(event.target.value)
        break;
        
      case 'total-cost':
        setCostUpdate(event.target.value)
        error = /^[0-9]+$/.test(event.target.value)
        if(!error) {
          setCostUpdateHelper("Invalid Cost")
        }
        else {
          setCostUpdateHelper("")
          if(_employeeCost != "")
            setCompanyCostUpdate(String(event.target.value - _employeeCostUpdate))
        }
        break;
      
      case 'employee-cost':
        setEmployeeCostUpdate(event.target.value)
        error = /^[0-9]+$/.test(event.target.value)
        if(!error) {
          setEmployeeCostUpdateHelper("Invalid Employee Cost")
        }
        else {
          setEmployeeCostUpdateHelper("")
          if(_costUpdate != "")
            setCompanyCostUpdate(String(_costUpdate - event.target.value))
        }
        break;
      
      case 'caterer-id':
        setCatererIDUpdate(event.target.value)
      case 'from-time':
        console.log(event.target.value)
        //setFromTimeUpdate(event.target.value)
      case 'to-time':
        console.log(event.target.value)
        //setToTimeUpdate(event.target.value)
    }
  }

  function handleMealDelete(meal_id) {
    return (event) => {
      // needs to delete
      console.log('deleteing', meal_id)
      meal_types.get(meal_id).then((res) => {
        var new_meal_type = {...res.payload}
        delete new_meal_type._id
        new_meal_type.inactive = !new_meal_type.inactive
        console.log(new_meal_type)
        meal_types.put(new_meal_type).then(res => {
          console.log('updated', res)
          getMealsForm()
        })
      })

    }
  }

  function handleMealUpdate(meal_id) {
    return (event) => {
      // needs to delete
      console.log('updating', meal_id)
      meal_types.get(meal_id).then((res) => {
        var mt = res.payload
        delete mt._id
        setMealTypeUpdate(mt.meal_id)
        setCostUpdate(mt.cost)
        setEmployeeCostUpdate(mt.employee_cost)
        setCompanyCostUpdate(mt.company_cost)
        // setFromTimeUpdate(mt.from_time)
        // setToTimeUpdate(mt.to_time)
        setCatererIDUpdate(mt.caterer_id)
        })
      
    }
  }

  function getMealsForm() {
    meal_types.getAll().then(res => {
      var results = res.payload.map(it => {
        var meal_id = it.meal_id
        var cost = it.cost
        var employee_cost = it.employee_cost
        var company_cost = it.company_cost
        var caterer_id = it.caterer_id
        var inactive = it.inactive ? "inactive":"active"
        var from_time = new Date(String(it.from_time))
        var to_time = new Date(String(it.to_time))

        return [meal_id, cost, employee_cost, company_cost, caterer_id, getHHMMSS(from_time), getHHMMSS(to_time), inactive,
          <Button color="danger" onClick={handleMealDelete(meal_id)}>Toggle Active</Button>,
          <Button color="warning" onClick={handleMealUpdate(meal_id)}>Update</Button>,
        ]
      })
      console.log(results)
      setMealTypeResults(results)
    })
  }

  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>All Meals</h4>
              <p className={classes.cardCategoryWhite}>Current Meals</p>
            </CardHeader>
            <CardBody>

            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={_tableHeadings}
                    tableData={_mealTypeResults}
                  />
                </GridItem>
              </GridContainer>

            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={getMealsForm}>Get Current Meals</Button>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
        <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Meals</h4>
              <p className={classes.cardCategoryWhite}>Add a Meal type</p>
            </CardHeader>
            <CardBody>
              <GridContainer>

                <GridItem xs={12} sm={12} md={6}>
                  <TextField id="meal-type" label="Meal Type" 
                    value={_mealType}
                    onChange={onChange}
                    fullWidth
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <TextField id="caterer-id" label="Caterer ID"
                    value={_catererID}
                    onChange={onChange}
                    fullWidth
                  />
                </GridItem>
                </GridContainer>

                <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField id="total-cost" label="Total Cost" 
                    value={_cost}
                    onChange={onChange}
                    fullWidth
                    error={_costHelper.length !== 0}
                    helperText={_costHelper}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField id="employee-cost" label="Employee Cost" 
                    value={_employeeCost}
                    onChange={onChange}
                    fullWidth
                    error={_employeeCostHelper.length !== 0}
                    helperText={_employeeCostHelper}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField id="company-cost" label="Company Cost"
                    value={_companyCost}
                    fullWidth
                    disabled
                    error={_companyCostHelper.length !== 0}
                    helperText={_companyCostHelper}
                  />
                </GridItem>

              </GridContainer>

              <GridContainer>
                <GridItem>
                <TextField
                  id="from-time"
                  label="From Time"
                  type="time"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  value={_fromTime}
                  onChange={onChange}
                />
                </GridItem>
                <GridItem>
                <TextField
                  id="to-time"
                  label="To Time"
                  type="time"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  value={_toTime}
                  onChange={onChange}
                />
                </GridItem>
              </GridContainer>

              {/* <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField id="caterer-id" label="Caterer ID"
                    value={_catererID}
                    onChange={onChange}
                    fullWidth
                  />
                </GridItem>
              </GridContainer> */}

            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={submitForm}>Add Meal Type</Button>
            </CardFooter>
          </Card>
        </GridItem>
      


      <GridItem xs={12} sm={12} md={12}>
        <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Meals</h4>
              <p className={classes.cardCategoryWhite}>Update a Meal type</p>
            </CardHeader>
            <CardBody>
              <GridContainer>

                <GridItem xs={12} sm={12} md={6}>
                  <TextField id="meal-type" label="Meal Type" 
                    value={_mealTypeUpdate}
                    onChange={onUpdateChange}
                    fullWidth
                    disabled
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <TextField id="caterer-id" label="Caterer ID"
                    value={_catererIDUpdate}
                    onChange={onUpdateChange}
                    fullWidth
                  />
                </GridItem>
                </GridContainer>

                <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField id="total-cost" label="Total Cost" 
                    value={_costUpdate}
                    onChange={onUpdateChange}
                    fullWidth
                    error={_costUpdateHelper.length !== 0}
                    helperText={_costUpdateHelper}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField id="employee-cost" label="Employee Cost" 
                    value={_employeeCostUpdate}
                    onChange={onUpdateChange}
                    fullWidth
                    error={_employeeCostUpdateHelper.length !== 0}
                    helperText={_employeeCostUpdateHelper}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField id="company-cost" label="Company Cost"
                    value={_companyCostUpdate}
                    fullWidth
                    disabled
                    error={_companyCostUpdateHelper.length !== 0}
                    helperText={_companyCostUpdateHelper}
                  />
                </GridItem>

              </GridContainer>

              <GridContainer>
                <GridItem>
                <TextField
                  id="from-time"
                  label="From Time"
                  type="time"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  value={_fromTimeUpdate}
                  onChange={onUpdateChange}
                />
                </GridItem>
                <GridItem>
                <TextField
                  id="to-time"
                  label="To Time"
                  type="time"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  value={_toTimeUpdate}
                  onChange={onUpdateChange}
                />
                </GridItem>
              </GridContainer>

              {/* <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField id="caterer-id" label="Caterer ID"
                    value={_catererID}
                    onChange={onChange}
                    fullWidth
                  />
                </GridItem>
              </GridContainer> */}

            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={submitUpdateForm}>Update Meal Type</Button>
            </CardFooter>
          </Card>
        </GridItem>
        </GridContainer>
    </div>
  );
}