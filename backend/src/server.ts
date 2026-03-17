import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.status(200).send("Welcome");
});

app.use((req, res) => {
  res.status(404).send("Invalid URL");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});
