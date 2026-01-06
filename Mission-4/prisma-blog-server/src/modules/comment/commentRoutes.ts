import { Router } from "express";
import { commentControllers } from "./commentControllers";
import auth from "../../middleware/auth";
import { Role } from "../../enums/user.enum";

const router = Router();

router.post("/", auth(Role.ADMIN, Role.USER), commentControllers.createPost);
router.get(
  "/:postId",
  auth(Role.ADMIN, Role.USER),
  commentControllers.getCommentById
);
router.get(
  "/author/:authorId",
  auth(Role.ADMIN, Role.USER),
  commentControllers.getCommentByAuthorId
);
router.delete(
  "/:commentId",
  auth(Role.ADMIN, Role.USER),
  commentControllers.deleteCommentById
);
router.patch(
  "/:commentId",
  auth(Role.ADMIN, Role.USER),
  commentControllers.updateCommentById
);

export const commentRouter = router;
