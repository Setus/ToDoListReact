class PageState {

    itemsList;
    isLoaded;
    error;

    constructor(itemsList, isLoaded, error) {
        this.itemsList = itemsList;
        this.isLoaded = isLoaded;
        this.error = error;
    }
}

export default PageState;