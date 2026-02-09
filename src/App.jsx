import { Routes, Route } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";

const App = () => {
  
  return (
    <>
      <NavBar />
      <h1>Testing:</h1>
      <Routes>
        <Route path="/sign-up" element={<SignUpForm />} />
      </Routes>
    </>
  );
};

export default App;