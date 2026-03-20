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
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
class UserModel {
    constructor() {
        this.users = [
            {
                id: "aaa",
                username: "test",
                password: "test",
            },
        ];
    }
    getAllUsers() {
        return this.users;
    }
    addUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUserExist = this.users.some((user) => user.username === username);
            if (isUserExist) {
                return null;
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 12);
            const newUser = {
                id: (0, uuid_1.v4)(),
                username,
                password: hashedPassword,
            };
            this.users = [...this.users, newUser];
            return newUser;
        });
    }
    checkAuth(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const target = this.users.find((user) => user.username === username);
            if (!target) {
                return null;
            }
            const isPasswordCorrect = yield bcrypt_1.default.compare(password, target.password);
            if (!isPasswordCorrect) {
                return null;
            }
            return target;
        });
    }
    logout(username) {
        const target = this.users.find((user) => user.username === username);
        if (!target) {
            return null;
        }
        return target;
    }
    deleteUser(id) {
        const target = this.users.find((user) => user.id === id);
        if (!target) {
            return null;
        }
        const newUserList = this.users.filter((user) => user.id !== target.id);
        this.users = newUserList;
        return target;
    }
}
exports.default = new UserModel();
