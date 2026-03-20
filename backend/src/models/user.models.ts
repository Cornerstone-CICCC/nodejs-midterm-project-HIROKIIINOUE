import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { User } from "../types/user.types";

class UserModel {
  private users: User[] = [
    {
      id: "aaa",
      username: "test",
      password: "test",
    },
  ];

  getAllUsers() {
    return this.users;
  }

  async addUser(username: string, password: string) {
    const isUserExist = this.users.some((user) => user.username === username);
    if (isUserExist) {
      return null;
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser: User = {
      id: uuidv4(),
      username,
      password: hashedPassword,
    };
    this.users = [...this.users, newUser];
    return newUser;
  }

  async checkAuth(username: string, password: string) {
    const target = this.users.find((user) => user.username === username);
    if (!target) {
      return null;
    }
    const isPasswordCorrect = await bcrypt.compare(password, target.password);
    if (!isPasswordCorrect) {
      return null;
    }

    return target;
  }

  logout(username: string) {
    const target = this.users.find((user) => user.username === username);
    if (!target) {
      return null;
    }
    return target;
  }

  deleteUser(id: string) {
    const target = this.users.find((user) => user.id === id);
    if (!target) {
      return null;
    }
    const newUserList = this.users.filter((user) => user.id !== target.id);
    this.users = newUserList;

    return target;
  }
}

export default new UserModel();
