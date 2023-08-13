import { styled } from "styled-components";
import miaudote from "../images/miaudote-logo.svg";
import { useForm } from "react-hook-form";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactInputMask from "react-input-mask";
import Swal from "sweetalert2";


export default function SignUpPage(){
    const { register, handleSubmit, watch, formState: {errors} } = useForm();
    const navigate = useNavigate();
    const watchPassword = watch('password')

    function onSubmit(data){
        const { name, email, cpf, cellphone, password, confirmPassword } = data;

        const onlyNumbersCPF = cpf.replace(/\D/g, "");
        const onlyNumbersCellphone = cellphone.replace(/\D/g, "");

        axios.post(`${import.meta.env.VITE_API_BASE_URL}/signup`, {name,email,cpf: onlyNumbersCPF,cellphone: onlyNumbersCellphone,password,confirmPassword})
        .then(resp=>{
            Swal.fire({
                title: 'Seu cadastro foi feito com sucesso.',
                text: 'Faça login agora.',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate(`/signin`);
            });
        })
        .catch(error =>{
            console.log(error)
            if(error.response.status === 422){
                return Swal.fire({
                    title: 'Os dados informados são inválidos.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
            if(error.response.data.message === 'Esse email já está cadastrado.'){
                return Swal.fire({
                    title: 'O e-mail informado já está cadastrado.',
                    text: 'Faça login.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
            if(error.response.data.message === 'Esse cpf já está cadastrado.'){
                return Swal.fire({
                    title: 'O CPF informado já está cadastrado.',
                    text: 'Faça login.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
            if(error.response.status === 500){
                return Swal.fire({
                    title: 'Tente novamente em alguns instantes.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        })
    };
    return(
        <PageContainer>
            <img src={miaudote} />
            <div>
                <h2>Junte-se à Família Miaudote!</h2>
                <p>Juntos, fazemos patinhas felizes encontrarem lares cheios de amor.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Nome</label>
                    <input
                        className={errors?.name && "input-error"}
                        type="text"
                        placeholder="Ana Maria Santos"
                        {...register("name", {required:true})}
                    />
                    {errors?.name?.type === 'required' && <p className="error-message">Nome é obrigatório.</p>}

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

                    <label>CPF</label>
                    <ReactInputMask
                        mask="999.999.999-99"
                        className={errors?.cpf && "input-error"}
                        type="text"
                        placeholder="999.999.999-99"
                        {...register("cpf", {required:true, pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/ })}
                    />
                    {errors?.cpf?.type === 'required' && <p className="error-message">CPF é obrigatório.</p>}
                    {errors?.cpf?.type === 'pattern' && <p className="error-message">CPF em formato inválido.</p>}

                    <label>Celular</label>
                    <ReactInputMask
                        mask="(99)99999-9999"
                        className={errors?.cellphone && "input-error"}
                        type="text"
                        placeholder="(99)99999-9999"
                        {...register("cellphone", {required:true, pattern: /(\([0-9]{2}\))\d{5}-\d{4}/ })}
                    />
                    {errors?.cellphone?.type === 'required' && <p className="error-message">Celular é obrigatório.</p>}
                    {errors?.cellphone?.type === 'pattern' && <p className="error-message">Celular em formato inválido.</p>}

                    <label>Senha</label>
                    <input
                        className={errors?.password && "input-error"}
                        type="password"
                        placeholder="Digite sua senha"
                        {...register("password", {required:true, minLength: 8})}
                    />
                    {errors?.password?.type === 'required' && <p className="error-message">A senha é obrigatória.</p>}
                    {errors?.password?.type === 'minLength' && <p className="error-message">Sua senha deve ter no mínimo 8 caracteres.</p>}

                    <label>Confirmação de senha</label>
                    <input
                        className={errors?.confirmPassword && "input-error"}
                        type="password"
                        placeholder="Repita sua senha"
                        {...register("confirmPassword", {required:true, validate: (value) => value === watchPassword})}
                    />
                    {errors?.confirmPassword?.type === 'required' && <p className="error-message">A confirmação de senha é obrigatória.</p>}
                    {errors?.confirmPassword?.type === 'validate' && <p className="error-message">As senhas não são iguais.</p>}

                    <button type="submit">Entrar</button>
                </form>
            </div>
            <p>Já faz parte da família MiAudote?</p>
            <Link to='/signin'>
            <p><u>Entre na sua conta aqui.</u></p>
            </Link>
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