import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbase";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  gap: 20px;
  .twitterIcon {
    color: #64a5f2;
    font-size: 50px;
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;

  gap: 10px;

  input {
    max-width: 320px;
    width: 100%;
    border: none;
    border-radius: 20px;
    padding: 7px;
    font-size: 15px;
  }

  .authAction {
    background-color: #4ca7f8;
    color: white;
    text-align: center;
    width: 100%;
  }
`;

const Text = styled.span`
  text-decoration: underline;
  color: #4ca7f8;
  cursor: pointer;
  margin-bottom: 30px;
`;

const SocialContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 320px;
`;

const SocialButton = styled.button`
  font-size: 18px;
  border: none;
  border-radius: 20px;
  background-color: white;

  .socialIcon {
    margin-left: 7px;
  }
`;

const Input = styled.input``;

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
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <Container className="authContainer">
      <FontAwesomeIcon icon={faTwitter} className="twitterIcon" />
      <Form onSubmit={onSubmit}>
        <Input
          name="email"
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
        />
        <Input
          name="password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
        />
        <Input
          className="authAction"
          type="submit"
          value={newAccount ? "회원가입" : "로그인"}
        />
        {error && <span>{error}</span>}
      </Form>
      <Text onClick={toggleNewAccount}>
        {newAccount ? "로그인하러 가기" : "계정 만들기"}
      </Text>
      <SocialContainer>
        <SocialButton
          className="socialBtn"
          name="google"
          onClick={onSocialClick}
        >
          Continue with
          <FontAwesomeIcon icon={faGoogle} className="socialIcon" />
        </SocialButton>
        <SocialButton
          className="socialBtn"
          name="github"
          onClick={onSocialClick}
        >
          Continue with
          <FontAwesomeIcon icon={faGithub} className="socialIcon" />
        </SocialButton>
      </SocialContainer>
    </Container>
  );
};

export default Login;
