import { GET, PUT, POST, DELETE } from '../util/verbs'
import { endpoints } from './endpoints'
import { api } from './api'

const caterers = new function() {
    this.post = function(caterer) {
        let url = api.base + endpoints.caterers;
        let body = JSON.stringify(caterer);
        console.log(url)
        return POST(url, body)
            .then(response => response.json());
    };

    this.get = function(caterer_id) {
        let url = api.base + endpoints.caterers + '/' + caterer_id;
        console.log(url)
        return GET(url, null)
            .then(response => response.json());
    };

    this.getAll = function() {
        let url = api.base + endpoints.caterers;
        console.log(url)
        return GET(url, null)
            .then(response => response.json());
    };

    this.put = function(caterer) {
        let url = api.base + endpoints.caterers + '/' + caterer.caterer_id;
        let body = JSON.stringify(caterer);
        console.log(url)
        return PUT(url, body)
            .then(response => response.json());
    };

    this.delete = function(caterer_id) {
        let url = api.base + endpoints.caterers + '/' + caterer_id;
        console.log(url)
        return DELETE(url, null)
            .then(response => response.json());
    };
}

export { caterers }