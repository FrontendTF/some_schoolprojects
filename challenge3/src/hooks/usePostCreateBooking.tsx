import axios from "axios";
import { API_URL } from "../config/config";

export const UsePostCreateBooking = async (
  deskId: string,
  dateStart: string,
  dateEnd: string
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/api/bookings`,
      {
        dateStart,
        dateEnd,
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
    throw error; // Fehler auslösen, damit er von der aufrufenden Funktion behandelt werden kann
  }
};
