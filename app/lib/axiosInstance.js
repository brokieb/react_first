const axios = require("axios");

export default axios.create({
  baseURL: process.env.ADDRESS,
  // timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const allegroAxios = axios.create({
  baseURL: "https://api.allegro.pl.allegrosandbox.pl",
  // timeout: 1000,
  headers: {
    Accept: "application/vnd.allegro.public.v1+json",
    "Content-Type": "application/vnd.allegro.public.v1+json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,PATCH,DELETE,POST,PUT",
    "Access-Control-Allow-Headers": "*",
  },
});

export const allegroAxiosAuth = axios.create({
  baseURL: "https://allegro.pl.allegrosandbox.pl",
  // timeout: 1000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "http://localhost",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
});

export const hotpayAxios = axios.create({
  baseURL: "https://platnosc.hotpay.pl",
  // timeout: 1000,
});
