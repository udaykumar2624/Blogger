const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = "./blogs.json";

// helper functions
const readBlogs = () => {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
};

const writeBlogs = (blogs) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(blogs, null, 2));
};

// ================= ROUTES =================

// GET all blogs
app.get("/blogs", (req, res) => {
  res.json(readBlogs());
});

// GET blog by id
app.get("/blogs/:id", (req, res) => {
  const blogs = readBlogs();
  const blog = blogs.find(b => b.id == req.params.id);
  blog ? res.json(blog) : res.status(404).json({ message: "Not found" });
});

// POST blog
app.post("/blogs", (req, res) => {
  const blogs = readBlogs();
  const newBlog = {
    id: Date.now(),
    ...req.body
  };
  blogs.push(newBlog);
  writeBlogs(blogs);
  res.status(201).json(newBlog);
});

// PUT blog
app.put("/blogs/:id", (req, res) => {
  const blogs = readBlogs();
  const index = blogs.findIndex(b => b.id == req.params.id);

  if (index !== -1) {
    blogs[index] = { ...blogs[index], ...req.body };
    writeBlogs(blogs);
    res.json(blogs[index]);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

// DELETE blog
app.delete("/blogs/:id", (req, res) => {
  const blogs = readBlogs();
  const id = req.params.id;

  const filteredBlogs = blogs.filter(b => b.id != id);

  if (blogs.length === filteredBlogs.length) {
    return res.status(404).json({ message: "Blog not found" });
  }

  writeBlogs(filteredBlogs);
  res.json({ message: "Blog deleted successfully" });
});

// ================= START SERVER =================

app.listen(5000, () => {
  console.log(" Server running on http://localhost:5000");
});
