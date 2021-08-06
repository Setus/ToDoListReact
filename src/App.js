import React from 'react';
import './mystyle.css';
import ItemComponent from './components/ItemComponent';
import AdderComponent from './components/AdderComponent';
import ItemService from './ItemService';
import PageState from './PageState';

class App extends React.Component {
  
  itemService;
  pageState;

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
    // this.pageState = new PageState([], false, null);
    // this.state = this.pageState;

    this.itemService = new ItemService(this);
  }

  componentDidMount() {
    this.itemService.getAllItems();
  }

  render() {
    if (this.state.error && this.state.error.message === "Failed to fetch") {
      return (
        <div>
          <h1 className="h1Style">My to-do list</h1>
          <h2 className="h1Style">Server is unavailable</h2>        
        </div>
        );
    } else if (!this.state.isLoaded) {
      return (
        <div>
          <h1 className="h1Style">Loading...</h1>
        </div>
      );
    } else {
      return (
        <div>
          <h1 className="h1Style">My to-do list</h1>

          <AdderComponent 
            importedState={this}
          />

          <ul className="listStyle">
            {this.state.itemsList.map((item) => (
              <ItemComponent 
                key={item.itemId} 
                itemId={item.itemId} 
                itemName={item.itemName} 
                done={item.done}
                importedState={this}
              />    
            ))}
          </ul>
        </div>
      );
    }
  }
}


export default App;
