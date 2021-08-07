import React from 'react';
import './mystyle.css';
import ItemComponent from './components/ItemComponent';
import AdderComponent from './components/AdderComponent';
import ItemService from './services/ItemService';
import PageState from './models/PageState';

class App extends React.Component {
  
    itemService;

    constructor() {
        super();
        this.state = new PageState([], false, null);
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
