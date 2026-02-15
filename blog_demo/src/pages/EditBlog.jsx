import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/EditBlog.css";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  // Fetch existing blog
  useEffect(() => {
    fetch(`http://localhost:5000/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setTitle(data.title);
          setDescription(data.description);
          setContent(data.content);
        }
      });
  }, [id]);

  // Update blog
  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description,
        content
      })
    })
      .then(() => navigate("/blog"));
  };

  return (
    <div className="edit-blog-container">
      <h2>Edit Blog</h2>

      <form className="edit-blog-form" onSubmit={handleUpdate}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />

        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
}

export default EditBlog;
