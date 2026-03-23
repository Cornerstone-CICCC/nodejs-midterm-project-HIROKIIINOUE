"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const item_models_1 = __importDefault(require("../models/item.models"));
const getAllItems = (req, res) => {
    const items = item_models_1.default.getAll();
    if (!items) {
        res.status(400).json({ error: "Items are not found" });
        return;
    }
    res.status(200).json(items);
};
const addItem = (req, res) => {
    const { name, neededFor, isFood, isCompleted } = req.body;
    const newItem = item_models_1.default.addItem(name, neededFor, isFood, isCompleted);
    if (!newItem) {
        res.status(400).json({ error: "You failed to add item" });
        return;
    }
    res.status(201).json(newItem);
};
const deleteAll = (req, res) => {
    const isAllDeletion = item_models_1.default.deleteAll();
    if (!isAllDeletion) {
        res.status(400).json({ error: "You failed to clean up" });
        return;
    }
    res.status(200).json({ message: "You successfully clean up the list" });
};
const deletedById = (req, res) => {
    const { id } = req.params;
    const deletedItem = item_models_1.default.deleteById(id);
    if (!deletedItem) {
        res.status(404).json({ error: `You failed to delete the item (id:${id})` });
        return;
    }
    res.status(200).json(deletedItem);
};
const toggleCompletion = (req, res) => {
    const { id } = req.params;
    const toggledItem = item_models_1.default.toggleCompletion(id);
    if (!toggledItem) {
        res
            .status(400)
            .json({ error: `You failed to toggle the item completion (id:${id})` });
        return;
    }
    res.status(200).json(toggledItem);
};
const updateItem = (req, res) => {
    const { id } = req.params;
    const { name, neededFor, isFood, isCompleted } = req.body;
    const updatedItem = item_models_1.default.updateItem(id, name, neededFor, isFood, isCompleted);
    if (!updatedItem) {
        res.status(404).json({ error: `You failed to update item (id: ${id})` });
        return;
    }
    res.status(200).json(updatedItem);
};
const getFilteredItem = (req, res) => {
    const { menu } = req.query;
    const filteredItem = item_models_1.default.getFilteredItem(menu);
    res.status(200).json(filteredItem);
};
exports.default = {
    getAllItems,
    addItem,
    deleteAll,
    deletedById,
    toggleCompletion,
    updateItem,
    getFilteredItem,
};
