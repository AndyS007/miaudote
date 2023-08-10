import { styled } from "styled-components";
import miaudote from "../images/miaudote-logo.svg";
import { useForm } from "react-hook-form";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import axios from "axios";

export default function SignInPage(){
    const { register, handleSubmit, formState: {errors} } = useForm();
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);

    function onSubmit(data){
        const { email, password } = data;
        
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/signin`, {email,password})
        .then(resp=>{
            const { token } = resp.data;
            setUser(token);
            localStorage.setItem('user', JSON.stringify(token));
            navigate(`/my-account`);
        })
        .catch(error =>{
            if(error.response.status === 422){
                return alert("Os dados informados são inválidos.");
            }
            if(error.response.status === 404){
                return alert("O e-mail informado não está cadastrado, cadastre-se primeiro.");
            }
            if(error.response.status === 401){
                return alert("Senha incorreta");
            }
            if(error.response.status === 500){
                return alert("Tente novamente em alguns instantes");
            }
        })
    };
    return(
        <PageContainer>
            <img src={miaudote} />
            <div>
                <h2>Bem-vindo de Volta ao Miaudote!</h2>
                <p>Faça login para continuar espalhando amor (e petiscos!)</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>E-mail</label>
                    <input
                        className={errors?.email && "input-error"}
                        type="text"
                        autoComplete="email"
                        placeholder="nome@miaudote.com"
                        {...register("email", {required:true, validate: (value) => validator.isEmail(value) })}
                    />
                    {errors?.email?.type === 'required' && <p className="error-message">E-mail é obrigatório.</p>}
                    {errors?.email?.type === 'validate' && <p className="error-message">E-mail inválido.</p>}
                    
                    <label>Senha</label>
                    <input
                        className={errors?.password && "input-error"}
                        type="password"
                        autoComplete="current-password"
                        placeholder="Digite sua senha"
                        {...register("password", {required:true, minLength: 8})}
                    />
                    {errors?.password?.type === 'required' && <p className="error-message">A senha é obrigatória.</p>}
                    {errors?.password?.type === 'minLength' && <p className="error-message">Sua senha deve ter no mínimo 8 caracteres.</p>}
                    
                    <button type="submit">Entrar</button>
                </form>
            </div>
            <p>Ainda não faz parte da família MiAudote?</p>
            <p><u>Crie uma nova conta aqui.</u></p>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 1em;
    text-align: center;
    img{
        width: 30vw;
        padding-bottom: 1.5em;
    }
    button{
        margin-bottom: 1.5em;
    }
    p{
        text-align: center;
    }
    div{
        max-width: 80vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2.5em;
    }
`