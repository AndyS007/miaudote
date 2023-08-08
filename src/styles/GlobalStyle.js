import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 400;
    }

        html, body, #root {
        min-height: 100vh;
    }

    body {
        font-family: 'Inter', sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1.5em;
        background-color: #f0f0f0;
    }
    h1{
        font-size: 2.5em;
        font-weight: 600;
    }
    p{
        font-size: 1.25em;
        text-align: left;
        b{
            font-weight: 600;
        }
    }
    img{
        max-width: 100vw;
    }
    button{
        background-color: #6A459C;
        color: #f0f0f0;
        min-width: 13em;
        font-size: 1.5em;
        font-weight: 500;
        padding: 0.5em;
        border: 0.125em solid #8560B7;
        border-radius: 0.25em;
        cursor: pointer;
    }
`

export default GlobalStyle;