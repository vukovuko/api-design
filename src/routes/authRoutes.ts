import { Router, type Request, type Response } from "express";

const router = Router();

router.post("/register", (req: Request, res: Response) => {
  res.status(201).json({ message: "Register new user" });
});

router.post("/login", (req: Request, res: Response) => {
  res.status(201).json({ message: "Login successful" });
});

export default router;
