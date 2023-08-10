import { styled } from "styled-components"
import miaudote from "../images/miaudote-logo.svg"
export default function HomePage(){
    return(
        <PageContainer>
            <img src={miaudote} />
            <h1>Bem-vindo ao Miaudote. Nosso portal de adoção para todos pets!</h1>

            <p>Explore nossa galeria e <b>encontre o pet perfeito para se tornar parte da sua família</b>.</p>
            <button>Quero adotar um pet!</button>

            <p><b>Cadastre um pet para adoção</b> e jude-nos a unir animais adoráveis com famílias amorosas.</p>
            <button>Cadastrar um pet!</button>

            <p><b>Já faz parte da família MiAudote?</b></p>
            <div>
                <p><u>Entrar</u></p>
                <p><u>Cadastrar-se</u></p>
            </div>
        </PageContainer>
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
        width: 50vw;
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
