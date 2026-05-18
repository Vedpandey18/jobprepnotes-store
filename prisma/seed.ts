import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  if (!process.env.DATABASE_URL) {
    console.log("Skip seed: DATABASE_URL not set.");
    return;
  }

  const count = await prisma.product.count();
  if (count > 0) {
    console.log("Products already exist, skip demo seed.");
    return;
  }

  await prisma.product.createMany({
    data: [
      {
        slug: "java-interview-notes",
        title: "Java Interview Notes",
        description:
          "Core Java, collections, concurrency, and JVM — interview-focused condensed PDF.",
        category: "Interview",
        price: 299,
        discountPrice: 149,
        imageUrl: "https://placehold.co/600x400/7c3aed/ffffff?text=Java",
        pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        badge: "Best Seller",
      },
      {
        slug: "system-design-interview-kit",
        title: "System Design Interview Kit",
        description:
          "Scalability, CAP, caching, and real system design interview patterns.",
        category: "Interview",
        price: 399,
        discountPrice: 249,
        imageUrl: "https://placehold.co/600x400/5b21b6/ffffff?text=System+Design",
        pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        badge: "Limited Offer",
      },
    ],
  });

  console.log("Seeded sample products.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
