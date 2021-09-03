import React, { useEffect, useState } from "react";
import Router from "./Router";
import { authService } from "../fbase";
import { useSetIsLoggedIn, useSetUser } from "../context";
import GlobalStyle from "./GlobalStyle";

const App = () => {
  const setIsLoggedIn = useSetIsLoggedIn();
  const [init, setInit] = useState(false);
  const setUser = useSetUser();

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        if (user.displayName === null) {
          console.log("null user", user);
          const index = user.email.indexOf("@");
          const tempName = user.email.substring(0, index);
          user.updateProfile({
            displayName: tempName,
          });
        }
        setUser({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      {init ? <Router /> : "Initializing"}
    </>
  );
};

export default App;
