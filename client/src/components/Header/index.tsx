import "./Header.css";
import { useAuth } from "../../provider/authProvider";
import { useNavigate, useLocation } from "react-router-dom";
import Pokedex from "../../assets/pokedex.png";
import { ReactNode, useState } from "react";

// interface HeaderProps {
//   handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }
const Header = ({ handleSearch }: any) => {
  const { signed, user } = useAuth();
  const navigate = useNavigate();
  const toLogin = () => navigate("/login");
  const toFavorites = () => navigate("/favorites");
  const toHome = () => navigate("/");
  const [inputValue, setInputValue] = useState("");

  const location = useLocation().pathname;
  return (
    <>
      <div className="header">
        <img src={Pokedex} alt="pokelogo" className="pokedex-logo" />
        {signed ? (
          <span className="user-info">
            <span>Hi, {user as ReactNode}</span>
            {location === "/favorites" ? (
              <button className="blue-btn" onClick={toHome}>
                Back
              </button>
            ) : (
              <button className="blue-btn" onClick={toFavorites}>
                Favorites
              </button>
            )}
          </span>
        ) : (
          <button className="blue-btn" onClick={toLogin}>
            Log in
          </button>
        )}
      </div>

      <div className="search__container">
        <input
          className="search__input"
          type="text"
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Search for a Pokémon"
        />
        <button
          className="search__button"
          onClick={() => handleSearch(inputValue)}
        >
          Search
        </button>
      </div>
    </>
  );
};

export default Header;
