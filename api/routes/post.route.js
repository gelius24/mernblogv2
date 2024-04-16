import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, getPosts, deletePost, updatePost } from "../controller/post.controller.js";
const router = express.Router();

router.get("/getposts", getPosts)
router.post("/create", verifyToken, create);
router.put("/updatepost/:postId/:userId", verifyToken, updatePost)
router.delete("/deletepost/:postId/:userId", verifyToken, deletePost)

export default router;