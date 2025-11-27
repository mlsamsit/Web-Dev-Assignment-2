import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";
import Event from "./models/Event.js";

dotenv.config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Event.deleteMany({});

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10);
    const admin = new User({
      name: "Admin User",
      email: "admin@college.edu",
      passwordHash: adminPassword,
      role: "admin",
    });
    await admin.save();
    console.log("✅ Admin user created");

    // Create student users
    const studentPassword = await bcrypt.hash("student123", 10);
    const student1 = new User({
      name: "John Doe",
      email: "john@college.edu",
      passwordHash: studentPassword,
      role: "student",
    });
    await student1.save();

    const student2 = new User({
      name: "Jane Smith",
      email: "jane@college.edu",
      passwordHash: studentPassword,
      role: "student",
    });
    await student2.save();
    console.log("✅ Student users created");

    // Create seed events
    const events = [
      {
        title: "Web Development Workshop",
        description:
          "Learn React, Node.js, and modern web development practices. This comprehensive workshop covers frontend and backend technologies.",
        date: "2025-12-15",
        time: "10:00 AM",
        venue: "Tech Building - Room 101",
        adminId: admin._id,
      },
      {
        title: "AI & Machine Learning Seminar",
        description:
          "Deep dive into AI applications and future tech trends. Explore neural networks, deep learning, and real-world ML implementations.",
        date: "2025-12-20",
        time: "2:00 PM",
        venue: "Science Hall - Auditorium",
        adminId: admin._id,
      },
      {
        title: "Annual Code Challenge",
        description:
          "Compete in coding challenges and win prizes. Test your problem-solving skills and compete with fellow students.",
        date: "2025-12-25",
        time: "11:00 AM",
        venue: "Computer Lab - Building A",
        adminId: admin._id,
      },
      {
        title: "Career Fair 2025",
        description:
          "Meet top tech companies and explore internship opportunities. Network with industry leaders and learn about career paths.",
        date: "2026-01-10",
        time: "1:00 PM",
        venue: "Main Campus - Outdoor Grounds",
        adminId: admin._id,
      },
      {
        title: "Cloud Computing Bootcamp",
        description:
          "Master AWS, Azure, and GCP. Learn about cloud infrastructure, deployment, and scalability in modern applications.",
        date: "2026-01-15",
        time: "9:00 AM",
        venue: "Innovation Lab - Building C",
        adminId: admin._id,
      },
    ];

    await Event.insertMany(events);
    console.log("✅ Seed events created");

    console.log("\n📊 Database seeded successfully!");
    console.log("Test credentials:");
    console.log("  Admin: admin@college.edu / admin123");
    console.log("  Student: john@college.edu / student123");

    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Seed error:", error.message);
    process.exit(1);
  }
}

seedDatabase();
