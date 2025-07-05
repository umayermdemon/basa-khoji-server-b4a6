import express from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import router from "./app/routes";
const app = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// app route
app.use("/api", router);

app.get("/", async (req, res) => {
  res.send("BasaKhoji's server running");
});

// not found
app.use(notFound);

// global error handler
app.use(globalErrorHandler);

export default app;
