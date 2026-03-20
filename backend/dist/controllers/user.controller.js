"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_models_1 = __importDefault(require("../models/user.models"));
const getAllUsers = (req, res) => {
    const user = user_models_1.default.getAllUsers();
    res.status(200).json(user);
};
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const newUser = yield user_models_1.default.addUser(username, password);
    if (!newUser) {
        res.status(400).json({ error: "User is taken already" });
        return;
    }
    res.status(200).json(newUser);
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield user_models_1.default.checkAuth(username, password);
    if (!user) {
        res.status(400).json({ error: "Username or password is wrong" });
        return;
    }
    res.cookie("loginUser", user.username, {
        maxAge: 2 * 60 * 1000,
        httpOnly: true,
    });
    res.status(200).json(user);
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    const target = user_models_1.default.logout(username);
    if (!target) {
        res.status(400).json({ error: "User is not found" });
        return;
    }
    res.clearCookie("isLoggedIn");
    res.status(200).json({ message: `${username} is successfully logged out!` });
});
const deleteUser = (req, res) => {
    const { id } = req.params;
    const target = user_models_1.default.deleteUser(id);
    if (!target) {
        res.status(400).json({ error: "User is not found" });
        return;
    }
    res.status(200).json({ target });
};
exports.default = {
    getAllUsers,
    addUser,
    login,
    deleteUser,
    logout,
};
