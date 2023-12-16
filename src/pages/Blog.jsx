import { styled } from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import fotoHome from "../images/home-photo.jpg";
export default function Blog() {
  return (
    <>
      <Header />
      <PageContainer>
        <TextDiv>
          <h3>TOP 5 Mental Health Benifits of Having a Pet</h3>
          <p>
            The Human Animal Bond Research Institute and Mental Health America
            did a study and found that pets can improve human mental health in
            several ways.
          </p>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.mhanational.org/sites/default/files/Top%205%20Mental%20Health%20Benefits%20of%20Pets%20-%20May%202020.pdf'
          >
            <button>Explore More</button>
          </a>

          <h3>8 Tips to Prepare Your Home for a New Pet</h3>
          <p>
            Having a pet is not an easy task and you need to prepare a cozy nest
            for them before they come to your home. Here are some guidelines to
            follow if you are inexperienced.
          </p>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.petcoach.co/article/8-tips-to-prepare-your-home-for-a-new-pet/'
          >
            <button>Explore More</button>
          </a>

          <h3>Your Complete First Week Puppy Training Plan</h3>
          <p>
            Dogs are human's friend. But a disobedient dog can also give you a
            headache. As a new dog owner, it's time to learn some basics of dog
            training!
          </p>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.youtube.com/watch?v=ckWzAqJEhKg'
          >
            <button>Explore More</button>
          </a>
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
