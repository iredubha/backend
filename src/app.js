import express from "express";

const app = express();
const PORT = 3000;


app.get("/", (req, res) => {
  res.json({
    message: "Library API",
    version: "1.0.0"
  });
});


app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime()
  });
});


app.get("/profile", (req, res) => {
  res.json({
    name: "Bat",
    role: "USER",
    email: "bat@example.com"
  });
});

app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  res.json({
    id: id,
    title: "Node.js Basics"
  });
});



app.get("/about", (req, res) => {
  res.status(200).json({
    projectName: "Library API",
    version: "1.0.0",
    author: "Бат-Ирээдүй"
  });
});


app.get("/students", (req, res) => {
  res.status(200).json([
    { id: 1, name: "Тэмүүлэн", major: "UX/UI" },
    { id: 2, name: "Билгүүн", major: "Software Engineering" },
    { id: 3, name: "Анужин", major: "Business Analytics" }
  ]);
});


app.get("/courses", (req, res) => {
  res.status(200).json([
    { courseId: 101, title: "Node.js & Express Backend", credits: 3 },
    { courseId: 102, title: "Advanced UX/UI Design Systems", credits: 4 }
  ]);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});