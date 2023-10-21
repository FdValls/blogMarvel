import { createContext } from "react";

const defaultValue = {
  auth: false,
  userName: "",
};

export const AuthContext = createContext(defaultValue);

export function initAutenticacion() {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  console.log(`autenticación almacenada: ${isAuthenticated}`);
  return Boolean(isAuthenticated); // FOrzar que el dato sea interpretado como true/false (boolean)
}
