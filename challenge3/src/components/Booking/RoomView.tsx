import React, { useState, useEffect } from "react";
import { Booking, Desk, FixdeskRequest, Office } from "../../types/types";
import axios from "axios";
import { API_URL } from "../../config/config";
import "react-datepicker/dist/react-datepicker.css";
import DeskModal from "./BookingModal";
import { User } from "../../types/types";
import { handleBooking } from "./BookingParts/HandleBooking";
import { handleFavorite } from "./BookingParts/HandleFavorite";
import { handleFixdeskRequest } from "./BookingParts/HandleFixdeskRequest";

interface RoomProps {
  officeDetails: Office;
  desks: Desk[];
}

export const Room: React.FC<RoomProps> = ({ officeDetails, desks }) => {
  const [selectedDesk, setSelectedDesk] = useState<Desk | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookedDesks, setBookedDesks] = useState<string[]>([]);
  const [currentUser] = useState<User | null>(null);
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [desk, setDesk] = useState<Desk | null>(null);
  const [clickedDeskId, setClickedDeskId] = useState<string | null>(null);

  //mouseevent zum schluss entfernen
  const handleClick = (event: React.MouseEvent, desk: Desk) => {
    setSelectedDesk(desk);
    fetchDeskBookings(desk.id);
    setModalOpen(true);
    fetchDeskDetails(desk.id);
    setClickedDeskId(desk.id);
  };
  //GET Tischdaten fetchen
  const fetchDeskBookings = async (deskId: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${API_URL}/api/bookings/desk/${deskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings(response.data);
      if (response.data.length > 0) {
        setBookedDesks((prev) => [...prev, deskId]);
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Buchungen", error);
    }
  };
  //Modalfenster schließen
  const closeModal = () => setModalOpen(false);

  //Schriftgröße des Labels ändern
  const [fontSize, setFontSize] = useState("12px");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 640);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setFontSize("12px");
        setIsSmallScreen(true);
      } else {
        setFontSize("16px");
        setIsSmallScreen(false);
      }
    };
    // check and set
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //grid
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${officeDetails.columns}, 1fr)`,
    gridTemplateRows: `repeat(${officeDetails.rows}, 1fr)`,
    gap: "1rem",
    padding: "1rem",
    backgroundColor: "rgba(59, 130, 246, 0.3)", //gleiches blau nur mit opa
    fontSize: fontSize,
    justifyItems: "center",
  };

  //Tisch Buchen
  const handleBookingWrapper = async () => {
    await handleBooking(selectedDesk, startDate, endDate);
  };
  //Tisch Favorisieren
  const handleFavoriteWrapper = async () => {
    await handleFavorite(selectedDesk);
  };
  //Tisch Fixdesk Anfragen
  const handleFixdeskRequestWrapper = async () => {
    await handleFixdeskRequest(selectedDesk);
  };

  //Verfügbarkeit des Tisches überprüfen (rot/grün)
  //alle Buchungen holen
  const fetchAllBookings = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/api/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllBookings(response.data);
    } catch (error) {
      console.error("Fehler beim Abrufen aller Buchungen", error);
    }
  };
  //Buchungszeitraum VON BIS filtern
  const [bookingsForSelectedDate, setBookingsForSelectedDate] = useState<
    Booking[]
  >([]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    setStartDate(new Date(selectedDate));
  };

  const handleFetchForSelectedDate = async () => {
    await fetchAllBookings();
    const filteredBookings = allBookings.filter(
      (booking) =>
        startDate >= new Date(booking.dateStart) &&
        startDate <= new Date(booking.dateEnd)
    );
    setBookingsForSelectedDate(filteredBookings);
  };

  //fixdesk check on click wegen desk/id
  const fetchDeskDetails = async (deskId: string) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://deskbooking.dev.webundsoehne.com/api/desks/${deskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setDesk(data);
    } catch (error) {}
  };

  return (
    <>
      <div className="px-5 md:p-10">
        <div>
          <p>
            <b>Flexdesk: </b>Flexibler Tisch max. 1 Woche, nur unter der Woche
            buchbar
          </p>
          <p>
            <b>Fixdesk: </b>Kann mehrere Wochen gebucht werden. Nur auf Anfrage.
          </p>
          <p>
            <b>Raumgröße: </b>Hellblau
          </p>
          <p>
            <b>Grüner Hintergrund: </b>Freie Flexdesks
          </p>
          <p>
            <b>Rosa Hintergrund: </b>Gebuchte Flexdesks
          </p>

          <div className="py-5">
            {desk && (
              <>
                {desk.fixdesk && (
                  <>
                    <b className="uppercase text-red-500">
                      {desk.label} = Fixdesk{" "}
                    </b>
                    <p>
                      <b className="pl-12 text-lg">User</b>
                    </p>
                    <p>
                      <strong>Name:</strong> {desk.fixdesk.user.firstname}{" "}
                      {desk.fixdesk.user.lastname}
                    </p>
                    <p>
                      <strong>Email:</strong> {desk.fixdesk.user.email}
                    </p>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div>
          <input type="date" onChange={handleDateChange} />
          <button onClick={handleFetchForSelectedDate}>
            Verfügbarkeit überprüfen
          </button>
        </div>
      </div>
      <br />
      <div className="flex justify-center w-full" style={gridStyle}>
        {desks.map((desk, index) => {
          const isBooked = bookingsForSelectedDate.some(
            (booking) => booking.desk.id === desk.id
          );
          //grün rosa
          let backgroundColor = isBooked ? "lightpink" : "lightgreen";
          //onclick blue
          if (clickedDeskId === desk.id) {
            backgroundColor = "lightblue";
          }
          //mit css, mit tailwind probleme gehabt design wie in api
          return (
            <div
              key={index}
              style={{
                gridColumnStart: desk.column + 1,
                gridRowStart: desk.row + 1,
                border: `2px solid `,
                borderRadius: "8px",
                backgroundColor: backgroundColor,
                maxWidth: "130px",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                width: "100%",
                minHeight: isSmallScreen ? "50px" : "60px",
              }}
              onClick={(event) => handleClick(event, desk)}
            >
              {desk.label}
            </div>
          );
        })}
        <DeskModal
          currentUser={currentUser}
          selectedDesk={selectedDesk}
          startDate={startDate}
          endDate={endDate}
          bookings={bookings}
          isModalOpen={isModalOpen}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          handleBooking={handleBookingWrapper}
          handleFixdeskRequest={handleFixdeskRequestWrapper}
          handleFavorite={handleFavoriteWrapper}
          closeModal={closeModal}
          deskDetails={desk}
        />
      </div>
    </>
  );
};
// };
