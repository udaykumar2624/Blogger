import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/BlogDetails.css";



function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/blogs/${id}`)
      .then(res => res.json())
      .then(data => setBlog(data));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    
  <div className="blog-details-container">
    <h1>{blog.title}</h1>
    <p>{blog.content}</p>
  </div>

  );
}

export default BlogDetails;