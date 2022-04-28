import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import '../styles/scss/search.scss';
import Post from "./Post";

function Search() {
  const params = useParams();

  const postList = useSelector((state) => state.posts);

  const [posts, setPosts] = useState([]);

  const key = params.key.slice(4);

  useEffect(() => {
    postList.map((post) => {
      if (post.title.search(key) != -1) {
        setPosts((prev) => [...prev, post]);
      }
    });
  }, []);

  return (
    <div className="search">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post.id} userId={post.userId} id={post.id} />
        ))
      ) : (
        <span className="empty">Can not found the post with that title!</span>
      )}
    </div>
  );
}

export default Search;
