import "../App.css";
import { useState, useEffect } from "react";
import PokemonGrid from "../components/PokemonGrid";
import Header from "../components/Header";
import { getPokemons, searchPokemon } from "../services/api";
import { NotFound } from "../components/NotFound";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const [search, setSearch] = useState("");
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const toHome = () => navigate(0);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await getPokemons(offSet);
        setOffSet((prevOffset) => prevOffset + 100);
        setPokemons(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    const makeSearch = async () => {
      try {
        const data = await searchPokemon(search);
        if (!data) setNotFound(true);
        setPokemons(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (search) makeSearch();
  }, [search]);

  const handleSearchChange = (textSearch: any) => {
    setSearch(textSearch);
  };

  const handleLoadMore = async () => {
    try {
      const data = await getPokemons(offSet);
      const newPokemons = pokemons.concat(data);
      setOffSet((prevOffset) => prevOffset + 100);
      setPokemons(newPokemons);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Header handleSearch={handleSearchChange} />
      {notFound ? (
        <NotFound goBack={toHome} />
      ) : (
        <div>
          {pokemons.length > 0 ? (
            <div>
              <PokemonGrid pokemons={pokemons} />
              <button className="blue-btn" onClick={handleLoadMore}>
                Load more
              </button>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </>
  );
};
