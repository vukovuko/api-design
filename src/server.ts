import express, { type Request, type Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { env, isDev, isTestEnv } from "../env.ts";
import authRoutes from "./routes/authRoutes.ts";
import habitRoutes from "./routes/habitRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";
import tagRoutes from "./routes/tagRoutes.ts";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan("dev", {
    skip: () => isTestEnv(),
  })
);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "API Working",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/tags", tagRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

// Global error handler
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      error: "Something went wrong!",
      ...(isDev() && { details: err.message }),
    });
  }
);

export { app };

export default app;
