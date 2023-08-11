import { styled } from "styled-components"
import miaudote from "../images/miaudote-logo.svg"
import Header from "../components/Header"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
export default function HomePage(){
    return(
        <>
        <Header />
        <PageContainer>
            <img src={miaudote} alt="Miaudote logo" />
            <h1>Bem-vindo ao Miaudote. Nosso portal de adoção para todos pets!</h1>

            <p>Explore nossa galeria e <b>encontre o pet perfeito para se tornar parte da sua família</b>.</p>
            <Link to="/pets">
            <button>Quero adotar um pet!</button>
            </Link>

            <p><b>Cadastre um pet para adoção</b> e ajude-nos a unir animais adoráveis com famílias amorosas.</p>
            <Link to="/new-pet">
            <button>Cadastrar um pet!</button>
            </Link>

            <p><b>Já faz parte da família MiAudote?</b></p>
            <div>
                <Link to='/signin'>
                <p><u>Entrar</u></p>
                </Link>
                <Link to='/signup'>
                <p><u>Cadastrar-se</u></p>
                </Link>
            </div>
        </PageContainer>
        <Footer />
        </>
    )
}
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 1em;
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
`
