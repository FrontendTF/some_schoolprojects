import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { API_URL } from "../config/config";
import { Registrationdata } from "../types/types";

export const useGetSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (regisdata: Registrationdata) => {
      const baseURL = `${API_URL}/api/users/register`;
      const bodyparams = regisdata;

      const response = await axios.post(baseURL, bodyparams, {
        headers: { accept: "application/json" },
      });

      return response.data as Registrationdata;
    },
  });
};
