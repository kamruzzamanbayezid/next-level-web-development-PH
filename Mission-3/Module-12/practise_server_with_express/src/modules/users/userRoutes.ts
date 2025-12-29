import { Router } from "express";
import { userControllers } from "./userControllers";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", userControllers.createUser);
router.get("/", auth("admin", "moderator"), userControllers.getUsers);
router.get("/:id", userControllers.getUserById);
router.put("/:id", userControllers.updateUserById);
router.delete("/:id", userControllers.deleteUserById);

export const userRoutes = router;
