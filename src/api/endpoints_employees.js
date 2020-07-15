import { GET, PUT, POST, DELETE } from '../util/verbs'
import { endpoints } from './endpoints.js'
import { api } from './api'

const employees = new function() {
    this.post = function(employee) {
        let url = api.base + endpoints.employees;
        console.log(url)
        let body = JSON.stringify(employee);
        return POST(url, body)
            .then(response => response.json());
    };

    this.get = function(employee_id) {
        let url = api.base + endpoints.employees + '/' + employee_id;
        console.log(url)
        return GET(url, null)
            .then(response => response.json());
    };

    this.getAll = function() {
        let url = api.base + endpoints.employees;
        console.log(url)
        return GET(url, null)
            .then(response => response.json());
    };

    this.put = function(employee) {
        let url = api.base + endpoints.employees + '/' + employee.employee_id;
        let body = JSON.stringify(employee);
        console.log(url)
        return PUT(url, body)
            .then(response => response.json());
    };

    this.delete = function(employee_id) {
        let url = api.base + endpoints.employees + '/' + employee_id;
        console.log(url)
        return DELETE(url, null)
            .then(response => response.json());
    };
}

export { employees }