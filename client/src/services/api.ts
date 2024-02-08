import axios, { AxiosHeaders } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("@Auth:access_token");
    if (token) {
      (config.headers as AxiosHeaders).Authorization = `Bearer ${token}`;
    }
    return config;
  },

  (error) => {
    Promise.reject(error);
  }
);

interface postResponse {
  jwt: string;
  favorite_pokemons: number[];
  response?: any;
}
export const logIn = async (email: string, password: string) => {
  try {
    const res = await api.post<postResponse>("/login", {
      email: email,
      password: password,
    });
    return res;
  } catch (err) {
    console.error(err);
    return;
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const res = await api.post<postResponse>("/sign-up", {
      email: email,
      password: password,
    });
    return res;
  } catch (err) {
    console.error(err);
    return;
  }
};

export const getMyPokemons = async () => {
  try {
    const res = await api.post<postResponse>("/my-pokemons");

    return res.data.response;
  } catch (err) {
    console.error("Error getting trainer favorite pokemons", err);
    return;
  }
};

export const getPokemons = async (offSet: number = 0, limit: number = 100) => {
  try {
    const res = await api.get<postResponse>(
      `/?pokemonLimit=${limit}&pokemonOffset=${offSet}`
    );
    return res.data.response;
  } catch (err) {
    console.error("Error getting pokemons", err);
    return;
  }
};

export const saveFavoritePokemons = async (
  pokemons: number[]
): Promise<boolean> => {
  try {
    const response = await api.post<postResponse>("/save-pokemons", {
      favorite_pokemons: pokemons,
    });

    if (response.status !== 201) {
      return false;
    }
    return true;
  } catch (err) {
    console.error("Error saving pokemons: ", err);
    return false;
  }
};

export const searchPokemon = async (pokemon: string) => {
  try {
    const res = await api.get<postResponse>(`/search/${pokemon}`);
    if (res.status !== 201) {
      return false;
    }
    return res.data.response;
  } catch (err) {
    console.error("Error searching pokemons", err);
    return false;
  }
};
