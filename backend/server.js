const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();      //creating an instamce of express application 
app.use(cors());
app.use(express.json());

const DATA_FILE = "./blogs.json"; //path to the json file where blog are strored 

// helper functions
const readBlogs = () => {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));//convering json  to js object 
};

const writeBlogs = (blogs) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(blogs, null, 2));//converting js object to json and writing it to the file 
};

// ================= ROUTES =================

// GET all blogs
app.get("/blogs", (req, res) => {
  res.json(readBlogs());//sending the list of blogs as a json response
});

// GET blog by id
app.get("/blogs/:id", (req, res) => {
  const blogs = readBlogs();
  const blog = blogs.find(b => b.id == req.params.id);
  blog ? res.json(blog) : res.status(404).json({ message: "Not found" });//if blog is found send it as json response otherwise srevers with 404 status and the message "not found"
});

// POST blog
app.post("/blogs", (req, res) => {
  const blogs = readBlogs();
  const newBlog = {
    id: Date.now(),
    ...req.body
  };     
  blogs.push(newBlog);//adding the new blog to the list of blogs
  writeBlogs(blogs);// saving the updated list of blogs to the file 
  res.status(201).json(newBlog);
});

// PUT blog
//Find blog index by ID If exists: Merge old + new data Save file  Else → 404 error
app.put("/blogs/:id", (req, res) => {
  const blogs = readBlogs();
  const index = blogs.findIndex(b => b.id == req.params.id);

  if (index !== -1) {
    blogs[index] = { ...blogs[index], ...req.body };//
    writeBlogs(blogs);
    res.json(blogs[index]);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

// DELETE blog
//Find blog by id if exists: remove it from the list save file else : 404 error 
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
});//starting the server on prot 5000 and logging a message to the console when the server is up and running 