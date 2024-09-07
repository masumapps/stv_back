"use client";
import React, { useState } from "react";
import axios from "axios";
import "../Styles/login.css";

export default function Login() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");

  const login = () => {
    console.log("trying to login");
    axios
      .post(
        "/login",
        { username: "admin", password: "admin" },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data === "success") {
          window.location.href = "/";
        } else {
          console.log(res.data);
        }
      });
  };

  return (
    <div className="bodyWrap">
      <div className="contentLoginWrap">
        <div className="loginSide">
          <div className="loginWrap">
            <h1>Log in</h1>
            <div className="input-group">
              <input
                type="text"
                className="input"
                onChange={(e) => setUsername(e.target.value)}
                required="required"
              />
              <label className={`${username.length > 0 ? "focusLabel" : ""}`}>
                Login
              </label>
            </div>
            <div className="input-group">
              <input
                type="text"
                className="input password"
                onChange={(e) => setPassword(e.target.value)}
                required="required"
              />
              <label className={`${password.length > 0 ? "focusLabel" : ""}`}>
                Password
              </label>
            </div>
            <button onClick={login}>Login</button>
          </div>
        </div>
        <div className="infoSide">
          <div className="loginWrap">
            <h2>Hello again!</h2>
            <p>Log in to your account to get access to app.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
