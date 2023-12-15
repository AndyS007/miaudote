import { styled } from "styled-components";
import miaudote from "../images/miaudote-logo.svg";
import { useForm } from "react-hook-form";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import axios from "axios";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Header from "../components/Header";
import fotoSignIn from "../images/signin-photo.jpg";
import GoogleSignIn from "../components/GoogleSignIn";
import { useAuth } from "../contexts/AuthContext";

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { signInWithGoogle } = useAuth();

  function onSubmit(data) {
    const { email, password } = data;

    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/signin`, { email, password })
      .then((resp) => {
        const { token } = resp.data;
        setUser(token);
        localStorage.setItem("user", JSON.stringify(token));
        navigate(`/my-account`);
      })
      .catch((error) => {
        if (error.response.status === 422) {
          return Swal.fire({
            title: "Os dados informados são inválidos.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
        if (error.response.status === 404) {
          return Swal.fire({
            title:
              "O e-mail informado não está cadastrado, cadastre-se primeiro.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
        if (error.response.status === 401) {
          return Swal.fire({
            title: "Senha incorreta.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
        if (error.response.status === 500) {
          return Swal.fire({
            title: "Tente novamente em alguns instantes.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
  }
  return (
    <>
      <Header />
      <PageContainer>
        <TextDiv>
          <div>
            <h2>Bem-vindo de Volta ao Miaudote!</h2>
            <p>Faça login para continuar espalhando amor (e petiscos!)</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>E-mail</label>
              <input
                className={errors?.email && "input-error"}
                type='text'
                autoComplete='email'
                placeholder='nome@miaudote.com'
                {...register("email", {
                  required: true,
                  validate: (value) => validator.isEmail(value),
                })}
              />
              {errors?.email?.type === "required" && (
                <p className='error-message'>E-mail é obrigatório.</p>
              )}
              {errors?.email?.type === "validate" && (
                <p className='error-message'>E-mail inválido.</p>
              )}

              <label>Senha</label>
              <input
                className={errors?.password && "input-error"}
                type='password'
                autoComplete='current-password'
                placeholder='Digite sua senha'
                {...register("password", { required: true })}
              />
              {errors?.password?.type === "required" && (
                <p className='error-message'>A senha é obrigatória.</p>
              )}

              <button type='submit'>Entrar</button>
            </form>
            <GoogleSignIn onClick={signInWithGoogle} />
          </div>
          <p>Ainda não faz parte da família MiAudote?</p>
          <Link to='/signup'>
            <p>
              <u>Crie uma nova conta aqui.</u>
            </p>
          </Link>
        </TextDiv>
        <PetPhoto
          src={fotoSignIn}
          alt='Entre na sua conta e continue espalhando o amor.'
        />
      </PageContainer>
      <Footer />
    </>
  );
}
const PetPhoto = styled.img`
  width: 50%;
  height: 100vh;
  object-fit: contain;

  @media screen and (max-width: 770px) {
    display: none;
  }
`;
const TextDiv = styled.div`
  padding-left: 6em;
  width: 60%;
  flex-direction: column;
  @media screen and (min-width: 771px) and (max-width: 1200px) {
    padding-left: 4em;
  }
  @media screen and (max-width: 770px) {
    display: none;
    padding-left: 0em;
    width: 90%;
    margin: auto;
  }
`;

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

  button {
    margin-bottom: 1.5em;
  }
  button:hover {
    opacity: 0.8;
  }
  p {
    text-align: center;
  }
  div {
    max-width: 80vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5em;
  }
`;
