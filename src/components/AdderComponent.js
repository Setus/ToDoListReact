import React from 'react';
import ItemService from '../services/ItemService';

class AdderComponent extends React.Component {

    itemService

    constructor() {
        super();
        this.state = {newItemName: ''}
    }

    componentDidMount() {
        this.itemService = new ItemService(this.props.importedState);
    }

    render() {
        return (
            <div className="newItemStyle">
                <form onSubmit={this.handleSubmit}> 
                    <input className="newItemInputFieldStyle" type="text" name="name" placeholder="New item" value={this.state.newItemName} onChange={this.updateNewItem} />
                    <input className="buttonStyle" type="submit" value="Add" />
                </form>
                <button className="deleteAllDoneButtonStyle" onClick={this.deleteAllDone}>Delete all done</button>
            </div>
        )
    }

    updateNewItem = (event) => {
        event.preventDefault();       
        this.setState({newItemName: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.newItemName !== undefined && this.state.newItemName !== '' && this.state.newItemName.trim() !== '') {
            this.itemService.addNewItemToState(this.state.newItemName);
            this.setState({newItemName: ''});
        }
    }

    deleteAllDone = (event) => {
        // console.log("Clicked on Delete all");
        event.preventDefault();
        this.itemService.deleteAllDoneFromState();
    }
}

export default AdderComponent;