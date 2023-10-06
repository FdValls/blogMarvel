import axios from "axios";

const baseURL = "http://gateway.marvel.com/v1/public";

const commonParamsOne = {
  limit: 100,
  orderBy: "name",
  ts: 1,
  apikey: "3b78c53804d8b1213a8ab41f5f3dd470",
  hash: "dc626d86cb6e9490ecaa418dc462b7df",
};

const commonParamsTwo = {
  limit: 100,
  orderBy: "-name",
  ts: 1,
  apikey: "3b78c53804d8b1213a8ab41f5f3dd470",
  hash: "dc626d86cb6e9490ecaa418dc462b7df",
};

const clientAsc = axios.create({
  baseURL: baseURL,
  params: commonParamsTwo,
});

const clientDesc = axios.create({
  baseURL: baseURL,
  params: commonParamsOne,
});

export { clientAsc, clientDesc };
