import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from "./routes/userRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

connectDB();

app.use("/api", userRouter);
app.use("/api/category", categoryRouter);

app.get("/", (req, res) => {
  res.send("Hello World from Express!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
