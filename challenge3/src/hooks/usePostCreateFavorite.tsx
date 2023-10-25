import axios from "axios";
import { API_URL } from "../config/config";

export const usePostCreateFavorite = async (deskId: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/api/favourites`,
      {
        desk: deskId,
      },
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.status === 201;
  } catch (error) {
    throw error;
  }
};
