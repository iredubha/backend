import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();

  const bat = await prisma.author.create({ data: { name: "Бат" } });
  const saraa = await prisma.author.create({ data: { name: "Сараа" } });
  const bold = await prisma.author.create({ data: { name: "Болд" } });

  await prisma.book.createMany({
    data: [
      { title: "Node.js Basics", price: 45000, authorId: bat.id },
      { title: "Prisma Guide", price: 61000, authorId: bat.id },
      { title: "SQL for Kids", price: 30000, authorId: saraa.id },
      { title: "Node.js Testing", price: 58000, authorId: bat.id },
      { title: "REST API Design", price: 39000, authorId: saraa.id, isAvailable: false },
      { title: "SQL Joins", price: 27000, authorId: saraa.id },
      { title: "Express Security", price: 66000, authorId: bold.id },
      { title: "Prisma Relations", price: 48000, authorId: bold.id },
      { title: "Node Streams", price: 72000, authorId: bold.id, isAvailable: false }
    ]
  });

  console.log("Seed дууслаа: 3 зохиолч, 9 ном");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());