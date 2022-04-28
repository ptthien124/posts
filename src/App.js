import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import postApi from "./api/postApi";
import "./App.css";
import Home from "./components/Home";
import PostPage from "./components/PostPage";
import Search from "./components/Search";
import { addPost } from "./features/postSlice";

function App() {
  const dispatch = useDispatch();

  document.title = "Blogs";

  const fetchSomePosts = async () => {
    const quantity = Math.ceil(window.innerHeight / 400);
    for (let i = 0; i < quantity; i++) {
      try {
        const response = await postApi.getPostId(i + 1);
        dispatch(addPost(response));
      } catch (error) {
        console.log("Failed to fetch post!");
      }
    }
  };

  // fetch some first posts
  useEffect(() => {
    fetchSomePosts();
  }, []);



  return (
    <div className="app">
      <Routes>
        <Route path="/post" element={<Home />} />
        <Route path="/post/postPage/:id" element={<PostPage />} />
        <Route path="/post/search/:key" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
