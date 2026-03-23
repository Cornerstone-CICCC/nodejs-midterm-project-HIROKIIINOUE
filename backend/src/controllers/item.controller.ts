import { Request, Response } from "express";
import itemModels from "../models/item.models";
import { Item } from "../types/item.types";

const getAllItems = (req: Request, res: Response) => {
  const items = itemModels.getAll();
  if (!items) {
    res.status(400).json({ error: "Items are not found" });
    return;
  }
  res.status(200).json(items);
};

const addItem = (req: Request<{}, {}, Omit<Item, "id">>, res: Response) => {
  const { name, neededFor, isFood, isCompleted } = req.body;
  const newItem = itemModels.addItem(name, neededFor, isFood, isCompleted);
  if (!newItem) {
    res.status(400).json({ error: "You failed to add item" });
    return;
  }
  res.status(201).json(newItem);
};

const deleteAll = (req: Request, res: Response) => {
  const isAllDeletion = itemModels.deleteAll();
  if (!isAllDeletion) {
    res.status(400).json({ error: "You failed to clean up" });
    return;
  }
  res.status(200).json({ message: "You successfully clean up the list" });
};

const deletedById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const deletedItem = itemModels.deleteById(id);
  if (!deletedItem) {
    res.status(404).json({ error: `You failed to delete the item (id:${id})` });
    return;
  }
  res.status(200).json(deletedItem);
};

const toggleCompletion = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const toggledItem: Item | null = itemModels.toggleCompletion(id);
  if (!toggledItem) {
    res
      .status(400)
      .json({ error: `You failed to toggle the item completion (id:${id})` });
    return;
  }
  res.status(200).json(toggledItem);
};

const updateItem = (
  req: Request<{ id: string }, {}, Omit<Item, "id">>,
  res: Response,
) => {
  const { id } = req.params;
  const { name, neededFor, isFood, isCompleted } = req.body;
  const updatedItem = itemModels.updateItem(
    id,
    name,
    neededFor,
    isFood,
    isCompleted,
  );
  if (!updatedItem) {
    res.status(404).json({ error: `You failed to update item (id: ${id})` });
    return;
  }
  res.status(200).json(updatedItem);
};

const getFilteredItem = (
  req: Request<{}, {}, {}, { menu: string }>,
  res: Response,
) => {
  const { menu } = req.query;
  const filteredItem: Item[] = itemModels.getFilteredItem(menu);
  res.status(200).json(filteredItem);
};

export default {
  getAllItems,
  addItem,
  deleteAll,
  deletedById,
  toggleCompletion,
  updateItem,
  getFilteredItem,
};
