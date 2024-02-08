import "../App.css";
import { useState, useEffect } from "react";
import PokemonGrid from "../components/PokemonGrid";
import Header from "../components/Header";
import { getMyPokemons } from "../services/api";

export const Favorites = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await getMyPokemons();
        setPokemons(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <>
      <Header handleSearch={() => {}} />
      <div>
        {pokemons.length > 0 ? (
          <PokemonGrid pokemons={pokemons} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};
