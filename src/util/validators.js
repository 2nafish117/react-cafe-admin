
function validate(field, name, required, regex) {
    let err = null;
    // @TODO: add more ? error states
    if(required && (field === '' || field === null))
    {
        err = name + ' is mandatory';
    }
    else if(regex.test(field) === false)
    {
        err = 'bad ' + name;
    }
    return err;
}

function validateEmpid(empid, required=true) {
    return validate(empid, "empid", required, /^[a-zA-Z0-9]+$/);
};

// @TODO: icomplete
function validateEmail(email, required=true) {
    return validate(email, "email", required, /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
};

// @TODO: icomplete
function validateFirstName(firstname, required=true) {
    return validate(firstname, "firstname", required, /[a-zA-Z]+/);
};

// @TODO: icomplete
function validateLastName(lastname, required=true) {
    return validate(lastname, "lastname", required, /[a-zA-Z]+/);
};

export { validateEmpid, validateEmail, validateFirstName, validateLastName }