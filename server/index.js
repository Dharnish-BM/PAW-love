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

/* -----------------------------------------------------
   ✅ FIXED CORS CONFIG (works on Render + Vercel)
----------------------------------------------------- */

app.use(
  cors({
    origin: "https://paw-lovee.vercel.app", // EXACT domain only
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Preflight
app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://paw-lovee.vercel.app");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    return res.sendStatus(200);
});

/* -----------------------------------------------------
   Parse request body + cookies
----------------------------------------------------- */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

/* -----------------------------------------------------
   Routes
----------------------------------------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/adoptions", adoptionRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/dictionary", petDictionaryRoutes);

app.get("/", (req, res) => {
  res.send("🐾 PAW-love Backend is running!");
});

/* -----------------------------------------------------
   Start Server
----------------------------------------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
