import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Expert from "./models/Expert.js";

dotenv.config();
await connectDB();

await Expert.deleteMany();

await Expert.insertMany([
  {
    name: "John Smith",
    category: "Technology",
    experience: 8,
    rating: 4.7,
    availableSlots: [
      {
        date: "2026-02-22",
        slots: ["10:00 AM", "11:00 AM", "2:00 PM"],
      },
      {
        date: "2026-02-23",
        slots: ["9:00 AM", "1:00 PM"],
      },
    ],
  },
  {
    name: "Sarah Lee",
    category: "Business",
    experience: 10,
    rating: 4.9,
    availableSlots: [
      {
        date: "2026-02-22",
        slots: ["12:00 PM", "3:00 PM"],
      },
    ],
  },
]);

console.log("Data seeded");
process.exit();
