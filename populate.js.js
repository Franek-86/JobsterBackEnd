require("dotenv").config();
const connectDB = require("./db/connect");
const Job = require("./models/Job");
const mockData = require("./mock_data.json");
console.log("salve");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Job.deleteMany({});
    await Job.create(mockData);
    process.exit(0);
  } catch (error) {
    console.log("errore", error);
    process.exit(1);
  }
};

start();
