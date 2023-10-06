import {clientAsc, clientDesc} from "./apiClient";

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
