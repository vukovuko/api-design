import { Router, type Request, type Response } from "express";

const router = Router();

// Routes are relative to where router is mounted
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Get all users" });
});

router.get("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: `Get user ${req.params.id}` });
});

router.post("/", (req: Request, res: Response) => {
  res.status(201).json({ message: "User created" });
});

router.put("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: `Update user ${req.params.id}` });
});

router.delete("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: `Delete user ${req.params.id}` });
});

export default router;
