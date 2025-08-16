import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { validateBody } from "../middleware/validation.ts";
import { login, register } from "../controllers/authController.ts";

const router = Router();

// Validation schemas
const registerSchema = z.object({
  email: z.email("Invalid email format"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username too long"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const loginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.post("/logout", (req: Request, res: Response) => {
  res.status(200).json({ message: "Logout successful" });
});

router.post("/refresh", (req: Request, res: Response) => {
  res.status(200).json({ message: "Refresh token successful" });
});

export default router;
