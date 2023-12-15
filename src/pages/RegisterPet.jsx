import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { styled } from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { firestore, storage } from "../lib/firebase";
import Swal from "sweetalert2";
export default function RegisterPet() {
  const { currentUser } = useAuth();
  function UploadForm() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [age, setAge] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const storageRef = ref(storage, `images/${String(new Date().getTime())})}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    const handleImageChange = (e) => {
      if (e.target.files[0]) setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const collectionRef = collection(firestore, "pets");

            await addDoc(collectionRef, {
              name,
              species,
              age,
              owner: currentUser.uid,
              description,
              imageUrl: downloadURL,
              adopted: false,
              applicants: [],
            });
            console.log("File available at", downloadURL);
            Swal.fire({
              title: "Pet registered!",
              icon: "success",
              confirmButtonText: "Back to homepage",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/");
              }
            });
          });
        }
      );
    };

    return (
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Species:
          <input
            type='text'
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Age:
          <input
            type='number'
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>

        <label>
          Image:
          <input type='file' onChange={handleImageChange} />
        </label>

        <button type='submit'>Register</button>
      </form>
    );
  }

  return (
    <>
      <Header />
      <PageContainer>
        <div>
          <h2>Register an pet for Adoption</h2>
          <p>
            Share the pet's details below and let it find love in a new home.
          </p>
          <UploadForm />
        </div>
      </PageContainer>
      <Footer />
    </>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1em;
  text-align: center;
  button {
    margin-bottom: 1.5em;
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
