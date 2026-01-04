import { Router } from "express";
import { postController } from "./post.controller";
import auth from "../../middleware/auth";
import { Role } from "../../enums/user.enum";

const router = Router();

router.post("/", auth(Role.ADMIN, Role.USER), postController.createPost);
router.get("/", postController.getALlPost);

export const postRouter = router;
