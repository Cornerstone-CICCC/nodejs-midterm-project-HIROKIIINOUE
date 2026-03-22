import { Request, Response } from "express";
import userModels from "../models/user.models";
import { User } from "../types/user.types";

const getAllUsers = (req: Request, res: Response) => {
  const user = userModels.getAllUsers();
  res.status(200).json(user);
};

const addUser = async (
  req: Request<{}, {}, Omit<User, "id">>,
  res: Response,
) => {
  const { username, password } = req.body;
  const user: User | null = await userModels.addUser(username, password);
  if (!user) {
    res.status(400).json({ error: "User is taken already" });
    return;
  }
  const userWithoutPass: Omit<User, "password"> = {
    id: user.id,
    username: user.username,
  };
  res.status(200).json(userWithoutPass);
};

const login = async (req: Request<{}, {}, Omit<User, "id">>, res: Response) => {
  const { username, password } = req.body;
  const user: User | null = await userModels.login(username, password);
  if (!user) {
    res.status(400).json({ error: "Username or password is wrong" });
    return;
  }
  res.cookie("loginUser", user.username, {
    maxAge: 4 * 60 * 60 * 1000,
    httpOnly: true,
  });
  const userWithoutPass: Omit<User, "password"> = {
    id: user.id,
    username: user.username,
  };
  res.status(200).json(userWithoutPass);
};

const checkAuth = (req: Request, res: Response) => {
  const { loginUser } = req.cookies;
  const user = userModels.checkAuth(loginUser);
  if (!user) {
    res.status(401).json({ error: "You are not authorized" });
    return;
  }
  res.status(200).json(user.username);
};

const logout = async (
  req: Request<{}, {}, { username: string }>,
  res: Response,
) => {
  const { username } = req.body;
  const target: User | null = userModels.logout(username);
  if (!target) {
    res.status(400).json({ error: "User is not found" });
    return;
  }
  res.clearCookie("loginUser");
  res.status(200).json({ message: `${username} is successfully logged out!` });
};

const deleteUser = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const user: User | null = userModels.deleteUser(id);
  if (!user) {
    res.status(400).json({ error: "User is not found" });
    return;
  }
  const userWithoutPass: Omit<User, "password"> = {
    id: user.id,
    username: user.username,
  };
  res.status(200).json(userWithoutPass);
};

export default {
  getAllUsers,
  addUser,
  login,
  deleteUser,
  logout,
  checkAuth,
};
