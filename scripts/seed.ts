import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");
    await db.delete(schema.products);
    await db.delete(schema.variants);
    await db.delete(schema.collections);

    await db.insert(schema.collections).values([
      {
        id: 1,
        name: "NEW ARRIVALS",
      },
      {
        id: 2,
        name: "t-shirts",
      },
      {
        id: 3,
        name: "LONGSLEEVE TEES",
      },
      {
        id: 4,
        name: "CREWNECKS",
      },
    ]);

    await db.insert(schema.products).values([
      {
        id: 1,
        categoryId: 2,
        name: "WITHOUT SHAME TEE",
        description:
          "Oversized lilac T-shirt made in Portugal. 100% cotton (200 GSM). Details printed in off lilac. Carefully designed cut to make a boxy fit.",
        price: 35,
        frontImageSrc: "/wstee-front.jpg",
        backImageSrc: "/wstee-back.jpg",
      },
      {
        id: 2,
        categoryId: 2,
        name: "LOST GENERATION TEE",
        description:
          "Oversized lilac T-shirt made in Portugal. 100% cotton (200 GSM). Details printed in off lilac. Carefully designed cut to make a boxy fit.",
        price: 35,
        frontImageSrc: "/lg-front.jpg",
        backImageSrc: "/lg-back.jpg",
      },
      {
        id: 3,
        categoryId: 2,
        name: "CIAO AMORE TEE",
        description:
          "Oversized lilac T-shirt made in Portugal. 100% cotton (200 GSM). Details printed in off lilac. Carefully designed cut to make a boxy fit.",
        price: 35,
        frontImageSrc: "/ciao-front.jpg",
        backImageSrc: "/ciao-back.jpg",
      },
      {
        id: 4,
        categoryId: 3,
        name: "TOO LATE LONGSLEEVE TEE",
        description:
          "Oversized lilac T-shirt made in Portugal. 100% cotton (200 GSM). Details printed in off lilac. Carefully designed cut to make a boxy fit.",
        price: 39,
        frontImageSrc: "/too-late-front.jpg",
        backImageSrc: "/too-late-back.jpg",
      },
      {
        id: 5,
        categoryId: 3,
        name: "WORLD TOUR LONGSLEEVE TEE",
        description:
          "Oversized lilac T-shirt made in Portugal. 100% cotton (200 GSM). Details printed in off lilac. Carefully designed cut to make a boxy fit.",
        price: 39,
        frontImageSrc: "/world-tour-front.jpg",
        backImageSrc: "/world-tour-back.jpg",
      },
      {
        id: 6,
        categoryId: 1,
        name: "STARBOY CREWNECK",
        description:
          "Oversized lilac T-shirt made in Portugal. 100% cotton (200 GSM). Details printed in off lilac. Carefully designed cut to make a boxy fit.",
        price: 59,
        frontImageSrc: "/starboy-front.jpg",
        backImageSrc: "/starboy-back.jpg",
      },
      {
        id: 7,
        categoryId: 1,
        name: "WITHOUT SHAME SAPPHIRE CREWNECK",
        description:
          "Oversized lilac T-shirt made in Portugal. 100% cotton (200 GSM). Details printed in off lilac. Carefully designed cut to make a boxy fit.",
        price: 59,
        frontImageSrc: "/ws-front.jpg",
        backImageSrc: "/ws-back.jpg",
      },
      {
        id: 8,
        categoryId: 1,
        name: "ESSENTIAL SAPPHIRE CREWNECK",
        description:
          "Oversized lilac T-shirt made in Portugal. 100% cotton (200 GSM). Details printed in off lilac. Carefully designed cut to make a boxy fit.",
        price: 59,
        frontImageSrc: "/essential-front.jpg",
        backImageSrc: "/essential-back.jpg",
      },
      {
        id: 9,
        categoryId: 4,
        name: "ESSENTIAL WALNUT CREWNECK",
        description:
          "Oversized lilac T-shirt made in Portugal. 100% cotton (200 GSM). Details printed in off lilac. Carefully designed cut to make a boxy fit.",
        price: 59,
        frontImageSrc: "/walnut-front.jpg",
        backImageSrc: "/walnut-back.jpg",
      },
      {
        id: 10,
        categoryId: 1,
        name: "TWO-SIDES ZIPPED HOODIE",
        description:
          "Oversized lilac T-shirt made in Portugal. 100% cotton (200 GSM). Details printed in off lilac. Carefully designed cut to make a boxy fit.",
        price: 84,
        frontImageSrc: "/zip-front.jpg",
        backImageSrc: "/zip-back.jpg",
      },
    ]);

    await db.insert(schema.variants).values([
      {
        productId: 1,
        name: "SMALL",
        stock: 5,
      },
      {
        productId: 1,
        name: "MEDIUM",
        stock: 5,
      },
      {
        productId: 1,
        name: "LARGE",
        stock: 5,
      },
      {
        productId: 1,
        name: "X-LARGE",
        stock: 5,
      },
      {
        productId: 2,
        name: "SMALL",
        stock: 5,
      },
      {
        productId: 2,
        name: "MEDIUM",
        stock: 5,
      },
      {
        productId: 2,
        name: "LARGE",
        stock: 5,
      },
      {
        productId: 2,
        name: "X-LARGE",
        stock: 5,
      },
      {
        productId: 3,
        name: "SMALL",
        stock: 5,
      },
      {
        productId: 3,
        name: "MEDIUM",
        stock: 5,
      },
      {
        productId: 3,
        name: "LARGE",
        stock: 5,
      },
      {
        productId: 3,
        name: "X-LARGE",
        stock: 5,
      },
      {
        productId: 4,
        name: "SMALL",
        stock: 5,
      },
      {
        productId: 4,
        name: "MEDIUM",
        stock: 5,
      },
      {
        productId: 4,
        name: "LARGE",
        stock: 5,
      },
      {
        productId: 4,
        name: "X-LARGE",
        stock: 5,
      },
      {
        productId: 5,
        name: "SMALL",
        stock: 5,
      },
      {
        productId: 5,
        name: "MEDIUM",
        stock: 5,
      },
      {
        productId: 5,
        name: "LARGE",
        stock: 5,
      },
      {
        productId: 5,
        name: "X-LARGE",
        stock: 5,
      },
      {
        productId: 6,
        name: "SMALL",
        stock: 5,
      },
      {
        productId: 6,
        name: "MEDIUM",
        stock: 5,
      },
      {
        productId: 6,
        name: "LARGE",
        stock: 5,
      },
      {
        productId: 6,
        name: "X-LARGE",
        stock: 5,
      },
      {
        productId: 7,
        name: "SMALL",
        stock: 5,
      },
      {
        productId: 7,
        name: "MEDIUM",
        stock: 5,
      },
      {
        productId: 7,
        name: "LARGE",
        stock: 5,
      },
      {
        productId: 7,
        name: "X-LARGE",
        stock: 5,
      },
      {
        productId: 8,
        name: "SMALL",
        stock: 5,
      },
      {
        productId: 8,
        name: "MEDIUM",
        stock: 5,
      },
      {
        productId: 8,
        name: "LARGE",
        stock: 5,
      },
      {
        productId: 8,
        name: "X-LARGE",
        stock: 5,
      },
      {
        productId: 9,
        name: "SMALL",
        stock: 5,
      },
      {
        productId: 9,
        name: "MEDIUM",
        stock: 5,
      },
      {
        productId: 9,
        name: "LARGE",
        stock: 5,
      },
      {
        productId: 9,
        name: "X-LARGE",
        stock: 5,
      },
      {
        productId: 10,
        name: "SMALL",
        stock: 5,
      },
      {
        productId: 10,
        name: "MEDIUM",
        stock: 5,
      },
      {
        productId: 10,
        name: "LARGE",
        stock: 5,
      },
      {
        productId: 10,
        name: "X-LARGE",
        stock: 5,
      },
    ]);
    console.log("Seeding finished!!!!!");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
