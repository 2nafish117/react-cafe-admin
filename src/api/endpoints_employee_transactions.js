
import { GET, POST} from '../util/verbs'
import { endpoints } from './endpoints'
import { api } from './api'

// both admin_transactions and employee_transactions do the same if its posting an EmployeePayment

const employee_transactions = new function() {
    this.post = function(employee_transaction) {
        let url = api.base + endpoints.employee_transactions;
        let body = JSON.stringify(employee_transaction);
        console.log(url)
        return POST(url, body)
            .then(response => response.json());
    };

    this.get = function(employee_id) {
        let url = api.base + endpoints.employee_transactions + '/employee/' + employee_id;
        console.log(url)
        return GET(url, null)
            .then(response => response.json());
    };

    this.getAll = function() {
        let url = api.base + endpoints.employee_transactions;
        console.log(url)
        return GET(url, null)
            .then(response => response.json());
    };
}

export { employee_transactions }