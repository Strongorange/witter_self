import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { dbService, storageService } from "../fbase";
import { useUser, useSetWeets } from "../context";
import { useWeets } from "../context";
import Weet from "./Weet";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 80px auto 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 20px;
  width: 100%;
  .weetInput {
    flex-grow: 1;
    height: 40px;
    padding: 0px 20px;
    color: white;
    border: 1px solid #04aaff;
    border-radius: 20px;
    font-weight: 500;
    font-size: 12px;
  }
  .input__arrow {
    position: absolute;
    right: 0;
    background-color: #04aaff;
    height: 40px;
    width: 40px;
    padding: 10px 0px;
    text-align: center;
    border-radius: 20px;
    color: white;
    cursor: pointer;
  }
`;

const AttachContainer = styled.div`
  img {
    height: 80px;
    width: 80px;
    border-radius: 40px;
  }
  .attachClear {
    color: #04aaff;
    cursor: pointer;
    text-align: center;
    span {
      margin-right: 10px;
      font-size: 12px;
    }
  }
`;

const WeetContainer = styled.div`
  margin-top: 30px;
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
    if (weet === "") {
      return;
    }
    console.log("active");
    e.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${user.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    // await dbService.collection("weets").doc().set({
    //   text: weet,
    //   createdAt: Date.now(),
    //   owner: user.uid,
    //   attachmentUrl,
    // });
    await dbService.collection("weets").add({
      text: weet,
      createdAt: Date.now(),
      creatorId: user.uid,
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
      <Container>
        <Form onSubmit={onSubmit}>
          <InputContainer className="input__container">
            <input
              type="text"
              placeholder="트윗을 입력하세요"
              value={weet}
              onChange={onChange}
              className="weetInput"
            />
            <input type="submit" value="→" className="input__arrow" />
          </InputContainer>
          <label htmlFor="attach-file" className="input__label">
            <span style={{ color: "#04aaff", cursor: "pointer" }}>
              이미지 추가
            </span>
            <FontAwesomeIcon
              icon={faPlus}
              size="xs"
              style={{ color: "#04aaff" }}
            />
          </label>
          <input
            id="attach-file"
            type="file"
            accept="image/*"
            ref={fileInput}
            onChange={onFileChange}
            style={{ opacity: 0 }}
          />
          {attachment && (
            <AttachContainer>
              <img src={attachment} style={{ backgroundImage: attachment }} />
              <div className="attachClear" onClick={onClearAttachment}>
                <span>삭제</span>
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </AttachContainer>
          )}
        </Form>

        <WeetContainer className="weetsContainer">
          {weets
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((weet) => (
              <Weet
                key={weet.id}
                weetObj={weet}
                isOwner={weet.creatorId === user.uid}
              />
            ))}
        </WeetContainer>
      </Container>
    </>
  );
};

export default Home;
