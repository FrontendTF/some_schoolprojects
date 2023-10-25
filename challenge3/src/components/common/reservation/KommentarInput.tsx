import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../config/config';

const baseURL = `${API_URL}/api`;

interface KommentarInputProps {
  reservierungId: string;
  deskId: string;
}

const KommentarInput: React.FC<KommentarInputProps> = ({ reservierungId, deskId }) => {
  const [kommentar, setKommentar] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (kommentar.length <= 300) {
      try {
        const response = await axios.post(
          `${baseURL}/comments`,
          { comment: kommentar, desk: deskId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          alert('Kommentar erfolgreich gesendet!');
          setKommentar('');
        }
      } catch (error) {
        console.error('Fehler beim Senden des Kommentars: ', error);
      }
    } else {
      alert('Der Kommentar darf maximal 300 Zeichen haben.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center px-3'>
      <textarea
        value={kommentar}
        onChange={(e) => setKommentar(e.target.value)}
        placeholder='Geben Sie hier Ihren Kommentar ein (maximal 300 Zeichen).'
        rows={4}
        cols={50}
        className='border-2 rounded-md my-2'
      />

      <button type='submit' className='bg-blue-500 text-white font-bold px-3 py-1 rounded-2xl w-fit uppercase md:hover:bg-blue-700'>
        Kommentar senden
      </button>
    </form>
  );
};

export default KommentarInput;
