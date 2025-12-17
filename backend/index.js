import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import ReportRoutes from "./Routes/ReportRoutes.js";
import router from "./Routes/user.Route.js";
import userAuthenticate from "./Routes/user.authenticate.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   if (req.method === "OPTIONS") {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });

// Routes
app.get("/", (req, res) => {
  res.send("HealthMate API is running...");
});
app.use("/api/auth", router);
app.use("/api", userAuthenticate);
app.use("/api/reports", ReportRoutes);

try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("MongoDB connected");
} catch (err) {
  console.error("DB connection failed:", err.message);
}

console.log("after DB connection");
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`server running on http://localhost:${PORT}`)
  );
}

// Vercel deployment
export default app;
