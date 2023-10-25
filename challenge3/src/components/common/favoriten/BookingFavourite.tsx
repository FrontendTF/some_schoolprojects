import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import { API_URL } from '../../../config/config';
import axios from 'axios';

const baseURl = `${API_URL}/api`

export const BookingFavourite = ({ deskId, refreshFavoriten }: { deskId: number, refreshFavoriten: () => void }) => {

  const [token, setToken] = useState(localStorage.getItem('token'))
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      setEndDate(date);
    }
  };

  const handleBookingSubmit = async () => {
    try {
      const formattedStartDate = startDate.toISOString();
      const formattedEndDate = endDate.toISOString();

      const bookingData = {
        dateStart: formattedStartDate,
        dateEnd: formattedEndDate,
        desk: deskId,
      };

      await axios.post(`${baseURl}/bookings`, bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh the list of favorites after successful booking
      refreshFavoriten();
      window.alert('Die Buchung war Erfolgreich!'); 
    } catch (error) {
      console.error('Fehler bei der Buchung! Tisch in dem Zeitraum vergeben oder Zeitraum zu groß! (Hinweis: Die Buchung darf max. 4 Wochen sein)',error)
      alert('Fehler bei der Buchung! (Hinweis: Die Buchung darf max. 4 Wochen oder 4 wochen voraus sein)');
      
    }
  };
  return (
    <div className='flex gap-2'>
      
      <div>
        
        <DatePicker selected={startDate} dateFormat="dd/MM/yyyy" onChange={handleStartDateChange} className='border-2 rounded-md text-center'/>
      </div>
      <div>
        
        <DatePicker selected={endDate} dateFormat="dd/MM/yyyy" onChange={handleEndDateChange} className='border-2 rounded-md text-center'/>
      </div>
      <button onClick={handleBookingSubmit} className='bg-blue-500 text-white font-bold px-3 py-1 rounded-2xl w-fit uppercase md:hover:bg-blue-700'>BUCHEN</button>
    </div>
  )
}
