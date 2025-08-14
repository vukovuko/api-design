import app from "./server.ts";

app.listen(3000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  console.log(`Environment: ${process.env.APP_STAGE}`);
});
