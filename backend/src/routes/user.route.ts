import express, { Router, Request, Response } from "express";
import userController from "../controllers/user.controller";
import { User } from "../types/user.types";

const userRouter = Router();

userRouter.get("/", userController.getAllUsers);
userRouter.post("/signup", userController.addUser);
userRouter.post("/login", userController.login);
userRouter.get("/checkAuth", userController.checkAuth);
userRouter.post("/logout", userController.logout);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
