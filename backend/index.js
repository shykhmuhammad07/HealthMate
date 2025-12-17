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

// Define allowed origins globally
const allowedOrigins = [
  "http://localhost:5173",
  "https://health-mate-6brw.vercel.app",
  "https://health-mate-psi.vercel.app",
];

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman or server-to-server)
      if (!origin) return callback(null, true);

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

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on ${process.env.NODE_ENV === "production" ? "Vercel" : "http://localhost:" + PORT}`);
    });
  } catch (err) {
    console.error("DB connection failed:", err.message);
  }
};

startServer();

// Export for Vercel deployment
export default app;
