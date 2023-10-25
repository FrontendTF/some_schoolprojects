import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../config/config";
import { Office } from "../types/types";

export const useGetAllOffices = () => {
  const baseURL = `${API_URL}/api/offices`;

  return useQuery("offices", async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get<Office[]>(baseURL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  });
};
