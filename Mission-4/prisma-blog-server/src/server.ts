import app from "./app";
import { prisma } from "./lib/prisma";

const main = async () => {
  const port = process.env.PORT || 3000;

  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");

    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  } catch (error: any) {
    console.log(error?.message);
    await prisma.$disconnect();
    process.exit(1);
  }
};

main();
