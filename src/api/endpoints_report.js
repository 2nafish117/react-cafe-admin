import { GET } from '../util/verbs'
import { endpoints } from './endpoints'
import { api } from './api'

// /reports/meal_entries
// /reports/meal_entries/employee/{employee_id:[a-zA-Z0-9]+}
// /reports/employee_transactions
// /reports/employee_transactions/employee/{employee_id:[a-zA-Z0-9]+}
// /reports/admin_transactions
// /reports/admin_transactions/admin/{admin_id:[a-zA-Z0-9]+}"

const reports = new function() {
    this.get = function(resource, entity, id) {
        let url = api.base + endpoints.reports + '/' + resource + '/' + entity + '/' + id;
        console.log(url)
        return GET(url, null)
            .then(response => response.json());
    };

    this.getAll = function(resource) {
        let url = api.base + endpoints.reports + '/' + resource;
        console.log(url)
        return GET(url, null)
            .then(response => response.json());
    };

}

export { reports }