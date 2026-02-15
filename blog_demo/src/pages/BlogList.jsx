import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/BlogList.css";
function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/blogs")
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  //delete blog
  const handleDelete = (id) => {
  fetch(`http://localhost:5000/blogs/${id}`, {
    method: "DELETE"
  })
  .then(() => {
    setBlogs(prev => prev.filter(blog => blog.id !== id));
  });
};


  return (
    <div>
      <h1>Blog List</h1>
      {blogs.map(blog => (
        <div className="blog-list-box" key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.description}</p>
          <Link to={`/blog/${blog.id}`}>Read More</Link>
          <Link to={`/edit/${blog.id}`}><button>Edit</button></Link>
          <button onClick={() => handleDelete(blog.id)}> Delete</button>

        </div>
      ))}
    </div>
  );
}

export default BlogList;