import { styled } from "styled-components";
import validator from "validator";
import ReactInputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import Swal from "sweetalert2";


export default function RegisterPet(){
    const { register, handleSubmit, watch, setValue, formState: {errors} } = useForm();
    const navigate = useNavigate();
    const watchCEP = watch('cep');

    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const { user } = useContext(UserContext);
    const token = user;
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }

    useEffect(()=>{
        const lsUser = JSON.parse(localStorage.getItem('user'));
        if(!lsUser === null){
            Swal.fire({
                title: 'Você foi desconectado',
                text: 'Faça o login novamente.',
                icon: 'info',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/signin');
            });
        }
    }, [])

    function onSubmit(data){
        const {name, photo, category, description, characteristics, cep, city, state} = data;

        const onlyNumbersCEP = cep.replace(/\D/g, "");

        axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/pets`,
            {name, photo, category, description, characteristics, cep: onlyNumbersCEP, city, state},
            config)
        .then(resp=>{
            const { id } = resp.data;
            Swal.fire({
                title: 'Animal cadastrado com sucesso!',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate(`/pets/${id}`);
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
            if(error.response.status === 401){
                return Swal.fire({
                    title: 'Token inválido.',
                    text: 'Faça o login novamente.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                }).then(() => {
                    navigate('/signin');
                });
            }
            if(error.response.status === 500){
                Swal.fire({
                    title: 'Erro, tente novamente em alguns instantes.',
                    icon: 'error',
                    confirmButtonText: 'Voltar para a home',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/");
                    }
                });
            }
        })
    }

    return(
        <>
        <Header />
        <PageContainer>
            <div>
                <h2>Registre um Animal para Adoção</h2>
                <p>Compartilhe os detalhes do pet abaixo e deixe-o encontrar o amor em um novo lar.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Nome do animal</label>
                    <input
                        className={errors?.name && "input-error"}
                        type="text"
                        placeholder="Snoopy"
                        {...register("name", {required:true})}
                    />
                    {errors?.name?.type === 'required' && <p className="error-message">Nome do pet é obrigatório.</p>}

                    <label>Imagem</label>
                    <input
                        className={errors?.photo && "input-error"}
                        type="text"
                        placeholder="Cole aqui o link da imagem"
                        {...register("photo", {required:true, validate: (value) => validator.isURL(value) })}
                    />
                    {errors?.photo?.type === 'required' && <p className="error-message">Foto é obrigatório.</p>}
                    {errors?.photo?.type === 'validate' && <p className="error-message">Link inválido.</p>}

                    <label>Espécie</label>
                    <select
                        className={errors?.category && "input-error"}
                        {...register("category", {required:true, validate: (value) =>{return value !=="0";} })}
                    >
                        <option value="0">Selecione a espécie do animal</option>
                        <option value="1">Cachorro</option>
                        <option value="2">Gato</option>
                    </select>
                    {errors?.category?.type === 'required' && <p className="error-message">Espécie é obrigatório.</p>}
                    {errors?.category?.type === 'validate' && <p className="error-message">Selecione uma espécie.</p>}

                    <label>Descrição</label>
                    <textarea
                        className={errors?.description && "input-error"}
                        rows="3"
                        placeholder="Conte um pouco da história desse pet."
                        {...register("description", {required:true})}
                    />
                    {errors?.description?.type === 'required' && <p className="error-message">Descrição é obrigatório.</p>}
                    {errors?.description?.type === 'pattern' && <p className="error-message">Descrição em formato inválido.</p>}

                    <label>Características do pet</label>
                    <textarea
                        className={errors?.characteristics && "input-error"}
                        rows="3"
                        placeholder="Porte médio e pelo curto.
Muito amigável com crianças.
Vive bem em apartamento."
                        {...register("characteristics", {required:true})}
                    />
                    {errors?.characteristics?.type === 'required' && <p className="error-message">Descrição é obrigatório.</p>}
                    {errors?.characteristics?.type === 'pattern' && <p className="error-message">Descrição em formato inválido.</p>}

                    <label>CEP</label>
                    <ReactInputMask
                        mask="99999-999"
                        className={errors?.cep && "input-error"}
                        type="text"
                        placeholder="12345-678"
                        {...register("cep", {required: true, pattern: /^\d{5}-\d{3}$/, validate: async (value) =>{
                            const onlyNumbersCEP = value.replace(/\D/g, "");
                            await axios.get(`https://viacep.com.br/ws/${onlyNumbersCEP}/json/`)
                            .then(resp=>{
                                const cityName = resp.data.localidade;
                                const stateName = resp.data.uf;

                                if(!cityName || !stateName){
                                    return Swal.fire({
                                        title: 'CEP não encontrado.',
                                        icon: 'error',
                                        confirmButtonText: 'OK',
                                    });
                                }
                                
                                setCity(cityName);
                                setValue('city', cityName);

                                setState(stateName);
                                setValue('state', stateName);
                            })
                            .catch(error =>{
                                if(error.response.status === 500){
                                    return alert("Tente novamente em alguns instantes.");
                                }else{
                                    return alert("Tente novamente.");
                                }
                            })
                        }})}
                    />
                    {errors?.cep?.type === 'required' && <p className="error-message">CEP é obrigatório.</p>}
                    {errors?.cep?.type === 'pattern' && <p className="error-message">CEP em formato inválido.</p>}

                    <label>Cidade</label>
                    <input
                        className={errors?.city && "input-error"}
                        type="text"
                        placeholder="Belo Horizonte"
                        {...register("city", {required:true})}
                    />
                    {errors?.city?.type === 'required' && <p className="error-message">Cidade é obrigatório.</p>}

                    <label>Estado</label>
                    <select
                        className={errors?.state && "input-error"}
                        type="text"
                        placeholder="MG"
                        {...register("state", {required:true, validate: (value) =>{return value !=="0";}})}
                    >
                        <option value="0">Selecionar estado</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                    </select>
                    {errors?.state?.type === 'required' && <p className="error-message">Estado é obrigatório.</p>}
                    {errors?.state?.type === 'validate' && <p className="error-message">Selecione um estado.</p>}

                    <button type="submit">Cadastrar pet</button>
                </form>
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
    text-align: center;
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