import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState(null);

  const toggleNewAccount = () => {
    setNewAccount((prev) => !prev);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        //create
        const data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        //login
        const data = await authService.signInWithEmailAndPassword(
          email,
          password
        );
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  const onChange = (e) => {
    const {
      target: { value, name },
    } = e;
    name === "email" ? setEmail(value) : setPassword(value);
  };
  const onSocialClick = async (e) => {
    let provider;
    if (e.target.name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Sign in" : "Log in"} />
        {error && <span>{error}</span>}
      </form>
      <button onClick={toggleNewAccount}>
        {newAccount ? "Go to Login" : "Sign in"}
      </button>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
