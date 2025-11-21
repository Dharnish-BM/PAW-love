import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js"; // 👈 add .js

import adoptionRoutes from "./routes/adoptionRoutes.js"; // 👈 add .js
import authRoutes from "./routes/authRoutes.js"; // 👈 add .js
import communityRoutes from "./routes/communityRoutes.js"; // 👈 add .js
import notificationRoutes from "./routes/notificationRoutes.js"; // 👈 add .js
import petDictionaryRoutes from "./routes/petDictionaryRoutes.js"; // 👈 add .js
import petRoutes from "./routes/petRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Increase payload size limit for image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

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
