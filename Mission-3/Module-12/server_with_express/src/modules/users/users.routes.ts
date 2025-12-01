import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./users.services";
import { userController } from "./users.controller";

const router = express.Router();

router.post("/", userController.createUser);

router.get("/", userController.getUsers);

router.get("/:id", userController.getUserById);

router.put("/:id", userController.updateUserById);

router.delete("/:id", userController.deleteUserById);

export const userRoutes = router;
