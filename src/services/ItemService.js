import Item from "../models/Item";
import PageState from "../models/PageState";
import ApiService from "./ApiService";

class ItemService {

    apiService
    importedState;

    constructor(importedState) {
      this.importedState = importedState;
      this.apiService = new ApiService(importedState);
    }

    getAllItems = () => {
        this.apiService.callGetAPI(this.importedState);
    }

    addNewItemToState = (newItemName) => {
        let biggestItemId = -1;
        if (this.importedState.state.itemsList.length > 0) {
            this.importedState.state.itemsList.forEach((value) => {
            if (value.itemId > biggestItemId) {
                biggestItemId = value.itemId;
            }
            });
        }

        let newItem = new Item(biggestItemId + 1, newItemName, false);
        
        this.importedState.setState(prevState => {
            let newItemList = [...prevState.itemsList];
            newItemList.push(newItem);
            return new PageState(newItemList, true, null);
        }, 
        () => {this.apiService.callCreateAPI(newItem)});
    }
    
    updateItemInState = (updatedItem) => {
        this.importedState.setState(prevState => {
            let newItemList = [...prevState.itemsList];
            let oldItemIndex = newItemList.findIndex((value, index, array) => {
                return value.itemId === updatedItem.itemId;
            });
            newItemList[oldItemIndex] = updatedItem;
            return new PageState(newItemList, true, null);
        }, 
        () => {this.apiService.callUpdateAPI(updatedItem)});
    }

    deleteItemFromState = (itemToDelete) => {
        this.importedState.setState(prevState => {
            let newItemList = [...prevState.itemsList];
            let oldItemIndex = newItemList.findIndex((value, index, array) => {
                return value.itemId === itemToDelete.itemId;
            });
            newItemList.splice(oldItemIndex, 1);
            return new PageState(newItemList, true, null);
        }, 
        () => {this.apiService.callDeleteAPI(itemToDelete)});
    }

    deleteAllDoneFromState = () => {
        this.importedState.setState(prevState => {
            let listCopy = [...prevState.itemsList];
            let newItemList = listCopy.filter((value, index, array) => {
                return value.done === false;
            });
            return new PageState(newItemList, true, null);
        }, 
        () => {this.apiService.callDeleteAllDoneAPI()});
    }

}

export default ItemService;