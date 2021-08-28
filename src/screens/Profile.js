import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";
import { useUser, useSetUser } from "../context";

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
      .where("owner", "==", user.uid)
      .orderBy("createdAt")
      .get();
    setMyWeets(weets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyWeets();
  }, []);

  return (
    <>
      <div>
        <button onClick={onClick}>Log Out</button>
        <button onClick={() => history.push("/")}>Home</button>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="이름 변경"
            value={newName}
            onChange={onChange}
          />
          <input type="submit" value="이름 변경" />
        </form>
        <ul>
          {myWeets.map((myWeet) => (
            <li key={myWeet.createdAt}>{myWeet.text}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Profile;
