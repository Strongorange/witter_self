import React from "react";
import { useUser } from "../context";
const Navigation = () => {
  const user = useUser();

  return (
    <div>
      <span>{`${user.displayName} 안뇽`}</span>
    </div>
  );
};

export default Navigation;
