import React, { useEffect, useState } from "react";
import { Pageheader } from "../Pageheader";
import { API_URL } from "../../../config/config";
import axios from "axios";
import KommentarInput from "./KommentarInput";
import { Desk } from "../../../types/types";

const baseURL = `${API_URL}/api`;


interface ReservationData {
  id: string;
  dateStart: Date;
  dateEnd: Date;
  desk: Desk;
}


export const Reservation = () => {
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);
  const [reservation, setReservation] = useState<ReservationData[]>([]);
  const [reservationID, setReservationID] = useState<string | null>(null)
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      // get User Profile and save ID
      axios
        .get(`${baseURL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          //console.log(response.data.id)
          setUser(response.data);
          setUserID(response.data.id);
        });
    }
  }, [token]);

  useEffect(() => {
    if (userID) {
      getReservation();
    }
  }, [userID]);

  const getReservation = async () => {
    try {
      const response = await axios.get(`${baseURL}/bookings/user/${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setReservation(response.data);
      setReservationID(response.data.id)
      
    } catch (error) {
      console.error("Fehler beim Abrufen der Reservierungen: ", error);
    }
  };

  const deleteReservation = async (idToDelete: string) => {
    try {
      await axios.delete(`${baseURL}/bookings/${idToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Aktualisiere die Liste der Reservierungen nach dem Löschen
      const updatedReservations = reservation.filter(res => res.id !== idToDelete);
      setReservation(updatedReservations);
    } catch (error) {
      console.error('Fehler beim Löschen:', error);
    }
  }

  
  
  return (
    <>
      <Pageheader
        users={{
          id: "",
          firstname: "",
          lastname: "",
          email: "",
          isAdmin: false,
          department: "",
          createdAt: "",
          updatedAt: "",
        }}
      />
      <section>
        <div className="w-full h-screen relative overflow-hidden">
        <img
          src="/src/assets/OFFICEBackground.jpeg"
          alt="Office"
          className="w-full h-full object-cover absolute -z-10"
        />
        <div className="absolute inset-0 bg-white bg-opacity-50 -z-10"></div>

        <div className="container">
          <h2 className="H2 uppercase">aktuelle Reservierungen:</h2>
          <div className="bg-white p-4 mx-2 my-3 overflow-x-auto">
            <table className="table-auto md:w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Office</th>
                  <th className="px-4 py-2">Startdatum</th>
                  <th className="px-4 py-2">Enddatum</th>
                  <th className="px-4 py-2">Schreibtisch</th>
                  <th className="px-4 py-2">Equipment</th>
                  <th className="px-4 py-2">Type</th>
                  
                  
                </tr>
              </thead>
              <tbody>
                {reservation.map((res) => (
                  <tr key={res.id} className="border-b">
                    <td className="px-4 py-2">{res.desk.office.name}</td>
                    <td className="px-4 py-2">
                      {new Date(res.dateStart).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(res.dateEnd).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{res.desk.label}</td>
                    <td className="px- py-2">
                      {res.desk.equipment.join(", ")}
                    </td>
                    <td className="px-4 py-2">{res.desk.type}</td>
                    <td>
                    <button onClick={() => deleteReservation(res.id)} className="text-2xl text-red-600 text-center">&#10060;</button>
                    </td>
                    


                    <td >
                      {new Date(res.dateEnd) < new Date() && (
                        <KommentarInput
                        reservierungId={res.id}
                        deskId={res.desk.id}
                        />
                      )}
                    </td>
                    
                  </tr>
                ))}

              </tbody>
              
            </table>
          </div>
        </div>


        </div>
        
      </section>
    </>
  );
};
