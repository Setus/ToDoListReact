class PageState {

    itemsList;
    isLoaded;
    error;

    constructor(itemsList, isLoaded, error) {
        this.itemsList = itemsList;
        this.isLoaded = isLoaded;
        this.error = error;
    }

    get ItemsList() {
        return this.itemsList;
    }

    set ItemsList(itemsList) {
        this.itemsList = itemsList;
    }

    get IsLoaded() {
        return this.isLoaded;
    }

    set IsLoaded(isLoaded) {
        this.isLoaded = isLoaded;
    }

    get Error() {
        return this.error;
    }

    set Error(error) {
        this.error = error;
    } 

}

export default PageState;