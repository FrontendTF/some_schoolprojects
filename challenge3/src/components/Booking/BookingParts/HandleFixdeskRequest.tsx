import { usePostFixDeskRequest } from "../../../hooks/usePostFixDeskRequest";
import { Desk } from "../../../types/types";

export const handleFixdeskRequest = async (desk: Desk | null) => {
  if (!desk) {
    alert("Kein Schreibtisch ausgewählt");
    return;
  }
  await usePostFixDeskRequest(desk.id);
};
