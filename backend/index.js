import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import ReportRoutes from "./Routes/ReportRoutes.js";
import router from "./Routes/user.Route.js";
import userAuthenticate from "./Routes/user.authenticate.js";

dotenv.config();

const app = express();

/* ===== Middlewares ===== */
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://health-mate-psi.vercel.app",
    ],
    credentials: true,
  })
);

/* ===== Routes ===== */
app.get("/", (req, res) => {
  res.send("HealthMate API is running...");
});

app.use("/api/auth", router);
app.use("/api", userAuthenticate);
app.use("/api/reports", ReportRoutes);

/* ===== DB ===== */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err.message));

/* ===== Local only ===== */
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
}

/* ===== Vercel ===== */
export default app;
