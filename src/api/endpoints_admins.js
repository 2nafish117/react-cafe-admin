import { GET, PUT, POST, DELETE } from '../util/verbs'
import { endpoints } from './endpoints'
import { api } from './api'

const admins = new function() {
    this.post = function(admin) {
        let url = api.base + endpoints.admins;
        let body = JSON.stringify(admin);
        console.log(url)
        return POST(url, body)
            .then(response => response.json());
    };

    this.get = function(admin_id) {
        let url = api.base + endpoints.admins + '/' + admin_id;
        console.log(url)
        return GET(url, null)
            .then(response => response.json());
    };

    this.getAll = function() {
        let url = api.base + endpoints.admins;
        console.log(url)
        return GET(url, null)
            .then(response => response.json());
    };

    this.put = function(admin) {
        let url = api.base + endpoints.admins + '/' + admin.admin_id;
        let body = JSON.stringify(admin);
        console.log(url)
        return PUT(url, body)
            .then(response => response.json());
    };

    this.delete = function(admin_id) {
        let url = api.base + endpoints.admins + '/' + admin_id;
        console.log(url)
        return DELETE(url, null)
            .then(response => response.json());
    };
}

export { admins }