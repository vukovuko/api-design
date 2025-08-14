import { Router, type Request, type Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Get all tags" });
});

router.get("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: `Get tag ${req.params.id}` });
});

router.post("/", (req: Request, res: Response) => {
  res.status(201).json({ message: "Create new tag" });
});

router.put("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: `Update tag ${req.params.id}` });
});

router.delete("/:id", (req: Request, res: Response) => {
  res.status(204).json({ message: `Delete tag ${req.params.id}` });
});

export default router;
