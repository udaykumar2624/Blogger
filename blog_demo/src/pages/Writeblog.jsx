import React from 'react'

import { useState } from "react";

function Writeblog() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const blogData = {
      title,
      description,
      content,
    };

    try {
      const response = await fetch("http://localhost:5000/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        alert("Blog posted successfully ✅");
        setTitle("");
        setDescription("");
        setContent("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Write Blog</h1>

      <label className="form-label">Title of Blog</label>
      <textarea
        className="form-control"
        rows="1"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="form-label mt-3">Description of Blog</label>
      <textarea
        className="form-control"
        rows="2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label className="form-label mt-3">Content of Blog</label>
      <textarea
        className="form-control"
        rows="4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="d-grid gap-2 mt-3">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
}

export default Writeblog;
