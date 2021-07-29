import React from 'react';
import './mystyle.css';
import Item from './components/Item';
import Adder from './components/Adder';
import Footer from './components/Footer';

class App extends React.Component {
  
  baseUrl = "https://localhost:50294/api/item/";
  getUrl = this.baseUrl + "get";
  createUrl = this.baseUrl + "create";
  updateUrl = this.baseUrl + "update";
  deleteUrl = this.baseUrl + "delete";
  deleteAllDoneUrl = this.baseUrl + "deletealldone";


  constructor() {
    super();
    this.state = { 
      itemsList:[],
          // [{itemId: 0, itemName: "Bread", done: false},
          // {itemId: 1, itemName: "Milk", done: true},
          // {itemId: 2, itemName: "Vegetables", done: false}]
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    this.callGetAPI();
  }


  addNewItemToState = (newItemName) => {
    let biggestItemId = -1;
    if (this.state.itemsList.length > 0) {
      this.state.itemsList.forEach((value) => {
        if (value.itemId > biggestItemId) {
          biggestItemId = value.itemId;
        }
      });
    }

    console.log("Biggest item id in current list: " + biggestItemId);

    this.setState(prevState => {
      let newItemList = [...prevState.itemsList];
      newItemList.push({itemId: biggestItemId + 1, itemName: newItemName, done: false});
      return {itemsList: newItemList}
    }, () => {this.callCreateAPI()}
    );
  }

  updateItemInState = (updatedItem) => {
    this.setState(prevState => {
      let newItemList = [...prevState.itemsList];
      let oldItemIndex = newItemList.findIndex((value, index, array) => {
        return value.itemId === updatedItem.itemId;
      });
      newItemList[oldItemIndex] = updatedItem;
      return {itemsList: newItemList}
    }, () => {this.callUpdateAPI(updatedItem)})
  }

  deleteItemFromState = (itemToDelete) => {
    this.setState(prevState => {
      let newItemList = [...prevState.itemsList];
      let oldItemIndex = newItemList.findIndex((value, index, array) => {
        return value.itemId === itemToDelete.itemId;
      });
      newItemList.splice(oldItemIndex, 1);
      return {itemsList: newItemList}
    }, () => {this.callDeleteAPI(itemToDelete)})
  }

  deleteAllDoneFromState = () => {
    this.setState(prevState => {
      let listCopy = [...prevState.itemsList];
      let newItemList = listCopy.filter((value, index, array) => {
        return value.done === false;
      });
      return {itemsList: newItemList}
    }, () => {this.callDeleteAllDoneAPI()})
  }

  render() {
    if (this.state.error) {
      return (
        <div className="backgroundStyle">
          <h1 className="h1Style">Error: {this.state.error.message}</h1>        
          <Footer />
        </div>
        );
    } else if (!this.state.isLoaded) {
      return (
        <div className="backgroundStyle">
          <h1 className="h1Style">Loading...</h1>
          <Footer />
        </div>
      );
    } else {
      return (
        <div className="backgroundStyle">
          <h1 className="h1Style">My to-do list</h1>

          <Adder 
            items={this.state} 
            addNewItemToState={this.addNewItemToState} 
            deleteAllDoneFromState={this.deleteAllDoneFromState}
          />

          <ul className="listStyle">
            {this.state.itemsList.map((item) => (
              <Item 
                key={item.itemId} 
                itemId={item.itemId} 
                itemName={item.itemName} 
                done={item.done} 
                updateItemInState={this.updateItemInState}
                deleteItemFromState={this.deleteItemFromState}
              />    
            ))}
          </ul>
          <Footer />
        </div>
      );
    }
  }

  callGetAPI = () => {
    fetch(this.getUrl)
      .then(results => results.json())
      .then(
        (results) => {
          if (results == null) {
            this.setState(
              { 
                itemsList: [],
                isLoaded: true
              });
          } else {
            this.setState(
              { 
                itemsList: results,
                isLoaded: true
              });
          }
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error: error
        });
      });
  }

  callCreateAPI = () => {
    let newItem = this.state.itemsList[this.state.itemsList.length - 1];
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
      .then(response => {
        if (!response.ok) {
          console.log("Error in response from API call");
          console.log("Response status " + response.status);
          console.log(response);
        }
    });
  }

}


export default App;
