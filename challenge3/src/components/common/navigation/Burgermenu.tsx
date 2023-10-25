import React, { useEffect, useState } from "react";
import { push as Menu } from "react-burger-menu";
import "./burgerMenu.css";
import { User } from "../../../types/types";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../config/config";

type BurgerMenuProps = {
  user: User;
};

const Burgermenu = ({ user }: BurgerMenuProps) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const baseURL = `${API_URL}/api/users/profile`;
  const bearerToken = localStorage.getItem("token");

  useEffect(() => {
    const getUser = async () => {
      const bearerToken = localStorage.getItem("token");

      if (!bearerToken) {
        console.error("Bearer Token fehlt!");
        return;
      }
      try {
        const response = await axios.get(baseURL, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
        const user = response.data;
        setIsAdmin(user.isAdmin);
      } catch (error) {
        console.error("Fehler beim Abrufen des Benutzers von der API", error);
      }
    };

    getUser();
  }, []);

  return (
    <div className='sm:inline-block md:hidden lg:hidden'>
        <Menu right >
        <Link to="/Profil"><img src="/src/assets/ProfilPlaceholder.jpeg" alt="" className="w-[120px] h-[120px] rounded-full"/></Link>

          {isAdmin ? (
            <>
            <Link to="/Bookingplan" className="navigationLink">bookingplan</Link>
            <Link to="/Reservation" className="navigationLink">reservation</Link>
            <Link to="/Favoriten" className="navigationLink">favorites</Link>
            <Link to="/Administration" className="navigationLink">administration</Link>
            </>

          ): (
            <>
            <Link to="/Bookingplan" className="navigationLink">bookingplan</Link>
            <Link to="/Reservation" className="navigationLink">reservation</Link>
            <Link to="/Favoriten" className="navigationLink">favoriten</Link>
            </>
                
                    
          )}
            
      </Menu>
    </div>
  );
};

export default Burgermenu;
