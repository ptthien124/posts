import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import postApi from "../api/postApi";
import userApi from "../api/userApi";
import { addUser } from "../features/userSlice";
import "../styles/scss/post.scss";
import Comment from "./Comment";

function Post({ id, userId }) {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  const posts = useSelector((state) => state.posts);

  const post = posts.find((post) => post.id.toString() === id.toString());

  const [comments, setComments] = useState([]);

  const [user, setUser] = useState([]);

  const [showComments, setShowComments] = useState(false);

  const [showMore, setShowMore] = useState(true);

  // get user
  useEffect(() => {
    let userExists = false;
    users.forEach((user) => {
      if (user.id === userId) {
        userExists = true;
        setUser(user);
      }
    });
    if (!userExists) {
      const fetchUser = async () => {
        try {
          const response = await userApi.getUserId(userId);
          dispatch(addUser(response));
          setUser(response);
        } catch (error) {
          console.log("Failed to fetch user!");
        }
      };
      fetchUser();
    }
  }, []);

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

  const handleShowMoreBtnClick = (e) => {
    e.preventDefault();
    setShowMore(!showMore);
    e.target.parentElement
      .querySelector(".content")
      .classList.toggle("content__limit");
  };

  const [random, setRandom] = useState(0);
  useEffect(() => {
    setRandom(Math.floor(Math.random() * 10) + 10);
  }, []);

  return (
    <Link to={`/post/postPage/:${id}`} style={{ textDecoration: "none" }}>
      <div className="post">
        <div className="post__heading">
          <p>{user && user.username}</p>
          <span>{random} days ago</span>
        </div>

        <div className="post__body">
          <p className="title">{post && post.title}</p>
          <span className="author">author: {user && user.name}</span>
          <p className="content content__limit">{post && post.body}</p>
          {post.body.length > 137 &&
            (showMore ? (
              <span className="showMoreBtn" onClick={handleShowMoreBtnClick}>
                Show more
              </span>
            ) : (
              <span className="showMoreBtn" onClick={handleShowMoreBtnClick}>
                Show less
              </span>
            ))}
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
    </Link>
  );
}

export default memo(Post);
