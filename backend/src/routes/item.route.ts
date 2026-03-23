import { Router } from "express";
import itemController from "../controllers/item.controller";

const itemRouter = Router();

itemRouter.get("/", itemController.getAllItems);
itemRouter.get("/filtered", itemController.getFilteredItem);
itemRouter.post("/", itemController.addItem);
itemRouter.delete("/", itemController.deleteAll);
itemRouter.delete("/:id", itemController.deletedById);
itemRouter.patch("/:id/toggle", itemController.toggleCompletion);
itemRouter.put("/:id", itemController.updateItem);
export default itemRouter;
