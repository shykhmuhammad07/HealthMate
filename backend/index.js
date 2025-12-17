// index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes
import ReportRoutes from "./Routes/ReportRoutes.js";
import router from "./Routes/user.Route.js";
import userAuthenticate from "./Routes/user.authenticate.js";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // server-to-server or Postman
      const allowedOrigins = [
        "http://localhost:5173",
        "https://health-mate-6brw.vercel.app",
      ];
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Optional: OPTIONS request handling
app.options("*", cors()); // handle OPTIONS requests for all routes

// Routes
app.get("/", (req, res) => {
  res.send("HealthMate API is running...");
});

app.use("/api/auth", router);           // public auth routes
app.use("/api", userAuthenticate);      // authentication middleware
app.use("/api/reports", ReportRoutes);  // protected report routes

// MongoDB connection & server start
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");

    if (process.env.NODE_ENV !== "production") {
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
      );
    }
  } catch (err) {
    console.error("DB connection failed:", err.message);
  }
};

startServer();

// Vercel deployment
export default app;
