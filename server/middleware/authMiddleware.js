import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware: Protect routes (only logged-in users)
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Get token from cookies
  if (req.cookies && req.cookies.jwt) {
    try {
      token = req.cookies.jwt;

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to request (exclude password)
      req.user = await User.findById(decoded.userId).select("-password");

      next(); // user is valid, proceed
    } catch (error) {
      res.status(401);
      throw new Error("🚫 Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("🚫 Not authorized, no token");
  }
});

// Middleware: Only shelters can access
export const shelterOnly = (req, res, next) => {
  if (req.user && req.user.isShelter) {
    next(); // user is a shelter, proceed
  } else {
    res.status(403);
    throw new Error("🚫 Access denied, shelters only");
  }
};
