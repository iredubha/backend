import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// 1. Бүх номыг авах
export async function list(req, res, next) {
  try {
    const books = await prisma.book.findMany();
    res.json({
      count: books.length,
      data: books
    });
  } catch (error) {
    next(error);
  }
}

// 2. Гарчигаар хайх
export async function search(req, res, next) {
  try {
    const { q = "" } = req.query;
    const results = await prisma.book.findMany({
      where: {
        title: {
          contains: q,
          mode: 'insensitive' // Том жижиг үсэг харгалзахгүй хайх
        }
      }
    });

    res.json({
      count: results.length,
      data: results
    });
  } catch (error) {
    next(error);
  }
}

// 3. ID-гаар нэг ном авах
export async function getOne(req, res, next) {
  try {
    const id = Number(req.params.id);
    const book = await prisma.book.findUnique({
      where: { id }
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    next(error);
  }
}

// 4. Шинэ ном нэмэх
export async function create(req, res, next) {
  try {
    const { title, price, isAvailable } = req.body;

    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }

    const book = await prisma.book.create({
      data: {
        title,
        price: price ? Number(price) : 0,
        isAvailable: isAvailable ?? true
      }
    });

    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
}

// 5. Ном засах
export async function update(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { id: _ignored, ...safeChanges } = req.body;

    // Өөрчлөх гэж буй ном байгаа эсэхийг шалгах
    const existing = await prisma.book.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Book not found" });
    }

    const updated = await prisma.book.update({
      where: { id },
      data: safeChanges
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
}

// 6. Ном устгах
export async function remove(req, res, next) {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.book.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Book not found" });
    }

    await prisma.book.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}