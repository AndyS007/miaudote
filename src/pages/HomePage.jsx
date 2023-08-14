import { styled } from "styled-components"
import miaudote from "../images/miaudote-logo.svg"
import Header from "../components/Header"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import fotoHome from "../images/home-photo.jpg"
export default function HomePage(){
    return(
        <>
        <Header />
        <PageContainer>
            <TextDiv>
                <h1>Bem-vindo ao Miaudote. Nosso portal de adoção para todos pets!</h1>

                <p>Explore nossa galeria e <b>encontre o pet perfeito para se tornar parte da sua família</b>.</p>
                <Link to="/pets">
                <button>Quero adotar um pet!</button>
                </Link>

                <p><b>Cadastre um pet para adoção</b> e ajude-nos a unir animais adoráveis com famílias amorosas.</p>
                <Link to="/new-pet">
                <button>Cadastrar um pet!</button>
                </Link>
            </TextDiv>
            <PetPhoto src={fotoHome} alt="Miaudote e encontre seu novo melhor amigo."/>

        </PageContainer>
        <Footer />
        </>
    )
}
const PetPhoto = styled.img`
    width: 50%;
    height: 100vh;
    object-fit: contain;
    
    @media screen and (max-width: 770px){
        display: none;
    }
`
const TextDiv = styled.div`
    padding-left: 8em;
    width: 60%;
    flex-direction: column;
    @media screen and (min-width: 771px) and (max-width: 1200px){
        padding-left: 4em;
    }
    @media screen and (max-width: 770px){
        display: none;
        padding-left: 0em;
        width: 90%;
        margin: auto;
    }
`
const PageContainer = styled.div`
    display: flex;
    margin: auto;
    width: 100vw;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    padding-top: 2em;
    gap: 1.5em;
    text-align: center;
    img{
        width: 45vw;
    }
    button{
        margin-bottom: 1.5em;
    }
    div{
        display: flex;
        gap: 2.5em;
        margin-top: -1em;
    }
    @media screen and (max-width: 770px){
        width: 100%;
        h1{
            font-size: 2em;
        }
    }
`
