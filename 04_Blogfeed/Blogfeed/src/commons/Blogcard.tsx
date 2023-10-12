import React from "react";
import { Link } from "react-router-dom";

type BlogcardsProps = {
  id: number;
  title: string;
  desc: string;
  date: string;
  image: string;
};

function Blogcard({ id, title, desc, date, image }: BlogcardsProps) {
  return (
    <div className="flex flex-col lg:flex-row p-5 pt-24 justify-center items-center bg-slate-100">
      <div className="flex w-full sm:w-1/2 h-[300px]">
        <img src={image} alt={title} className="w-full h-auto" />
      </div>
      <div className="bg-slate-100 blogcard p-5 w-full sm:w-1/2">
        <h3 className="H3">{title}</h3>
        <br />
        <p className="text-gray-700">{desc}</p>
        <br />
        <button className="bluebutton">
          <Link to={`/post/${id}`}>Mehr Erfahren</Link>
        </button>
        <br />
        <hr />
        <p>
          Erstellt am: <span className="text-blue-500"> {date}</span>
        </p>
      </div>
    </div>
  );
}

export default Blogcard;
