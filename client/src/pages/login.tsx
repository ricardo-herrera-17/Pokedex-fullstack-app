import { useState } from "react";
import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";
import SignUp from "../components/SignUp";
import Pokedex from "../assets/pokedex.png";

const LogIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { Login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await Login({ email, password });
    navigate("/favorites");
  };

  return (
    <>
      <img src={Pokedex} alt="pokelogo" className="pokedex-logo" />
      <SignUp
        setEmail={setEmail}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    </>
  );
};

export default LogIn;
