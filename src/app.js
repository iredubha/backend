// src/app.js
import express from "express";
import {
  books,
  findBookById,
  searchByTitle,
  getBooksFromDb,
  getBookOrThrow
} from "./books.js";

const app = express();
const PORT = 3000;


// Үндсэн нүүр хуудасны route-ийг нэмэх
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Library API is running!",
    version: "1.0.0"
  });
});

// JSON өгөгдөл хүлээж авах тохиргоо
app.use(express.json());

// 1. Бүх номыг авах эсвэл хайлт хийх (Async/Await ашигласан нь)
app.get("/books", async (req, res) => {
  try {
    const q = req.query.q;
    // Database-ийг хүлээх процессийн дуураймал
    const allBooks = await getBooksFromDb();

    if (q) {
      const filtered = searchByTitle(q);
      return res.status(200).json(filtered);
    }

    res.status(200).json(allBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. ID-гаар ном хайх (Async болон Error handling-тэй)
app.get("/books/:id", async (req, res) => {
  try {
    const bookId = Number(req.params.id);
    
    // books.js доторх throw шиддэг функцийг ашиглаж байна
    const book = getBookOrThrow(bookId);
    
    res.status(200).json(book);
  } catch (error) {
    // Хэрэв олдоогүй бол 404 буцаана
    res.status(404).json({
      message: error.message
    });
  }
});

// Серверийг асаах
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});