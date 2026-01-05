import express, { Router } from "express";
import { postController } from "./post.controller";
import auth from "../../middleware/auth";
import { Role } from "../../enums/user.enum";

const router = Router();

router.get("/", postController.getAllPost);
router.get("/:postId", postController.getPostById);
router.post("/", auth(Role.USER, Role.ADMIN), postController.createPost);

export const postRouter = router;
