import { Router } from "express";

const router = Router();

// Routes are relative to where router is mounted
router.get("/", (req, res) => {
  res.status(200).json({ message: "Get all users" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({ message: `Get user ${req.params.id}` });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "User created" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: `Update user ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res.status(204).json({ message: `Delete user ${req.params.id}` });
});

export default router;
