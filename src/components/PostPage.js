import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import postApi from "../api/postApi";
import "../styles/scss/post.scss";
import Comment from "./Comment";

function PostPage() {
  const params = useParams();

  const posts = useSelector((state) => state.posts);

  const users = useSelector((state) => state.users);

  const id = params.id.slice(1);

  const post = posts.find((post) => post.id == id);

  const user = users.find((user) => user.id == post.userId);

  const [comments, setComments] = useState([]);

  const [showComments, setShowComments] = useState(false);

  const fetchComments = async () => {
    try {
      const response = await postApi.getPostComments(id);
      setComments(response);
    } catch (error) {
      console.log("Failed to fetch comments!");
    }
  };

  // get comments
  useEffect(() => {
    fetchComments();
  }, []);

  const handleShowCommentBtnClick = (e) => {
    e.preventDefault();
    setShowComments(!showComments);
  };

  const [random, setRandom] = useState(0);
  useEffect(() => {
    setRandom(Math.floor(Math.random() * 10) + 10);
  }, []);

  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: "100%",
        minHeight: "100vh",
        backgroundColor: "#ccc",
        padding: "0",
        margin: "0",
        position: "absolute",
      }}
    >
      <div className="postPage">
        <div className="post__heading">
          <p>{user && user.username}</p>
          <span>{random} days ago</span>
        </div>
        <div className="post__body">
          <p className="title">{post && post.title}</p>
          <span className="author">author: {user && user.name}</span>
          <p className="content">{post && post.body}</p>
        </div>
        <div className="post__footer">
          {comments.length > 1 ? (
            showComments === true ? (
              <span className="showBtn" onClick={handleShowCommentBtnClick}>
                Hide {comments.length} comments
              </span>
            ) : (
              <span className="showBtn" onClick={handleShowCommentBtnClick}>
                Show {comments.length} comments
              </span>
            )
          ) : showComments === true ? (
            <span className="showBtn" onClick={handleShowCommentBtnClick}>
              Hide {comments.length} comment
            </span>
          ) : (
            <span className="showBtn" onClick={handleShowCommentBtnClick}>
              Show {comments.length} comment
            </span>
          )}

          {comments.length > 0 &&
            showComments &&
            comments.map((comment) => (
              <Comment
                key={comment.id}
                name={comment.name}
                body={comment.body}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default memo(PostPage);
