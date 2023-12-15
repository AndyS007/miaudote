import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import iconEye from "../images/icon-eye.svg";
import iconToggleOff from "../images/icon-toggle-off.svg";
import iconToggleOn from "../images/icon-toggle-on.svg";
import iconTrash from "../images/icon-trash.svg";
import { firestore } from "../lib/firebase";

import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";

export default function MyAccount() {
  const getRegisteredPets = async (ownerId) => {
    const petsCollection = collection(firestore, "pets"); // replace 'pets' with your actual collection name
    const q = query(petsCollection, where("owner", "==", ownerId));
    const querySnapshot = await getDocs(q);
    const pets = [];
    querySnapshot.forEach((doc) => {
      pets.push({ ...doc.data(), id: doc.id });
      console.log(doc.id, " => ", doc.data());
    });

    return pets;
  };
  const getAppliedPets = async (uid) => {
    const petsCollection = collection(firestore, "pets"); // replace 'pets' with your actual collection name
    const q = query(petsCollection, where("applicants", "array-contains", uid));
    const querySnapshot = await getDocs(q);
    const pets = [];
    querySnapshot.forEach((doc) => {
      pets.push({ ...doc.data(), id: doc.id });
      console.log(doc.id, " => ", doc.data());
    });

    return pets;
  };
  const { currentUser } = useAuth();
  const [registeredPets, setRegisteredPets] = useState([]);
  const [appliedPets, setAppliedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toggleAdopted = async (petId) => {
    console.log(petId);
    const docRef = doc(firestore, "pets", petId);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    const newAdopted = !docSnap.data().adopted;
    await updateDoc(docRef, {
      adopted: newAdopted,
    });
    console.log(petId, "pet adopted status changed");
    const state = newAdopted ? "adopted" : "unadopted";
    Swal.fire({
      title: "Pet set as " + state + "!",
      icon: "success",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(0);
      }
    });
  };
  useEffect(() => {
    //   const pets = await getPets(currentUser.uid);
    const init = async () => {
      const rPets = await getRegisteredPets(currentUser.uid);
      setRegisteredPets(rPets);
      const aPets = await getAppliedPets(currentUser.uid);
      setAppliedPets(aPets);
      setLoading(false);
    };
    init();
  }, [currentUser.uid]);

  return (
    <>
      <Header />
      <PageContainer>
        {loading ? (
          <TailSpin color='#6A459C' height={80} width={80} />
        ) : (
          <>
            <p>
              Welcome to your space on FurEver! Here, you can manage the pets
              you registered for adoption and the pets you applied to adopt.
            </p>
            <InfoDiv>
              <NamePhotoDiv>
                <h2>{currentUser.displayName}</h2>
                <Photo src={currentUser.photoURL} alt='photo' />
              </NamePhotoDiv>
              <UserContact>
                <h3>Your contact details:</h3>
                <p>These information are public.</p>
                <p>
                  <b>E-mail:</b> {currentUser.email}
                </p>
              </UserContact>
            </InfoDiv>
            <InfoContainer>
              <Pets>
                <h3>Registered Pets:</h3>
                {registeredPets.length === 0 ? (
                  <>
                    <p>You have not registered any pets yet.</p>
                    <Link to='/new-pet'>
                      <button>Register a pet now!</button>
                    </Link>
                  </>
                ) : (
                  <PetsList>
                    {registeredPets.map((pet) => (
                      <PetItem key={pet.id}>
                        <img src={pet.imageUrl} alt={`${pet.name}`} />
                        <PetInfo>
                          <h3>{pet.name}</h3>
                          <p>{pet.description}</p>
                          <div>
                            <img
                              src={iconEye}
                              alt='Ver pet cadastrado'
                              onClick={() => navigate(`/pets/${pet.id}`)}
                            />
                            <img
                              src={pet.adopted ? iconToggleOn : iconToggleOff}
                              onClick={() => {
                                // toogle pet.adopted
                                toggleAdopted(pet.id);
                              }}
                            />
                          </div>
                        </PetInfo>
                      </PetItem>
                    ))}
                  </PetsList>
                )}
              </Pets>
            </InfoContainer>
            <InfoContainer>
              <Pets>
                <h3>Applied Pets:</h3>
                {appliedPets.length === 0 ? (
                  <>
                    <p>You have not registered any pets yet.</p>
                    <Link to='/pets'>
                      <button>Adopt a pet now!</button>
                    </Link>
                  </>
                ) : (
                  <PetsList>
                    {appliedPets.map((pet) => (
                      <PetItem key={pet.id}>
                        <img src={pet.imageUrl} alt={`${pet.name}`} />
                        <PetInfo>
                          <h3>{pet.name}</h3>
                          <p>{pet.description}</p>
                          <div>
                            <img
                              src={iconEye}
                              onClick={() => navigate(`/pets/${pet.id}`)}
                            />
                          </div>
                        </PetInfo>
                      </PetItem>
                    ))}
                  </PetsList>
                )}
              </Pets>
            </InfoContainer>
          </>
        )}
      </PageContainer>
      <Footer />
    </>
  );
}
const InfoDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  justify-content: space-between;
`;
const NamePhotoDiv = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
`;
const Photo = styled.img`
    width: 5em;
    height: 5em;
    object-fit: cover;
    border-radius: 5em;
}
`;
const InfoContainer = styled.div`
  width: 80vw;
  display: flex;
  gap: 1em;
  justify-content: space-between;

  @media screen and (max-width: 900px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
  }
`;
const Pets = styled.div`
  padding-top: 1.5em;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
const UserContact = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: start;
  justify-content: space-between;
  gap: 0.5em;
  height: 100%;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: start;
  align-items: center;
  padding-top: 1em;
  text-align: center;
  margin: auto;
  gap: 2em;
  min-height: 100vh;
  button {
    margin-bottom: 1.5em;
  }
  p {
    text-align: center;
  }
`;
const PetsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const PetItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 1em;
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 0.5em;
  padding: 1em;
  position: relative;

  img {
    width: 8em;
    height: 8em;
    object-fit: cover;
    border-radius: 0.5em;
  }
`;

const PetInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 1.5em;

  h3 {
    margin: 0;
    font-size: 1.5rem;
  }

  p {
    padding-top: 0.5em;
    text-align: left;
    font-size: 1rem;
    color: #777;
  }

  div {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    position: absolute;
    bottom: 1em;
    right: 1em;

    img {
      cursor: pointer;
      font-size: 0.25em;
      color: #777;
    }
  }
`;
