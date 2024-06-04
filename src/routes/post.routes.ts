import { Router } from "express";
import PostController from "../controllers/post.controller";

const router = Router();

router.post("/", PostController.createPost.bind(PostController));
router.get("/", PostController.getPosts.bind(PostController));
router.get("/:id", PostController.getPost.bind(PostController));
router.put("/:id", PostController.updatePost.bind(PostController));
router.delete("/:id", PostController.deletePost.bind(PostController));

export default router;
