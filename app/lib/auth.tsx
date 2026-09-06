"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "./api";
import type { RespuestaAuth, Usuario } from "./types";

type ContextoAuth = {
  usuario: Usuario | null;
  cargando: boolean;
  login: (email: string, password: string) => Promise<void>;
  registro: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<ContextoAuth | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCargando(false);
      return;
    }

    api
      .get<Usuario>("/auth/me")
      .then(setUsuario)
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setCargando(false));
  }, []);

  function guardarSesion(respuesta: RespuestaAuth) {
    localStorage.setItem("token", respuesta.access_token);
    setUsuario(respuesta.user);
  }

  async function login(email: string, password: string) {
    const respuesta = await api.post<RespuestaAuth>("/auth/login", {
      email,
      password,
    });
    guardarSesion(respuesta);
    router.push("/dashboard");
  }

  async function registro(name: string, email: string, password: string) {
    const respuesta = await api.post<RespuestaAuth>("/auth/register", {
      name,
      email,
      password,
    });
    guardarSesion(respuesta);
    router.push("/dashboard");
  }

  function logout() {
    localStorage.removeItem("token");
    setUsuario(null);
    router.push("/login");
  }

  return (
    <AuthContext.Provider
      value={{ usuario, cargando, login, registro, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return contexto;
}
