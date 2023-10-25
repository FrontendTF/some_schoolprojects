import axios from "axios";
import { API_URL } from "../config/config";

export const usePostFixDeskRequest = async (deskId: string | null) => {
  const token = localStorage.getItem("token");
  const fixdeskRequestData = {
    desk: deskId,
  };

  try {
    const response = await axios.post(
      `${API_URL}/api/fixdesk-requests`,
      fixdeskRequestData,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201) {
      alert("Sie haben eine Fixdeskanfrage erfolgreich abgesendet!");
    }
  } catch (error: any) {
    alert(
      "Sie haben bereits eine Fixdesk Anfrage gestellt, der Admin muss zuerst diese bestätigen um eine neue zu stellen!"
    );
    console.error(error.response.data);
  }
};
