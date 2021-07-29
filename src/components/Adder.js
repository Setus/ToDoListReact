import React from 'react';

class Adder extends React.Component {

    constructor() {
        super();
        this.state = {newItemName: ''}
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
            this.props.addNewItemToState(this.state.newItemName);
            this.setState({newItemName: ''});
        }
    }

    deleteAllDone = (event) => {
        // console.log("Clicked on Delete all");
        event.preventDefault();
        this.props.deleteAllDoneFromState();
    }



}

export default Adder;