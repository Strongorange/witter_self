import React from "react";
import { useWeets } from "../context";

const Weet = () => {
  const weets = useWeets();

  return (
    <div>
      <ul>
        {weets.map((weet) => (
          <li key={weet.uid}>
            <span>{weet.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Weet;
