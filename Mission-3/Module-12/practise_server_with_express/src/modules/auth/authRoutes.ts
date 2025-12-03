import { Router } from "express";
import { authController } from "./authController";

const router = Router();

router.post("/login", authController.userLogin);

export const authRoutes = router;
