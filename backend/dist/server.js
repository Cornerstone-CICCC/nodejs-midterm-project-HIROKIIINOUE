"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const item_route_1 = __importDefault(require("./routes/item.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/user", user_route_1.default);
app.use("/item", item_route_1.default);
app.get("/", (req, res) => {
    res.status(200).send("Welcome");
});
app.use((req, res) => {
    res.status(404).send("Invalid URL");
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});
