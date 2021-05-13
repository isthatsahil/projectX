import React from "react";
import "./login.css";
import { LOGIN_URL } from "./spotifyUtil";

const Login = () => {
  console.log("url", LOGIN_URL);
  return (
    <div className="login">
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="Spotify LOGO"
      />

      {/* login button */}
      <a href={LOGIN_URL}>LOGIN WITH SPOTIFY</a>
    </div>
  );
};

export default Login;
