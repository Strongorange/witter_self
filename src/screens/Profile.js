import React from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../fbase";

const Profile = () => {
  const history = useHistory();
  const onClick = () => {
    authService.signOut();
    history.push("/");
  };
  return <button onClick={onClick}>Log Out</button>;
};

export default Profile;
