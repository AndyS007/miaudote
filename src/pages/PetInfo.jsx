import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useRef } from "react";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import Swal from "sweetalert2";
import ApplicantsList from "../components/ApplicantsList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import { firestore } from "../lib/firebase";

export default function PetInfo() {
  const { currentUser, signInWithGoogle } = useAuth();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const petQuery = useQuery({
    queryKey: ["pet", id],
    queryFn: () => fetchPet(id),
  });

  const fetchPet = async (id) => {
    // Fetch pet based on id
    const docRef = doc(firestore, "pets", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const petData = docSnap.data();

      return { ...petData, id: docSnap.id };
    } else {
      throw new Error("No such pet found!");
    }
  };
  const pet = petQuery.data;
  const isOwner = pet?.owner === currentUser?.uid;
  const hasApplied = !!pet?.applicants?.find(
    (applicant) => applicant === currentUser?.uid
  );
  const mutation = useMutation({
    mutationFn: async () => {
      await updateDoc(doc(firestore, "pets", id), {
        applicants: arrayUnion(currentUser.uid),
        applicantsEmails: arrayUnion(currentUser.email),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pet", id]);
    },
  });

  const onClickAdopt = async () => {
    try {
      if (currentUser) {
        mutation.mutate();
      } else {
        Swal.fire({
          title: "You need to be logged in to adopt a pet",
          icon: "error",
          confirmButtonText: "Login now",
        }).then((result) => {
          if (result.isConfirmed) {
            signInWithGoogle();
          }
        });
      }
    } catch (error) {
      alert("Error applying for pet, please try again later");
    }
  };

  return (
    <>
      <Header />
      <PageContainer>
        {petQuery.isLoading ? (
          <TailSpin color='#6A459C' height={80} width={80} />
        ) : (
          <>
            <InfoPrincipal>
              <DivInfo>
                <div>
                  <h3>{pet?.name}</h3>

                  <p>{isOwner && " (Registerd By You)"}</p>
                </div>
                <div>
                  <p>{pet?.description}</p>
                </div>
                {isOwner ? (
                  <ApplicantsList applicants={pet?.applicantsEmails} />
                ) : (
                  <InfosSecundarias>
                    <p>
                      {pet?.applicants?.length ?? 0} people waiting to adopt it
                    </p>
                    <button disabled={hasApplied} onClick={onClickAdopt}>
                      {hasApplied
                        ? "You have already applied"
                        : "I want to adopt"}
                    </button>
                  </InfosSecundarias>
                )}
              </DivInfo>
              <img src={pet?.imageUrl} />
            </InfoPrincipal>
          </>
        )}
      </PageContainer>
      <Footer />
    </>
  );
}
const DivInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: start;
  gap: 1em;
  padding-left: 2em;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
  }
`;
const InfoPrincipal = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: stretch;
  gap: 0.5em;

  button {
    padding: 0.5em;
    height: max-content;
    max-width: 30%;
    font-size: 1.125em;
    &:disabled {
      background-color: #b1b1b1;
      border-color: #d4d4d4;
      cursor: not-allowed;
    }
  }
  img {
    aspect-ratio: 1;
    width: 40%;
    object-fit: cover;
    border-radius: 2em;
  }
`;
const InfosSecundarias = styled.div`
  padding-top: 1.5em;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
  justify-content: center;
  h3,
  p {
    width: 100%;
    text-align: center;
  }

  button {
    padding: 0.5em;
    height: max-content;
    max-width: 30%;
    font-size: 1.5em;
    &:disabled {
      background-color: #b1b1b1;
      border-color: #d4d4d4;
      cursor: not-allowed;
    }
  }
`;

const PageContainer = styled.div`
  min-height: 80vh;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-top: 1em;
  text-align: center;

  @media screen and (max-width: 540px) {
    width: 90vw;
    ${DivInfo} {
      flex-direction: row;
      padding-left: 0em;
    }
    ${InfoPrincipal} {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5em;

      button {
        padding: 0.75em;
        height: max-content;
        min-width: 40%;
        font-size: 1.125em;
      }
      img {
        aspect-ratio: 1;
        width: 100%;
        object-fit: cover;
        border-radius: 2em;
      }
    }
  }
`;
