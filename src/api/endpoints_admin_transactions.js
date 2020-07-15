import { GET, POST} from '../util/verbs'
import { endpoints } from './endpoints'
import { api } from './api'
// both admin_transactions and admin_transactions do the same if its posting an EmployeePayment

const admin_transactions = new function() {
    this.post = function(admin_transaction) {
        let url = api.base + endpoints.admin_transactions;
        let body = JSON.stringify(admin_transaction);
        console.log(url)
        return POST(url, body)
            .then(response => response.json());
    };

    this.get = function(admin_id) {
        let url = api.base + endpoints.admin_transactions + '/admin/' + admin_id;
        console.log(url)
        return GET(url, null)
            .then(response => response.json());
    };

    this.getAll = function() {
        let url = api.base + endpoints.admin_transactions;
        console.log(url)
        return GET(url, null)
            .then(response => response.json());
    };
}

export { admin_transactions }