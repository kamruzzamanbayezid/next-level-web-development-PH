import express from "express";
import { userController } from "./users.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", userController.createUser);

router.get("/", auth("admin"), userController.getUsers);

router.get("/:id",auth(), userController.getUserById);

router.put("/:id", userController.updateUserById);

router.delete("/:id", userController.deleteUserById);

export const userRoutes = router;
