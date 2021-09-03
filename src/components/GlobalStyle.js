/* eslint-disable */
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap');
    ${reset}
    body {
        font-family: 'Do Hyeon', sans-serif;
        font-size:35px;
        background-color: black;
        color: white
    }
    button {
        font-family: 'Do Hyeon', sans-serif;
        font-size:20px;
    }
    input {
        font-family: 'Do Hyeon', sans-serif;
        font-size:20px;
    }

    span {
        font-family: 'Do Hyeon', sans-serif;
        font-size:20px;
    }
`;

export default GlobalStyle;
