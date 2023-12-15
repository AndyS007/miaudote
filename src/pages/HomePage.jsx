import { styled } from "styled-components";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import fotoHome from "../images/home-photo.jpg";
import { useAuth } from "../contexts/AuthContext";
export default function HomePage() {
  const { currentUser, signInWithGoogle } = useAuth();
  return (
    <>
      <Header />
      <PageContainer>
        <TextDiv>
          <h1>Welcome to FurEver. Our adoption portal for all pets!</h1>

          <p>
            Explore our gallery and find the perfect pet to become part of your
            family.
          </p>
          <Link to='/pets'>
            <button>Adopt a pet</button>
          </Link>

          <p>
            Register a pet for adoption and help us unite adorable animals with
            loving families.
          </p>
          {currentUser ? (
            <Link to='/new-pet'>
              <button>Register a pet</button>
            </Link>
          ) : (
            <Link>
              <button onClick={signInWithGoogle}>Register a pet</button>
            </Link>
          )}
        </TextDiv>
        <PetPhoto src={fotoHome} />
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
  padding-left: 8em;
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
  img {
    width: 45vw;
  }
  button {
    margin-bottom: 1.5em;
  }
  div {
    display: flex;
    gap: 2.5em;
    margin-top: -1em;
  }
  @media screen and (max-width: 770px) {
    width: 100%;
    h1 {
      font-size: 2em;
    }
  }
`;
