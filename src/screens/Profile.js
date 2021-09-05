import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";
import { useUser, useSetUser } from "../context";
import Weet from "./Weet";
import styled from "styled-components";

const Container = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 80px auto 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logOut {
    cursor: pointer;
    width: 100%;
    padding: 7px 20px;
    text-align: center;
    color: white;
    border-radius: 20px;
    background-color: tomato;
    cursor: pointer;
    width: 360px;
    margin-top: 40px;
  }
`;

const WeetContainer = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 80px auto 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileForm = styled.form`
  border-bottom: 1px solid rgba(255, 255, 255, 0.9);
  padding-bottom: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;

  input {
    text-align: center;
    border: 1px solid black;
    border-radius: 20px;
    background-color: white;
    color: black;
    padding: 5px;
  }
  .updateBtn {
    background-color: #04aaff;
    color: white;
    margin-top: 10px;
  }
`;

const Profile = () => {
  const history = useHistory();
  const user = useUser();
  const setUser = useSetUser();
  const [myWeets, setMyWeets] = useState([]);
  const [newName, setNewName] = useState(user.displayName);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (user.displayName !== newName) {
      user.updateProfile({
        displayName: newName,
      });
      setUser({ ...user, displayName: authService.currentUser.displayName });
    }
  };
  const onClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyWeets = async () => {
    const weets = await dbService
      .collection("weets")
      .where("creatorId", "==", user.uid)
      .orderBy("createdAt")
      .get();
    setMyWeets(weets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyWeets();
  }, []);

  return (
    <>
      <Container>
        <ProfileForm onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="이름 변경"
            value={newName}
            onChange={onChange}
            className="changeInput"
          />
          <input type="submit" value="이름 변경" className="updateBtn" />
        </ProfileForm>
        <span className="logOut">로그아웃</span>
        <WeetContainer>
          <h3 style={{ marginBottom: "20px" }}>나의 트윗</h3>
          {myWeets
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((myWeet) => (
              <Weet
                key={myWeet.id}
                weetObj={myWeet}
                isOwner={myWeet.creatorId === user.uid}
              />
            ))}
        </WeetContainer>
      </Container>
    </>
  );
};

export default Profile;
