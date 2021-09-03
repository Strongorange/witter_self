import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { dbService, storageService } from "../fbase";
import { useUser, useSetWeets } from "../context";
import { useWeets } from "../context";
import Weet from "./Weet";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  margin-top: 10vh;
  flex-direction: column;
  align-items: center;
`;

const Home = () => {
  const [weet, setWeet] = useState("");
  const [attachment, setAttachment] = useState("");
  const user = useUser();
  const setWeets = useSetWeets();
  const weets = useWeets();
  const fileInput = useRef();

  useEffect(() => {
    dbService.collection("weets").onSnapshot((snapshot) => {
      const tempWeetObj = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWeets(tempWeetObj);
    });
  }, []);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setWeet(value);
  };
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${user.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    await dbService.collection("weets").doc().set({
      text: weet,
      createdAt: Date.now(),
      owner: user.uid,
      attachmentUrl,
    });
    setWeet("");
    setAttachment("");
  };
  const onClearAttachment = () => {
    setAttachment(null);
    fileInput.current.value = null;
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="트윗을 입력하세요"
          value={weet}
          onChange={onChange}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          onChange={onFileChange}
        />
        <input type="submit" value="트윗" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </Form>
      <div>
        {weets.map((weet) => (
          <Weet
            key={weet.id}
            weetObj={weet}
            isOwner={weet.owner === user.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
