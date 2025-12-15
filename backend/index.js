import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'
import ReportRoutes from "./Routes/ReportRoutes.js";
import router from "./Routes/user.Route.js";
import userAuthenticate from "./Routes/user.authenticate.js";
import cookieParser from "cookie-parser";


dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
// Routes
app.use("/api/auth", router);
app.use("/api",  userAuthenticate);
app.use("/api/reports", ReportRoutes);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));


try {
  await mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));;
  console.log("DB connected");
} catch (err) {
  console.error("DB connection failed", err.messages);
}
console.log("after DB connection")
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`))
}

// Vercel deployment
export default app