import ApiService from "./ApiService";

class ItemService {

    apiService
    importedState;

    constructor(importedState) {
        this.apiService = new ApiService();
        this.importedState = importedState;
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
        // console.log("Biggest item id in current list: " + biggestItemId);
        this.importedState.setState(prevState => {
          let newItemList = [...prevState.itemsList];
          newItemList.push({itemId: biggestItemId + 1, itemName: newItemName, done: false});
          return {itemsList: newItemList}
        }, 
        () => {this.apiService.callCreateAPI(this.importedState.state.itemsList[this.importedState.state.itemsList.length - 1])});
    }
    
    updateItemInState = (updatedItem) => {
        this.importedState.setState(prevState => {
        let newItemList = [...prevState.itemsList];
        let oldItemIndex = newItemList.findIndex((value, index, array) => {
        return value.itemId === updatedItem.itemId;
        });
        newItemList[oldItemIndex] = updatedItem;
        return {itemsList: newItemList}
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
        return {itemsList: newItemList}
        }, 
        () => {this.apiService.callDeleteAPI(itemToDelete)});
    }

    deleteAllDoneFromState = () => {
        this.importedState.setState(prevState => {
        let listCopy = [...prevState.itemsList];
        let newItemList = listCopy.filter((value, index, array) => {
        return value.done === false;
        });
        return {itemsList: newItemList}
        }, 
        () => {this.apiService.callDeleteAllDoneAPI()});
    }

}

export default ItemService;