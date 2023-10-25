import axios from "axios";
import { API_URL } from "../config/config";
import { User } from "../types/types";

export const useGetCurrentUser = async (): Promise<User | null> => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fehler beim Abrufen des Benutzerprofils", error);
    return null;
  }
};
