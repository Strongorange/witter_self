import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
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

export default UserProvider;
