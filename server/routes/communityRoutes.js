import express from "express";
import {
    createComment,
    createPost,
    deleteComment,
    deletePost,
    getComments,
    getPost,
    getPosts,
    likeComment,
    likePost,
    updateComment,
    updatePost
} from "../controllers/communityController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/posts", getPosts);
router.get("/posts/:id", getPost);
router.get("/posts/:id/comments", getComments);

// Protected routes
router.post("/posts", protect, createPost);
router.put("/posts/:id", protect, updatePost);
router.delete("/posts/:id", protect, deletePost);
router.post("/posts/:id/like", protect, likePost);

router.post("/posts/:id/comments", protect, createComment);
router.put("/comments/:id", protect, updateComment);
router.delete("/comments/:id", protect, deleteComment);
router.post("/comments/:id/like", protect, likeComment);

export default router;
