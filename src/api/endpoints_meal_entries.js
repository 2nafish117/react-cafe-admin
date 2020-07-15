import { GET, POST} from '../util/verbs'
import { endpoints } from './endpoints'
import { api } from './api'

const meal_entries = new function() {
    this.post = function(meal) {
        let url = api.base + endpoints.meal_entries;
        let body = JSON.stringify(meal);
        console.log(url)
        return POST(url, body)
            .then(response => response.json());
    };

    this.get = function(employee_id) {
        let url = api.base + endpoints.meal_entries + '/employee/' + employee_id;
        console.log(url)
        return GET(url, null)
            .then(response => response.json());
    };

    this.getAll = function() {
        let url = api.base + endpoints.meal_entries;
        console.log(url)
        return GET(url, null)
            .then(response => response.json());
    };
}

export { meal_entries }