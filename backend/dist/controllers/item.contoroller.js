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
exports.default = {
    getAllItems,
};
