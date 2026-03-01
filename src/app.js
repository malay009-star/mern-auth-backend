// For Development Connection
// import express from "express";
// import authRoutes from "./routes/auth.routes.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import userRoutes from "./routes/user.routes.js";

// const app = express();
// app.use(cookieParser());
// app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   }),
// );

// app.get("/", (req, res) => {
//   res.send("Hello from Node API Server");
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

// export default app;

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./db/index.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

// Connect DB
connectDB();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export default app;