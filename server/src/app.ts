import express from "express";
import cors from "cors";
import connectDB from "./config/db.config";
import { authRouter } from "./routes/auth.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to the api");
});

// Initialize database connection
connectDB();
app.use(authRouter);

export default app;
