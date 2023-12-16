import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import UserProvider from "./contexts/userContext";
import Blog from "./pages/Blog";
import RegisterPet from "./pages/RegisterPet";
import PetGallery from "./pages/PetGallery";
import PetInfo from "./pages/PetInfo";
import MyAccount from "./pages/MyAccount";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <AuthProvider>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/blog' element={<Blog />} />
              <Route path='/pets' element={<PetGallery />} />
              <Route path='/pets/:id' element={<PetInfo />} />
              <Route path='/new-pet' element={<RegisterPet />} />
              <Route path='/my-account' element={<MyAccount />} />
            </Routes>
          </AuthProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}
