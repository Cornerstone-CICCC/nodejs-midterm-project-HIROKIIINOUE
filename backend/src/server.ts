import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";
import cookieParser from "cookie-parser";
import cors from "cors";
import itemRouter from "./routes/item.route";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/item", itemRouter);

app.get("/", (req, res) => {
  res.status(200).send("Welcome");
});

app.use((req, res) => {
  res.status(404).send("Invalid URL");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});
