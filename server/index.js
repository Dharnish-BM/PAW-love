import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

import adoptionRoutes from "./routes/adoptionRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import petDictionaryRoutes from "./routes/petDictionaryRoutes.js";
import petRoutes from "./routes/petRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Correct CORS setup
app.use(
  cors({
    origin: ["https://paw-lovee.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

// ✅ Handle preflight
app.options("*", cors());

// parse json + files
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());

// ❌ REMOVE THIS (it was breaking everything)
// app.use(cors({ ... }))

// routes
app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/adoptions", adoptionRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/dictionary", petDictionaryRoutes);

app.get("/", (req, res) => {
  res.send("🐾 PAW-love Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
