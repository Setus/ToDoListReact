import React from 'react';

class Item extends React.Component {

    constructor() {
        super();
        this.state = {
            editing: false,
            newItemName: ''
        }
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
        this.props.updateItemInState({itemId: this.props.itemId, itemName: this.props.itemName, done: !this.props.done});
    }

    editItem = () => {
        // console.log("Pressed on Edit button");
        this.setState(prevState => {
            return {editing: !prevState.editing};
        });
        // console.log("The editing state is: " + this.state.editing);
    }

    handleEditing = (event) => {
        event.preventDefault();       
        this.setState(prevState => {
            return {
                editing: prevState.editing,
                newItemName: event.target.value
            }
        }); 
    }

    handleSubmit = (event) => {
        // console.log("Submitted an edited item");
        event.preventDefault();
        if (this.state.newItemName !== undefined && this.state.newItemName !== '' && this.state.newItemName.trim() !== '') {
            // let newItem = {itemId: this.props.itemId, itemName: this.state.newItemName, done: this.props.done};
            // console.log("The new item is:" + newItem.itemName);
            this.props.updateItemInState({itemId: this.props.itemId, itemName: this.state.newItemName, done: this.props.done});
            // this.setState({newItemName: ''});
            this.setState({editing: false, newItemName: ''});
        }
    }

    deleteItem = (event) => {
        event.preventDefault();
        this.props.deleteItemFromState({itemId: this.props.itemId, itemName: this.props.itemName, done: this.props.done});
    }

}

export default Item;