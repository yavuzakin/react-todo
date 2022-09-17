import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Welcome.scss";

function Welcome() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();
    const usernameIsValid = username.trim().length > 0;

    if (!usernameIsValid) {
      return;
    }

    localStorage.setItem("username", username);
    navigate("/todos");
  }

  function inputChangeHandler(e) {
    setUsername(e.target.value);
  }

  return (
    <div className="welcome">
      <form className="welcome__form" onSubmit={submitHandler}>
        <h1 className="welcome__title">WELCOME</h1>
        <input
          className="welcome__input"
          placeholder="Enter your username"
          onChange={inputChangeHandler}
          value={username}
        />
        <button className="welcome__button">CONFIRM</button>
      </form>
    </div>
  );
}

export default Welcome;
