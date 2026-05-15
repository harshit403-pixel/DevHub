const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/auth.route");
const userRoutes = require("./src/routes/user.routes");
const projectRoutes = require("./src/routes/project.routes");
const blogRoutes = require("./src/routes/blog.routes");
const searchRoutes = require("./src/routes/search.routes");
const uploadRoutes = require(
    "./src/routes/upload.routes"
);

const app = express();

// database connection
connectDB();

// middlewares
app.use(
  cors({
    origin:
      "https://devhub-lemon.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use(
    "/api/upload",
    uploadRoutes
);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/search", searchRoutes);

// test route
app.get("/", (req, res) => {
    res.send("DevHub API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});