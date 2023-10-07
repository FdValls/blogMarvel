import { createContext } from "react";

const defaultValue = {
  auth: false,
};

export const AuthContext = createContext(defaultValue);

export function isAuth(value) {
  defaultValue.auth = value;
  sessionStorage.setItem("isAuthenticated", value ? "true" : "false");
}

export function initAutenticacion() {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  console.log(`autenticación almacenada: ${isAuthenticated}`);
  return Boolean(isAuthenticated); 
}

