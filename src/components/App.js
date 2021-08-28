import React, { useEffect, useState } from "react";
import Router from "./Router";
import { authService } from "../fbase";
import { useSetIsLoggedIn, useSetUser } from "../context";

const App = () => {
  const setIsLoggedIn = useSetIsLoggedIn();
  const [initializing, setInitializing] = useState(true);
  const setUser = useSetUser();

  useEffect(() => {
    try {
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
      });
    } catch (error) {
      console.log(error);
    } finally {
      setInitializing(false);
    }
  }, []);

  return <>{initializing ? "Initializing" : <Router />}</>;
};

export default App;
