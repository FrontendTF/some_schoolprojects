import React from "react";
import data from "../components/daten";
import { Link } from "react-router-dom";

type BlogcardsProps = {
  id: number;
  title: string;
  desc: string;
  date: string;
  image: string;
};

function Blogcards({ id, title, desc, date, image }: BlogcardsProps) {
  return (
    <div className="flex flex-col p-5">
      <div>
        <img src={image} alt={title} />
      </div>
      <div className="bg-slate-100 blogcard p-5">
        <h3 className="H3">{title}</h3>
        <br />
        <p className="text-gray-700">{desc}</p>
        <br />
        <Link to={`/post/${id}`} className="bluebutton">
          Mehr Erfahren
        </Link>

        <br />
        <hr />
        <p>
          Erstellt am: <span className="text-blue-500"> {date}</span>
        </p>
      </div>
    </div>
  );
}

export default Blogcards;
