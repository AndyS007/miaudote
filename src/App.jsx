import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/signin" element={<SignInPage/>} />
          <Route path="/signup" />
          <Route path="/pets" />
          <Route path="/pets/:id" />
          <Route path="/new-pet" />
          <Route path="/my-account" />
        </Routes>
      </BrowserRouter>
    </>
  )
}
