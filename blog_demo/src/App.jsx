import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogList from "./pages/BlogList";
import BlogDetails from "./pages/BlogDetails";
import Navbar from "./pages/Navbar";
import Writeblog from "./pages/Writeblog";
import EditBlog  from "./pages/EditBlog";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="write" element={<Writeblog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;