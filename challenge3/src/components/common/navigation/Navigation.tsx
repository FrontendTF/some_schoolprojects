import React, { useEffect, useState } from "react";
import Burgermenu from "./Burgermenu";
import { User } from "../../../types/types";
import { Link } from "react-router-dom";
import { API_URL } from "../../../config/config";
import axios from "axios";


type NavigationProps = {
  users: User;
};

export const Navigation = ({ users }: NavigationProps) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const baseURL = `${API_URL}/api/users/profile`;
  const bearerToken = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  

 

  useEffect(() => {
    const getUser = async () => {
      
      if(bearerToken){

        
        try {
          const response = await axios.get(baseURL, {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          });
          const user = response.data;
          setIsAdmin(user.isAdmin);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Fehler beim Abrufen des Benutzers von der API", error);
        }
        

      }
      
    };

    getUser();
  }, []);
  
  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
    
      <header className="w-full flex items-center justify-center">
      
      
        <nav className="hidden sm:hidden md:flex lg:flex gap-4 w-full justify-end ">
        
          
          {/* REDERING ADMINISTRATION ONLY WHEN 'isAdmin: true' */}

          {isAdmin ? (
            <>
              <ul className="flex gap-6 items-center">
                <li className="md:hover:scale-110" >
                  <Link to="/Bookingplan" className="navigationLink">
                    bookingplan
                  </Link>
                </li>
                <li className="md:hover:scale-110" >
                  <Link to="/Reservation" className="navigationLink">
                    reservation
                  </Link>
                </li>
                <li className="md:hover:scale-110" >
                  <Link to="/Favoriten" className="navigationLink">
                  favorites
                  </Link>
                </li>
                <li className="md:hover:scale-110" >
                  <Link to="/Administration" className="navigationLink">
                    administration
                  </Link>
                </li>
              </ul>
              <Link to="/Profil" >
                <img
                  src="/src/assets/ProfilPlaceholder.jpeg"
                  alt=""
                  className="w-[120px] h-[120px] rounded-full"
                />
              </Link>
            </>
          ) : (
            <>
              <ul className="flex gap-6 items-center">
                <li className="md:hover:scale-110" >
                  <Link to="/Bookingplan" className="navigationLink">
                    bookingplan
                  </Link>
                </li>
                <li className="md:hover:scale-110" >
                  <Link to="/Reservation" className="navigationLink">
                    reservation
                  </Link>
                </li>
                <li className="md:hover:scale-110" >
                  <Link to="/Favoriten" className="navigationLink">
                    favoriten
                  </Link>
                </li>
              </ul>
              <Link to="/Profil" >
                <img
                  src="/src/assets/ProfilPlaceholder.jpeg"
                  alt=""
                  className="w-[120px] h-[120px] rounded-full"
                />
              </Link>
            </>
          )}
          
          
        </nav>
        
            <Burgermenu user={users} />
          
       
      </header>
      
      
    </>
  );
};
