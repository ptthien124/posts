import React, { useEffect, useState } from "react";
import "../styles/scss/comment.scss";

function Comment({ name, body }) {
  const [random, setRandom] = useState(0);
  useEffect(() => {
    setRandom(Math.floor(Math.random() * 10) + 2);
  }, []);
  return (
    <div className="comment">
      <span>{name}</span>
      <span className="date"> {random} days ago</span>
      <p>{body}</p>
    </div>
  );
}

export default Comment;
