import { GET } from '../util/verbs'
import { endpoints } from './endpoints'
import { api } from './api'

const search = new function() {
    
    this.getAll = function(resource, name) {
        let url = api.base + endpoints.search + '/' + resource + '?q=' + name;
        console.log(url)
        return GET(url, null)
            .then(response => response.json());
    };
}

export { search }