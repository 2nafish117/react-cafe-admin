// router.HandleFunc(base+"/meal_types", handler.MealTypePost).Methods("POST")
// router.HandleFunc(base+"/meal_types", handler.MealTypesGet).Methods("GET")
// router.HandleFunc(base+"/meal_types/{meal_id}", handler.MealTypeGet).Methods("GET")
// router.HandleFunc(base+"/meal_types/{meal_id}", handler.MealTypePutByMealID).Methods("PUT")
// router.HandleFunc(base+"/meal_types/{meal_id}", handler.MealTypeDeleteByMealID).Methods("DELETE")

import { GET, POST, PUT, DELETE} from '../util/verbs'
import { endpoints } from './endpoints'
import { api } from './api'

const meal_types = new function() {
    this.post = function(meal_type) {
        let url = api.base + endpoints.meal_types;
        let body = JSON.stringify(meal_type);
        console.log(url)
        return POST(url, body)
            .then(response => response.json());
    };

    this.get = function(meal_id) {
        let url = api.base + endpoints.meal_types + '/' + meal_id;
        console.log(url)
        return GET(url, null)
            .then(response => response.json());
    };

    this.getAll = function() {
        let url = api.base + endpoints.meal_types;
        console.log(url)
        return GET(url, null)
            .then(response => response.json());
    };

    // this.put = function(meal_id, ) {
    //     let url = api.base + endpoints.meal_types + '/' + meal_id;
    //     console.log(url)
    //     return PUT(url, null)
    //         .then(response => response.json());
    // };

    this.put = function(meal_type) {
        let url = api.base + endpoints.meal_types + '/' + meal_type.meal_id;
        let body = JSON.stringify(meal_type);
        console.log(url)
        return PUT(url, body)
            .then(response => response.json());
    };

    this.delete = function(meal_id) {
        let url = api.base + endpoints.meal_types + '/' + meal_id;
        console.log(url)
        return DELETE(url, null)
            .then(response => response.json());
    };
}

export { meal_types }