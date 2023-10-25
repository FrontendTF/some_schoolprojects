import axios from "axios"; // Importieren Sie axios für die Fehlerbehandlung
import { UsePostCreateBooking } from "../../../hooks/usePostCreateBooking";
import { Desk } from "../../../types/types";

export const handleBooking = async (
  selectedDesk: Desk | null,
  startDate: Date,
  endDate: Date
) => {
  if (selectedDesk === null) {
    alert("Kein Schreibtisch ausgewählt");
    return;
  }

  try {
    const success = await UsePostCreateBooking(
      selectedDesk.id,
      startDate.toISOString(),
      endDate.toISOString()
    );

    if (success) {
      alert("Buchung erfolgreich erstellt!");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 400) {
        alert(
          "Die Buchung kann maximal 4 Wochen im Voraus und nicht über das Wochenende gebucht werden"
        );
      } else if (error.response && error.response.status === 409) {
        alert("Sie haben zu diesem Datum bereits einen Tisch gebucht");
      } else {
        console.error("Ein unbekannter Fehler ist aufgetreten:", error);
      }
    }
  }
};
