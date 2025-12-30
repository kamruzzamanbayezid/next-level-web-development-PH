import app from "./app";
import { prisma } from "./lib/prisma";

const port = process.env.PORT || 3000;

const main = async () => {
  try {
    await prisma.$connect();

    app.listen(port, () => {
      console.log(`Prisma blog app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

main();
