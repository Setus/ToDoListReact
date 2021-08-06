class Item {

    itemId;
    itemName;
    done;

    constructor(itemId, itemName, done) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.done = done;
    }

    get ItemId() {
        return this.itemId;
    }

    set ItemId(itemId) {
        this.ItemId = this.itemId
    }

    get ItemName() {
        return this.itemName;
    }

    set ItemName(newItemName) {
        this.itemName = newItemName;
    }

    get Done() {
        return this.done;
    }

    set Done(newDone) {
        this.done = newDone;
    }

    toString() {
        return "itemId: " + this.itemId + ", itemName: " + this.itemName + ", done: " + this.done;
    }
}

export default Item;