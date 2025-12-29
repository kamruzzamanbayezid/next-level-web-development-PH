import express, { Router } from "express";
import { postController } from "./post.controller";
import auth from "../../middleware/auth";
import { Role } from "../../enums/user.enum";

const router = Router();

router.post("/", auth(Role.USER), postController.createPost);
router.get("/", postController.getAllPost);

export const postRouter = router;
