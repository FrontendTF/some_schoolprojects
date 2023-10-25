import { useMutation } from "react-query";
import { API_URL } from "../config/config";
import { Logindata } from "../types/types";
import { Tokendata } from "../types/types";
import axios from "axios";
import { Navigate } from "react-router-dom";

//axios interceptor wenn 401 unauthorisiert
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: any) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // refresh token
        const newTokenData = await refreshToken();

        // token neu setzen
        localStorage.setItem("token", newTokenData.token);
        localStorage.setItem("refresh", newTokenData.refresh);

        // token speichern für authorization header
        originalRequest.headers.Authorization = `Bearer ${newTokenData.token}`;
        return axios(originalRequest);
      } catch (refreshError: any) {
        //wenn refresh auch abgelaufen ist
        if (
          refreshError.message === "REFRESH_FAILED" ||
          refreshError.message === "NO_REFRESH_TOKEN"
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh");
          window.location.href = "/Login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Refresh Token
export const refreshToken = async (): Promise<Tokendata> => {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) {
    throw new Error("NO_REFRESH_TOKEN");
  }
  const baseURL = `${API_URL}/api/users/refresh`;
  const bodyparams = { refresh };

  try {
    const response = await axios.post(baseURL, bodyparams, {
      headers: { accept: "application/json" },
    });
    return response.data as Tokendata;
  } catch (error) {
    throw new Error("REFRESH_FAILED");
  }
};

// Login
export const useGetSignIn = () => {
  return useMutation({
    mutationFn: async (logindata: Logindata): Promise<Tokendata> => {
      const baseURL = `${API_URL}/api/users/login`;
      const bodyparams = logindata;

      try {
        const response = await axios.post(baseURL, bodyparams, {
          headers: { accept: "application/json" },
        });

        return response.data as Tokendata;
      } catch (error) {
        if ((error as any).response && (error as any).response.status === 401) {
          const newTokenData = await refreshToken();
          localStorage.setItem("token", newTokenData.token);
          localStorage.setItem("refresh", newTokenData.refresh);

          const response = await axios.post(baseURL, bodyparams, {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${newTokenData.token}`,
            },
          });
          return response.data as Tokendata;
        }
        throw error;
      }
    },
  });
};
