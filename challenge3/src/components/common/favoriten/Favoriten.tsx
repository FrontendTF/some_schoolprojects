import React, { useEffect, useState } from 'react';
import { Pageheader } from '../Pageheader';
import { API_URL } from '../../../config/config';
import axios from 'axios';
import DeleteFavoriten from './DeleteFavoriten';
import { BookingFavourite } from './BookingFavourite';

const baseURL = `${API_URL}/api`;

// Interface for the API response
interface Favorite {
  id: string;
  desk: {
    id: number;
    office: {
      name: string;
    };
    label: string;
    type: string;
    equipment: string[];
  };
}

export const Favoriten = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [favourites, setFavourites] = useState<Favorite[] | null>(null);
  

  useEffect(() => {
    if (token) {
      axios
        .get(`${baseURL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setUserId(response.data.id);
        });
    }
  }, [token]);

  useEffect(() => {
    if (userId) {
      getFavoriten();
    }
  }, [userId]);

  const getFavoriten = async () => {
    try {
      const response = await axios.get(`${baseURL}/favourites/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //console.log(response.data)
      setFavourites(response.data);
    } catch (error) {
      console.error('Fehler beim Abrufen der Favoriten:', error);
    }
  };

  const deleteFavourite = async (favoriteID: string) => {
    try {
      await axios.delete(`${baseURL}/favourites/${favoriteID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavourites(favourites?.filter((fav) => fav.id !== favoriteID) || []);
    } catch (error) {
      console.error('Fehler beim Löschen des Favoriten', error);
    }
  };

  return (
    <>
      <Pageheader users={{
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        isAdmin: false,
        department: '',
        createdAt: '',
        updatedAt: ''
      }} />
      <section>
        <div className="bg-div">
        <img
          src="/src/assets/OFFICEBackground.jpeg"
          alt="Office"
          className="bg-image"
        />
        <div className="bg-oppacity"></div>

        <div className='container'>
          <h2 className='H2 uppercase'>favoriten</h2>
          <div className='bg-white p-4 mx-2 my-3 overflow-x-auto'>
            <table>
              <thead>
                <tr>
                  <th className='px-4 py-2'>Office</th>
                  <th className='px-4 py-2'>Tisch</th>
                  <th className='px-4 py-2'>Type</th>
                  <th className='px-4 py-2'>Equipment</th>
                  <th className='px-4 py-2'>Datum wählen für die nächste Buchung</th>
                  <th className='px-4 py-2'>Aus Favoriten entfernen:</th>
                  
                </tr>
              </thead>
              <tbody>
                {favourites &&
                  favourites.map((fav) => (
                    <tr key={fav.id} className='border-b'>
                      <td className='px-4 py-2'>{fav.desk.office.name}</td>
                      <td className='px-4 py-2'>{fav.desk.label}</td>
                      <td className='px-4 py-2'>{fav.desk.type}</td>
                      <td className='px-4 py-2'>{fav.desk.equipment.join(', ')}</td>
                      <td className='px-4 py-2 '>
                          <BookingFavourite
                            deskId={fav.desk.id}
                            
                            refreshFavoriten={getFavoriten}
                         />
                        </td>
                      
                      <td className='px-4 py-2 text-center'>
                        <DeleteFavoriten favoriteID={fav.id} deleteFavourite={deleteFavourite}  buttonText='&#10060;' />
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
