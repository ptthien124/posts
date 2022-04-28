import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/scss/header.scss";

function Header() {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");

  const handleSubmitBtnClick = () => {
    const input = document.querySelector(".searchInput");
    if (input.value !== "") navigate(`/post/search/key=${inputValue}`);
  };

  const handleEnterKeyDown = (e) => {
    if (e.which === 13) {
      const input = document.querySelector(".searchInput");
      if (input === document.activeElement && input.value !== "") {
        navigate(`/post/search/key=${input.value}`);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keypress", handleEnterKeyDown);

    return () => document.removeEventListener("keypress", handleEnterKeyDown);
  }, []);

  return (
    <div className="header">
      <input
        className="searchInput"
        name="search"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSubmitBtnClick}>Search</button>
    </div>
  );
}

export default Header;
