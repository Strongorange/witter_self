import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { dbService } from "../fbase";
import { useUser, useSetWeets } from "../context";
import { useWeets } from "../context";
import Weet from "./Weet";

const Home = () => {
  const [weet, setWeet] = useState("");
  const user = useUser();
  const setWeets = useSetWeets();
  const weets = useWeets();

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
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("weets").doc().set({
      text: weet,
      createdAt: Date.now(),
      owner: user.uid,
    });
    setWeet("");
  };

  return (
    <>
      <Link to="/profile">
        <span>Profile</span>
      </Link>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="트윗을 입력하세요"
            value={weet}
            onChange={onChange}
          />
          <input type="submit" value="트윗" />
        </form>
      </div>
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
