import PageState from './../models/PageState';

class ApiService {

    baseUrl = "http://localhost:21561/api/item/";
    getUrl = this.baseUrl + "getall";
    createUrl = this.baseUrl + "create";
    updateUrl = this.baseUrl + "update";
    deleteUrl = this.baseUrl + "delete";
    deleteAllDoneUrl = this.baseUrl + "deletealldone";

    importedState;

    constructor(importedState) {
        this.importedState = importedState;
    }
 
    callGetAPI = () => {
        fetch(this.getUrl)
        .then(results => results.json())
        .then(
            (results) => {
                if (results == null) {
                    this.importedState.setState(new PageState([], true, null));
                } else {
                    this.importedState.setState(new PageState(results, true, null));
                }
            },
            (error) => {this.importedState.setState(new PageState([], true, error))}
        );
    }

    callCreateAPI = (newItem) => {
        this.performFetchRequest('POST', newItem, this.createUrl);
    }

    callUpdateAPI = (updatedItem) => {
        this.performFetchRequest('POST', updatedItem, this.updateUrl);
    }

    callDeleteAPI = (deletedItem) => {
        this.performFetchRequest('DELETE', deletedItem, this.deleteUrl)
    }

    callDeleteAllDoneAPI = () => {
        this.performFetchRequest('DELETE', null, this.deleteAllDoneUrl)
    }

    performFetchRequest = (method, item, url) => {
        const requestOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: item != null ? JSON.stringify(item) : null
        };

        console.log("Request body: " + requestOptions.body);

        fetch(url, requestOptions)
        .then(
            response => {
                if (!response.ok) {
                    console.log("Error in response from API call");
                    console.log("Response status " + response.status);
                    console.log(response);
                }
            },
            (error) => {this.importedState.setState(new PageState([], true, error))}
        );
    }

}

export default ApiService;