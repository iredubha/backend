export const books = [
  { id: 1, title: "Node.js Basics", price: 45000, isAvailable: true },
  { id: 2, title: "Express Framework", price: 52000, isAvailable: true },
  { id: 3, title: "Prisma ORM", price: 61000, isAvailable: false }
];

export function searchByTitle(keyword) {
  return books.filter((book) =>
    book.title.toLowerCase().includes(keyword.toLowerCase())
  );
}

export function findBookById(id) {
  return books.find((book) => book.id === id);
}

export function countAvailable() {
  return books.filter((b) => b.isAvailable).length;
}

export function getBooksFromDb() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books);
    }, 500);
  });
}

export function getBookOrThrow(id) {
  const book = findBookById(id);
  if (!book) {
    throw new Error("Book not found");
  }
  return book;
}

let nextId = books.length ? Math.max(...books.map((b) => b.id)) + 1 : 1;

export function addBook(input) {
  const book = {
    id: nextId++,
    isAvailable: true,
    ...input
  };
  books.push(book);
  return book;
}

export function updateBook(id, changes) {
  const book = findBookById(id);
  if (!book) return null;

  // id-г хамгаалах: changes дотор id байвал хасна
  const { id: _ignored, ...safeChanges } = changes;
  Object.assign(book, safeChanges);
  return book;
}

export function removeBook(id) {
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) return false;

  books.splice(index, 1);
  return true;
}