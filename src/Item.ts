class Item {

    itemId: number;
    itemName: string;
    done: boolean;

    constructor(itemId: number, itemName : string, done: boolean) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.done = done;
    }

    get ItemId() {
        return this.itemId;
    }

    set ItemId(itemId : number) {
        this.ItemId = this.itemId
    }

    get ItemName() {
        return this.itemName;
    }

    set ItemName(newItemName : string) {
        this.itemName = newItemName;
    }

    get Done() {
        return this.done;
    }

    set Done(newDone : boolean) {
        this.done = newDone;
    }

    toString() {
        return "itemId: " + this.itemId + ", itemName: " + this.itemName + ", done: " + this.done;
    }
}

export default Item;