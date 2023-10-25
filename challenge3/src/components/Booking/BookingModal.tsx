import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { Desk, Booking, User } from "../../types/types";

interface DeskModalProps {
  selectedDesk: Desk | null;
  startDate: Date;
  endDate: Date;
  bookings: Booking[];
  isModalOpen: boolean;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  handleBooking: () => void;
  handleFixdeskRequest: () => void;
  closeModal: () => void;
  handleFavorite: () => void;
  currentUser: User | null;
  deskDetails: Desk | null;
}

const DeskModal: React.FC<DeskModalProps> = ({
  selectedDesk,
  startDate,
  endDate,
  bookings,
  isModalOpen,
  setStartDate,
  setEndDate,
  handleBooking,
  handleFixdeskRequest,
  closeModal,
  handleFavorite,
  currentUser,
  deskDetails,
}) => {
  // Gebuchte DAten
  const bookedDates: Date[] = [];
  bookings.forEach((booking) => {
    const start = new Date(booking.dateStart);
    const end = new Date(booking.dateEnd);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      bookedDates.push(new Date(d));
    }
  });

  //bei fixdesk buttons disablen
  const isDisabled = !!deskDetails && !!deskDetails.fixdesk;

  return (
    <Modal
      style={{
        overlay: {
          zIndex: 1000,
        },
      }}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
    >
      {selectedDesk && (
        <>
          <div className="flex flex-col gap-5 md:gap-8 lg:gap-10 md:text-lg">
            <h2 className="H2">{selectedDesk.label}</h2>
            <p>
              <span className="font-bold uppercase underline">Wichtig: </span>
              Ein Flexdesk ist nicht über das Wochenende buchbar. Sollten Sie
              ihn länger als eine Woche brauchen müssen Sie zwei Buchungen
              tätigen oder eine Fixdeskanfrage senden. Ausgegraute Datume im
              Kalender sind bereits ausgebucht.
            </p>
            <div>
              <p>
                <b>Tisch Buchen = Flexdesk</b>
              </p>
              <p>
                <b>Fixdesk Anfragen = Fixdesk</b>
              </p>
            </div>
            <div>
              <p>
                <b>Ausstattung:</b> {selectedDesk.equipment?.join(", ")}
              </p>
            </div>

            {currentUser && (
              <div>
                <p>
                  <b>User Buchungsdaten:</b>
                </p>
                <p className="pl-5">
                  <b> Name:</b> {currentUser.firstname} {currentUser.lastname}
                </p>
                <p className="pl-5">
                  <b> Email:</b> {currentUser.email}
                </p>
              </div>
            )}
            {deskDetails && deskDetails.fixdesk && (
              <div>
                <p>
                  <b>Dieser Tisch ist aktuell nicht buchbar</b>
                </p>
                <b>Derzeitiger Fixdesk User</b>
                <p>
                  <strong>Name:</strong> {deskDetails.fixdesk.user.firstname}{" "}
                  {deskDetails.fixdesk.user.lastname}
                </p>
                <p>
                  <strong>Email:</strong> {deskDetails.fixdesk.user.email}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row">
              <div className="Datepickerdiv">
                <p className="sm:text-center">
                  <b>Von:</b>
                </p>
                <DatePicker
                  className="Datepicker"
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  excludeDates={bookedDates}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className="Datepickerdiv">
                <p className="sm:text-center">
                  <b>Bis:</b>
                </p>
                <DatePicker
                  className="Datepicker"
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                  excludeDates={bookedDates}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              <button
                className="blueButton"
                onClick={handleBooking}
                disabled={isDisabled}
              >
                {isDisabled ? "Nicht buchbar" : "Tisch buchen"}
              </button>

              <button
                className="blueButton"
                onClick={handleFixdeskRequest}
                disabled={isDisabled}
              >
                {isDisabled ? "Nicht buchbar" : "Fixdesk Anfragen"}
              </button>
              <button className="blueButton" onClick={handleFavorite}>
                Tisch favorisieren
              </button>
            </div>
            <div>
              <h3>
                <b> Buchungen:</b>
              </h3>
              {bookings.map((booking, index) => (
                <p key={index}>
                  {booking.user.firstname} {booking.user.lastname} :{" "}
                  {new Date(booking.dateStart).toLocaleDateString()} -{" "}
                  {new Date(booking.dateEnd).toLocaleDateString()}
                </p>
              ))}
            </div>

            <button className="blueButton self-end" onClick={closeModal}>
              Schließen
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default DeskModal;
