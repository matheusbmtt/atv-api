import express from "express";
import courseRoutes from "./routes/courseRoutes";
import studentRoutes from "./routes/studentRoutes";

const app = express();

app.use(express.json());

app.use("/courses", courseRoutes);
app.use("/students", studentRoutes);

export default app;