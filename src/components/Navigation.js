import React from "react";
import { useUser } from "../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  margin-top: 50px;
  display: flex;
  width: 100%;
  justify-content: center;
  ul {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 200px;
    li {
      a {
        color: #64a5f2;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }
    }
    span {
      font-size: 15px;
      color: white;
    }
  }
`;

const Navigation = () => {
  const user = useUser();

  return (
    <Nav>
      <ul>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
        </li>
        <li>
          <Link to="profile">
            <FontAwesomeIcon icon={faUserAlt} />
            <span>{`${user.displayName}의 프로필`}</span>
          </Link>
        </li>
      </ul>
    </Nav>
  );
};

export default Navigation;
