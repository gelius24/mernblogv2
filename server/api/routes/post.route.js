import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, getPosts } from "../controller/post.controller.js";
const router = express.Router();

router.get("/getposts", getPosts)
router.post("/create", verifyToken, create);

export default router;