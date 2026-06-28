import { PrismaClient, OrderStatus } from "@prisma/client";

const prisma = new PrismaClient();

const statuses: OrderStatus[] = ["Pending", "Completed", "Cancelled"];

const customers = [
  {
    name: "Sarah Johnson",
    company: "ApexNova Systems",
    email: "sarah.johnson@apexnova.example",
    phone: "555-201-1001",
    region: "North America",
  },
  {
    name: "Michael Chen",
    company: "BrightPath Analytics",
    email: "michael.chen@brightpath.example",
    phone: "555-201-1002",
    region: "North America",
  },
  {
    name: "Emily Rodriguez",
    company: "QuantumBridge Labs",
    email: "emily.rodriguez@quantumbridge.example",
    phone: "555-201-1003",
    region: "Europe",
  },
  {
    name: "David Patel",
    company: "CloudNova Digital",
    email: "david.patel@cloudnova.example",
    phone: "555-201-1004",
    region: "Asia Pacific",
  },
  {
    name: "Olivia Wilson",
    company: "VisionMetric Group",
    email: "olivia.wilson@visionmetric.example",
    phone: "555-201-1005",
    region: "Europe",
  },
  {
    name: "Daniel Kim",
    company: "DataBridge Works",
    email: "daniel.kim@databridge.example",
    phone: "555-201-1006",
    region: "North America",
  },
  {
    name: "Sophia Martinez",
    company: "NexaCore Solutions",
    email: "sophia.martinez@nexacore.example",
    phone: "555-201-1007",
    region: "South America",
  },
  {
    name: "Ethan Brown",
    company: "IntelliSoft Partners",
    email: "ethan.brown@intellisoft.example",
    phone: "555-201-1008",
    region: "North America",
  },
  {
    name: "Ava Thompson",
    company: "BlueOrbit Technologies",
    email: "ava.thompson@blueorbit.example",
    phone: "555-201-1009",
    region: "Europe",
  },
  {
    name: "Noah Williams",
    company: "SummitScale AI",
    email: "noah.williams@summitscale.example",
    phone: "555-201-1010",
    region: "North America",
  },
  {
    name: "Mia Anderson",
    company: "GreenLake Software",
    email: "mia.anderson@greenlake.example",
    phone: "555-201-1011",
    region: "North America",
  },
  {
    name: "James Lee",
    company: "VertexCloud Studio",
    email: "james.lee@vertexcloud.example",
    phone: "555-201-1012",
    region: "Asia Pacific",
  },
  {
    name: "Isabella Garcia",
    company: "NovaPeak Consulting",
    email: "isabella.garcia@novapeak.example",
    phone: "555-201-1013",
    region: "South America",
  },
  {
    name: "Liam Harris",
    company: "SignalForge Labs",
    email: "liam.harris@signalforge.example",
    phone: "555-201-1014",
    region: "Europe",
  },
  {
    name: "Charlotte Clark",
    company: "OrbitStack Ventures",
    email: "charlotte.clark@orbitstack.example",
    phone: "555-201-1015",
    region: "North America",
  },
  {
    name: "Benjamin Lewis",
    company: "ClearMind Operations",
    email: "benjamin.lewis@clearmind.example",
    phone: "555-201-1016",
    region: "Europe",
  },
  {
    name: "Amelia Walker",
    company: "HyperGrid Systems",
    email: "amelia.walker@hypergrid.example",
    phone: "555-201-1017",
    region: "Asia Pacific",
  },
  {
    name: "Lucas Young",
    company: "CoreVista Digital",
    email: "lucas.young@corevista.example",
    phone: "555-201-1018",
    region: "North America",
  },
  {
    name: "Harper Allen",
    company: "ElevateIQ Solutions",
    email: "harper.allen@elevateiq.example",
    phone: "555-201-1019",
    region: "North America",
  },
  {
    name: "Henry King",
    company: "OmniLogic Labs",
    email: "henry.king@omnilogic.example",
    phone: "555-201-1020",
    region: "Europe",
  },
  {
    name: "Evelyn Wright",
    company: "SparkFlow Software",
    email: "evelyn.wright@sparkflow.example",
    phone: "555-201-1021",
    region: "North America",
  },
  {
    name: "Alexander Scott",
    company: "Northstar Automation",
    email: "alexander.scott@northstar.example",
    phone: "555-201-1022",
    region: "North America",
  },
  {
    name: "Abigail Green",
    company: "LuminaData Group",
    email: "abigail.green@luminadata.example",
    phone: "555-201-1023",
    region: "Europe",
  },
  {
    name: "Sebastian Baker",
    company: "RapidScale Cloud",
    email: "sebastian.baker@rapidscale.example",
    phone: "555-201-1024",
    region: "Asia Pacific",
  },
  {
    name: "Ella Nelson",
    company: "InsightHive Studio",
    email: "ella.nelson@insighthive.example",
    phone: "555-201-1025",
    region: "North America",
  },
  {
    name: "Matthew Carter",
    company: "PathwayAI Systems",
    email: "matthew.carter@pathwayai.example",
    phone: "555-201-1026",
    region: "Europe",
  },
  {
    name: "Grace Mitchell",
    company: "PrismWorks Digital",
    email: "grace.mitchell@prismworks.example",
    phone: "555-201-1027",
    region: "North America",
  },
  {
    name: "Jack Perez",
    company: "MomentumStack Labs",
    email: "jack.perez@momentumstack.example",
    phone: "555-201-1028",
    region: "South America",
  },
  {
    name: "Chloe Roberts",
    company: "ZenithOps AI",
    email: "chloe.roberts@zenithops.example",
    phone: "555-201-1029",
    region: "Asia Pacific",
  },
  {
    name: "William Turner",
    company: "AtlasMind Technologies",
    email: "william.turner@atlasmind.example",
    phone: "555-201-1030",
    region: "North America",
  },
];

