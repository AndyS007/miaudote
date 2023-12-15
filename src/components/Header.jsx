import { styled } from "styled-components";
import logo from "../images/FurEver.svg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <HeaderContainer>
      <Link to='/'>
        <img src={logo} alt=' logo' />
      </Link>

      <Link to='/pets'>
        <AdoptButton>Adoption</AdoptButton>
      </Link>

      <div>
        <Link to='/signin'>
          <DimmedButton>Sign In</DimmedButton>
        </Link>

        <Link to='/signup'>
          <BotaoCadastro>Register</BotaoCadastro>
        </Link>
      </div>
    </HeaderContainer>
  );
}
const DimmedButton = styled.button`
  font-size: 1.25em;
  min-width: max-content;
  background-color: #dadada;
  color: #6a459c;
  border: none;
`;
const AdoptButton = styled.button`
  font-size: 1.25em;
  min-width: max-content;
  background-color: #dadada;
  color: #6a459c;
  border: none;
`;
const BotaoCadastro = styled.button`
  font-size: 1.25em;
  min-width: max-content;
  background-color: #6a459c;
  color: #fff;
  border: none;
`;
const HeaderContainer = styled.div`
  width: 100vw;
  background-color: #dadada;
  margin-top: -1.5em;
  margin-bottom: 0.5em;
  padding: 1em 3em;
  box-shadow: 0em 0.25em 0.75em 0.25em rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    max-width: 20vw;
  }
  div {
    display: flex;
    gap: 1em;
  }

  @media screen and (max-width: 767px) {
    padding: 1em;
    img {
      max-width: 45vw;
      padding-left: 1em;
      margin: -0em 0.125em;
    }
    div {
      display: flex;
      gap: 0em;
    }
    ${BotaoCadastro} {
      display: none;
    }
    ${AdoptButton} {
      display: none;
    }
    ${DimmedButton} {
      font-size: 1em;
    }
  }
`;
