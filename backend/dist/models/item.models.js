"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class ItemModel {
    constructor() {
        this.items = [];
    }
    getAll() {
        return this.items;
    }
    addItem(name, neededFor, isFood, isCompleted) {
        const newItem = {
            id: (0, uuid_1.v4)(),
            name,
            neededFor,
            isFood,
            isCompleted,
        };
        this.items = [...this.items, newItem];
        return newItem;
    }
    deleteAll() {
        this.items = [];
        return true;
    }
    deleteById(id) {
        const deletedItem = this.items.find((item) => item.id === id);
        const newItemList = this.items.filter((item) => item.id !== id);
        this.items = newItemList;
        return deletedItem;
    }
    toggleCompletion(id) {
        const target = this.items.find((item) => item.id === id);
        if (!target) {
            return null;
        }
        target.isCompleted = !target.isCompleted;
        return target;
    }
    updateItem(id, name, neededFor, isFood, isCompleted) {
        const target = this.items.find((items) => items.id === id);
        if (!target) {
            return null;
        }
        target.name = name;
        target.neededFor = neededFor;
        target.isFood = isFood;
        target.isCompleted = isCompleted;
        const otherItems = this.items.filter((item) => item.id !== id);
        this.items = [...otherItems, target];
        return target;
    }
    getFilteredItem(menu) {
        const filteredItem = this.items.filter((item) => {
            if (item.neededFor.length === 1) {
                return item.neededFor[0] === menu;
            }
            else if (item.neededFor.length > 1) {
                return item.neededFor.includes(menu);
            }
            return;
        });
        return filteredItem;
    }
}
exports.default = new ItemModel();
