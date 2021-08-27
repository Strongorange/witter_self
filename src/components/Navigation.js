import React from "react";
import { useUser } from "../context";
import Profile from "../screens/Profile";
const Navigation = () => {
  const user = useUser();

  return (
    <nav>
      <span>{`${user.displayName} 안뇽`}</span>
    </nav>
  );
};

export default Navigation;