const products = [
  {
    name: "AI Coding Assistant",
    category: "Developer Tools",
    price: 249,
    stockQuantity: 120,
  },
  {
    name: "AI Resume Builder",
    category: "Productivity",
    price: 79,
    stockQuantity: 200,
  },
  {
    name: "AI Meeting Assistant",
    category: "Productivity",
    price: 149,
    stockQuantity: 180,
  },
  {
    name: "AI Research Assistant",
    category: "Research",
    price: 199,
    stockQuantity: 140,
  },
  {
    name: "AI Document Analyzer",
    category: "Business",
    price: 129,
    stockQuantity: 160,
  },
  {
    name: "AI Chatbot Studio",
    category: "Customer Support",
    price: 299,
    stockQuantity: 110,
  },
  {
    name: "AI Marketing Writer",
    category: "Marketing",
    price: 179,
    stockQuantity: 150,
  },
  {
    name: "AI Image Generator Pro",
    category: "Creative",
    price: 249,
    stockQuantity: 130,
  },
  {
    name: "AI Video Generator",
    category: "Creative",
    price: 399,
    stockQuantity: 90,
  },
  {
    name: "AI Voice Studio",
    category: "Creative",
    price: 219,
    stockQuantity: 125,
  },
  {
    name: "AI Translation Suite",
    category: "Language",
    price: 149,
    stockQuantity: 170,
  },
  {
    name: "AI Sales Predictor",
    category: "Analytics",
    price: 349,
    stockQuantity: 100,
  },
  {
    name: "AI CRM Assistant",
    category: "Sales",
    price: 279,
    stockQuantity: 115,
  },
  { name: "AI HR Recruiter", category: "HR", price: 249, stockQuantity: 105 },
  {
    name: "AI Finance Assistant",
    category: "Finance",
    price: 299,
    stockQuantity: 95,
  },
  {
    name: "AI Contract Reviewer",
    category: "Legal",
    price: 329,
    stockQuantity: 85,
  },
  {
    name: "AI Workflow Builder",
    category: "Automation",
    price: 399,
    stockQuantity: 90,
  },
  {
    name: "AI Dashboard Builder",
    category: "Analytics",
    price: 229,
    stockQuantity: 135,
  },
  {
    name: "AI Email Assistant",
    category: "Productivity",
    price: 99,
    stockQuantity: 190,
  },
  {
    name: "AI Data Cleaner",
    category: "Data Engineering",
    price: 189,
    stockQuantity: 145,
  },
];

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomDatePast12Months(): Date {
  const now = new Date();
  const past = new Date();
  past.setMonth(now.getMonth() - 12);

  return new Date(
    past.getTime() + Math.random() * (now.getTime() - past.getTime()),
  );
}

async function main() {
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.customer.deleteMany();

  const createdCustomers = await Promise.all(
    customers.map((customer) =>
      prisma.customer.create({
        data: customer,
      }),
    ),
  );

  const createdProducts = await Promise.all(
    products.map((product) =>
      prisma.product.create({
        data: product,
      }),
    ),
  );

  await Promise.all(
    Array.from({ length: 150 }).map(() => {
      const customer = randomItem(createdCustomers);
      const product = randomItem(createdProducts);
      const quantity = Math.floor(Math.random() * 8) + 1;
      const unitPrice = Number(product.price);
      const totalAmount = quantity * unitPrice;

      return prisma.order.create({
        data: {
          customerId: customer.id,
          productId: product.id,
          quantity,
          unitPrice,
          totalAmount,
          status: randomItem(statuses),
          orderDate: randomDatePast12Months(),
        },
      });
    }),
  );

  console.log("Fictional AI SaaS seed data created successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
