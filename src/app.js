import "dotenv/config";
import express from "express";
import { PrismaClient } from '@prisma/client'; // <-- Энд import болгов
import booksRouter from "./routes/books.router.js";
import { logger } from "./middlewares/logger.js";
import { notFound, errorHandler } from "./middlewares/error.js";

const app = express();
const PORT = process.env.PORT ?? 3000;
const prisma = new PrismaClient(); // <-- Prisma-г шууд зарлав

app.use(express.json());
app.use(logger);

// Үндсэн нүүр хуудас
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Library API is running!",
    version: "1.0.0"
  });
});

app.use("/books", booksRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});