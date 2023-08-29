import { ReactNode, createContext, useState } from "react";
import { destroyCookie, setCookie } from "nookies";
import Router from "next/router";

import { api } from "../services/apiClient";
import { toast } from "react-toastify";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, "@dr_pizza.token");
    Router.push("/");
  } catch {
    console.log("Error when trying to log out");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/login", { email, password });
      const { id, name, token } = response.data;
      setCookie(undefined, "@dr_pizza.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      setUser({ id, name, email });
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      toast.success("Logado com sucesso!");
      Router.push("/dashboard");
    } catch (err) {
      toast.error("Error ao tentar logar!");
      console.log("ERROR => ", err);
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post("/user", { name, email, password });
      toast.success("Usuário cadastrado com sucesso!");
      Router.push("/");
    } catch (err) {
      toast.error("Error ao tentar cadastrar!");
      console.log("ERROR => ", err);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
