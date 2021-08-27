import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [weets, setWeets] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <UserContext.Provider
      value={{ user, setUser, isLoggedIn, setIsLoggedIn, weets, setWeets }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { user } = useContext(UserContext);
  return user;
};

export const useSetUser = () => {
  const { setUser } = useContext(UserContext);
  return setUser;
};

export const useIsLoggedIn = () => {
  const { isLoggedIn } = useContext(UserContext);
  return isLoggedIn;
};

export const useSetIsLoggedIn = () => {
  const { setIsLoggedIn } = useContext(UserContext);
  return setIsLoggedIn;
};

export const useWeets = () => {
  const { weets } = useContext(UserContext);
  return weets;
};

export const useSetWeets = () => {
  const { setWeets } = useContext(UserContext);
  return setWeets;
};

export default UserProvider;
