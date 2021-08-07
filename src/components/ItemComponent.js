import React from 'react';
import Item from '../models/Item';
import ItemService from '../services/ItemService';

class ItemComponent extends React.Component {

    itemService;

    constructor() {
        super();
        this.state = new ComponentState(false, '');
    }

    componentDidMount() {
        this.itemService = new ItemService(this.props.importedState);
    }

    outputItemName = () => {
        if (this.state.editing) {
            return(
                <div>
                    <form onSubmit={this.handleSubmit}> 
                        <input className="inputFieldEditStyle" type="text" name="editItemField" placeholder={this.props.itemName} value={this.state.newItemName} onChange={this.handleEditing} autoFocus/>
                    </form>
                </div>
            );
        } else if (this.props.done) {
            return(<p className="itemSize"><s>{this.props.itemName}</s></p>);
        } else {
            return(<p className="itemSize">{this.props.itemName}</p>);
        }
    }

    editOrSaveButton = () => {
        if (this.state.editing) {
            return (
                <button className="buttonStyle" onClick={this.handleSubmit}>Save</button>
            );
        } else {
            return (
                <button className="buttonStyle" onClick={this.editItem}>Edit</button>
            );
        }
    }

    render() {        
        return (
            <div>
                <li>
                    <div className="itemBox">
                        {this.outputItemName()}
                        {this.editOrSaveButton()}
                        <button className="buttonStyle" onClick={this.setItemToDone}>Done</button>
                        <button className="buttonStyle" onClick={this.deleteItem}>Delete</button>
                    </div>
                </li>
            </div>
        )
    }

    setItemToDone = () => {
        this.itemService.updateItemInState(new Item(this.props.itemId, this.props.itemName, !this.props.done));
    }

    editItem = () => {
        // console.log("Pressed on Edit button");
        this.setState(prevState => new ComponentState(!prevState.editing, null));
        // console.log("The editing state is: " + this.state.editing);
    }

    handleEditing = (event) => {
        event.preventDefault();       
        this.setState(prevState => new ComponentState(prevState.editing, event.target.value)); 
    }

    handleSubmit = (event) => {
        // console.log("Submitted an edited item");
        event.preventDefault();
        if (this.state.newItemName !== undefined && this.state.newItemName !== '' && this.state.newItemName.trim() !== '') {
            // let newItem = {itemId: this.props.itemId, itemName: this.state.newItemName, done: this.props.done};
            // console.log("The new item is:" + newItem.itemName);
            this.itemService.updateItemInState(new Item(this.props.itemId, this.state.newItemName, this.props.done));
            // this.setState({newItemName: ''});
            this.setState(new ComponentState(false, ''));
        }
    }

    deleteItem = (event) => {
        event.preventDefault();
        this.itemService.deleteItemFromState(new Item(this.props.itemId, this.props.itemName, this.props.done));
    }
}

class ComponentState {

    editing;
    newItemName;

    constructor(editing, newItemName) {
        this.editing = editing;
        this.newItemName = newItemName;
    }
}

export default ItemComponent;