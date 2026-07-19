const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://postgres:password@localhost:5432/academy_db",
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {

  const fees = await prisma.fee.findMany({
    include: {
      student: true,
    },
  });

  console.log(JSON.stringify(fees, null, 2));

}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });