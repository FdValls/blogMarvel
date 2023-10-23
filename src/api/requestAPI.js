import {
  clientAsc,
  clientDesc,
  clientLogin,
  useAuthEndpoints,
} from "./apiClient";
import { getToken, setToken } from "./token";
import qs from "qs";

export const requestAPIFirst = {
  get: async function () {
    const response = await clientAsc.get("/characters");
    if (response) {
      return response.data;
    }
  },
};

export const requestAPISecond = {
  get: async function () {
    const response = await clientDesc.get("/characters");
    if (response) {
      return response.data;
    }
  },
};

export const loginAPI = {
  post: async function (usuario, password) {
    // Transformamos los datos a enviar en JSON String
    // para enviar dentro de un form
    const data = qs.stringify({
      usuario: usuario,
      password: password,
    });
    const response = await clientLogin.request({
      url: `/login`, // endpoint definido para esta petición
      headers: {
        // está petición usa Form
        "content-type": "application/x-www-form-urlencoded",
      },
      method: "POST", // método HTTP de esta petición
      data: data, // datos enviados
    });
    if (response) {
      // si el backend retorna una respuesta, se returna los datos
      return response.data;
    }
  },
};

export const loginAuthAPI = {
  post: async function (usuario, password) {
    // Transformamos los datos a enviar en JSON String
    // para enviar dentro de un form
    const data = qs.stringify({
      usuario: usuario,
      password: password,
    });
    const response = await clientLogin.request({
      url: `/auth/login`, // endpoint definido para esta petición
      headers: {
        // está petición usa Form
        "content-type": "application/x-www-form-urlencoded",
      },
      method: "POST", // método HTTP de esta petición
      data: data, // datos enviados
    });
    if (response) {
      // si el backend retorna una respuesta, se returna los datos
      console.table(response.data);
      setToken(response.data.token);
      return response.data;
    }
  },
};

export const posteosAPI = {
  get: async function (username) {
    const response = await clientLogin.request({
      url: `/posteos/${username}`,
      method: "GET",
    });
    if (response) {
      return response.data;
    }
  },
  post: async function (username, titulo, texto) {
    const response = await clientLogin.request({
      url: `/posteos/${username}`,
      method: "POST",
      data: {
        titulo: titulo,
        texto: texto,
      },
    });
    if (response) {
      return response.data;
    }
  },
};

export const posteosAuthAPI = {
  get: async function (username) {
    const token = getToken();
    const response = await clientLogin.request({
      url: `/auth/posteos/${username}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
    if (response) {
      return response.data;
    }
  },
  post: async function (username, titulo, texto) {
    const token = getToken();
    const response = await clientLogin.request({
      url: `/auth/posteos/${username}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      data: {
        titulo: titulo,
        texto: texto,
      },
    });
    if (response) {
      return response.data;
    }
  },
};
