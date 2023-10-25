import axios from "axios";
import { usePostCreateFavorite } from "../../../hooks/usePostCreateFavorite";
import { Desk } from "../../../types/types";

export const handleFavorite = async (desk: Desk | null) => {
  if (!desk) return;

  const deskId = desk.id;
  try {
    const success = await usePostCreateFavorite(deskId);

    if (success) {
      alert("Tisch erfolgreich zu Favoriten hinzugefügt!");
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 409) {
        alert(
          "Der Tisch ist schon favorisiert, sie können ihn unter Favoriten entfernen"
        );
      } else {
        alert("Es ist beim Favorisieren ein Fehler aufgetreten");
      }
    }
  }
};
