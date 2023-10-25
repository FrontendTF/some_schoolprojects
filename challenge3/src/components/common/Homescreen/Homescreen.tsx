import React from "react";
import { Pageheader } from "../Pageheader";
import { User } from "../../../types/types";
import { Link } from "react-router-dom";

type HomescreenProp = {
  users: User;
};

export const Homescreen = ({ users }: HomescreenProp) => {
  return (
    <section>
      <Pageheader users={users} />
      <div className="bg-div">
        <img
          src="/src/assets/OFFICEBackground.jpeg"
          alt="Office"
          className="bg-image"
        />
        <div className="bg-oppacity"></div>
        <div className="flex flex-col relative justify-center items-center p-8">
          <h1 className=" text-center leading-relaxed font-bold text-5xl md:text-6xl md:leading-loose lg:text-7xl lg:leading-relaxed">
            Buche deinen <br /> Arbeitsplatz ganz <br /> einfach
          </h1>
          <br />
          <Link to="/Bookingplan">
            <span className="bg-blue-500 text-white  font-bold uppercase px-4 py-2 rounded-3xl text-5xl md:text-6xl md:hover:scale-125 md:hover:bg-blue-700 lg:text-7xl">
              Hier
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
