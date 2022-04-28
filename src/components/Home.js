import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import postApi from "../api/postApi";
import { addPost } from "../features/postSlice";
import "../styles/scss/home.scss";
import Header from "./Header";
import Post from "./Post";

function Home() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);

  const [id, setId] = useState(posts.length);

  const [loadMore, setLoadMore] = useState(false);

  const fetchPost = async (load) => {
    if (load) {
      try {
        const response = await postApi.getPostId(id + 1);
        dispatch(addPost(response));
      } catch (error) {
        console.log("Failed to fetch post!");
      }
    }
  };

  useEffect(() => {
    setId(posts.length);
  }, [posts]);

  // fetch a new post
  useEffect(() => {
    fetchPost(loadMore);
    setLoadMore(false);
  }, [loadMore]);

  const handleScrolledBottom = () => {
    if (
      window.innerHeight + Math.ceil(window.pageYOffset) >=
      document.body.offsetHeight
    ) {
      setLoadMore(true);
    }
  };

  // listen scroll event
  useEffect(() => {
    window.addEventListener("scroll", handleScrolledBottom);

    return () => window.removeEventListener("scroll", handleScrolledBottom);
  });

  return (
    <div className="home">
      <Header />
      {posts.length > 0 &&
        posts.map((post) => (
          <Post key={post.id} userId={post.userId} id={post.id} />
        ))}

      {window.innerHeight + Math.ceil(window.pageYOffset) >=
        document.body.offsetHeight && (
        <div
          style={{
            height: "100px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default Home;
