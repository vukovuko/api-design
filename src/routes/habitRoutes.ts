import { Router, type Request, type Response } from "express";
import { validateBody } from "../middleware/validation.ts";
import { z } from "zod";

const createHabitSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string()).min(1),
});

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Get all habits" });
});

router.get("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: `Get habit ${req.params.id}` });
});

router.post(
  "/",
  validateBody(createHabitSchema),
  (req: Request, res: Response) => {
    res.status(201).json({ message: "Create new habit" });
  }
);

router.put("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: `Update habit ${req.params.id}` });
});

router.post("/:id/complete", (req: Request, res: Response) => {
  res.status(201).json({ message: `Habit ${req.params.id} completed` });
});

router.delete("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: `Delete habit ${req.params.id}` });
});

export default router;
