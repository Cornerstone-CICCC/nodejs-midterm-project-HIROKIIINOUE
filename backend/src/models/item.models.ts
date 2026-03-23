import { Item } from "../types/item.types";
import { v4 as uuidv4 } from "uuid";

class ItemModel {
  private items: Item[] = [
    {
      id: "string",
      name: "tomato",
      neededFor: ["curry", "pasta"],
      isFood: true,
      isCompleted: false,
    },
    {
      id: "string2",
      name: "carrot",
      neededFor: ["curry"],
      isFood: true,
      isCompleted: false,
    },
    {
      id: "string3",
      name: "toilet paper",
      neededFor: [],
      isFood: false,
      isCompleted: false,
    },
    {
      id: "string4",
      name: "spagettie",
      neededFor: ["pasta"],
      isFood: true,
      isCompleted: false,
    },
  ];

  getAll() {
    return this.items;
  }

  addItem(
    name: string,
    neededFor: string[],
    isFood: boolean,
    isCompleted: boolean,
  ) {
    const newItem: Item = {
      id: uuidv4(),
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

  deleteById(id: string) {
    const deletedItem = this.items.find((item) => item.id === id);
    const newItemList = this.items.filter((item) => item.id !== id);
    this.items = newItemList;
    return deletedItem;
  }

  toggleCompletion(id: string) {
    const target = this.items.find((item) => item.id === id);
    if (!target) {
      return null;
    }
    target.isCompleted = !target.isCompleted;
    return target;
  }

  updateItem(
    id: string,
    name: string,
    neededFor: string[],
    isFood: boolean,
    isCompleted: boolean,
  ) {
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

  getFilteredItem(menu: string) {
    const filteredItem = this.items.filter((item) => {
      if (item.neededFor.length === 1) {
        return item.neededFor[0] === menu;
      } else if (item.neededFor.length > 1) {
        return item.neededFor.includes(menu);
      }
      return;
    });
    return filteredItem;
  }
}

export default new ItemModel();
