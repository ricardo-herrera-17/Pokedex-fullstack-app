import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextData, LoginType } from "../types/authContext";
import { logIn, signUp } from "../services/api";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = localStorage.getItem("@Auth:email");
      const storageToken = localStorage.getItem("@Auth:access_token");

      if (storageUser && storageToken) {
        setUser(storageUser);
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const Login = async ({ email, password }: LoginType) => {
    let res = await logIn(email, password);
    if (!res || res.status === 404) {
      res = await signUp(email, password);
    }
    if (!res || res.status === 404) {
      setUser(null);
      throw new Error("Invalid credentials");
    }

    setUser(email);

    localStorage.setItem("@Auth:access_token", res.data.jwt);
    localStorage.setItem("@Auth:email", email);
  };

  const Logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
