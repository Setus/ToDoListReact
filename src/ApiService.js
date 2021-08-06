
class ApiService {

    baseUrl = "https://localhost:50294/api/item/";
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
                this.importedState.setState(
                { 
                    itemsList: [],
                    isLoaded: true
                });
            } else {
                this.importedState.setState(
                { 
                    itemsList: results,
                    isLoaded: true
                });
            }
        },
            (error) => {
                this.importedState.setState(
                {
                    isLoaded: true,
                    error: error
                });
        });
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
            (error) => {
                this.importedState.setState({
                isLoaded: true,
                error: error
            });
        });
    }

}

export default ApiService;