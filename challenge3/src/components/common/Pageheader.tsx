import React from "react";
import DIAMIR_Logo from "../../assets/DIAMIR_Logo.png";
import { Navigation } from "./navigation/Navigation";
import { User } from "../../types/types";
import { Link } from "react-router-dom";

type UserProps = {
  users: User;
};

export const Pageheader = ({ users }: UserProps) => {
  return (
    <>
      <section className="bg-blue-500 p-5 flex items-center sticky top-0 z-10" >
        <div className="w-2/5 sm:w-[250px]">
          <Link to="/Home"> <img src={DIAMIR_Logo} alt="Logo" /></Link>
         
        </div>
        {/* Navigation */}
        <Navigation users={users} />
      </section>
    </>
  );
};
