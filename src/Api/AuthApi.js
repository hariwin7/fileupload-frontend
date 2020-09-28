import axios from "axios";
import { APP_URL } from "../constants/constant";

export const signIn = (payload) => {
  const URL = `${APP_URL}user/signin`;
  return axios
    .post(URL, payload)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const signUp = (payload) => {
  const URL = `${APP_URL}user/signup`;
  return axios
    .post(URL, payload)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getUser = (token) => {
  const URL = `${APP_URL}get_user`;
  return axios
    .get(URL, {
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const updateUser = (token, payload) => {
  const URL = `${APP_URL}update_user`;
  return axios
    .post(URL, payload, {
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const uploadFile = (token, payload) => {
  const URL = `${APP_URL}uploadfile`;
  return axios
    .post(URL, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getFiles = (token) => {
  const URL = `${APP_URL}getfiles`;
  return axios
    .get(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getPdf = (token, payload) => {
  const URL = `${APP_URL}fetch-pdf`;
  return axios
    .post(URL, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      responseType: "blob",
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
