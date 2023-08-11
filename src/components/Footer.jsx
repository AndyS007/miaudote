import { styled } from "styled-components"
import logo from "../images/miaudote-menu.svg"                      
import { Link } from "react-router-dom"

export default function Footer(){
    return(
        <FooterContainer>
            <img src={logo} alt="Miaudote logo"></img>
            <p>Desenvolvido com ♡ por <Link to='https://www.linkedin.com/in/rafaela-nobre/'>Rafaela Nobre</Link>.</p>
        </FooterContainer>
    )
}

const FooterContainer = styled.div`
    background-color: #DADADA;
    margin: -1.5em;
    margin-top: 2em;
    padding: 1em 3em;

    display: flex;
    justify-content: space-between;
    align-items: center;

    img{
        max-width: 20vw;
    }

    @media screen and (max-width: 767px) {
        padding: 1em;
        img{
            max-width: 45vw;
            padding-left: 1em;
            margin: -0em 0.125em;
        }
    }
`
