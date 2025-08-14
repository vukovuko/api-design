import express, { type Request, type Response } from "express";

const app = express();

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "API Working",
  });
});

export default app;
