import React from "react";
import logo from "./bloglogo.jpg";
import { Blog_erstellen } from "../pages/Blog_erstellen";
import { Link } from "react-router-dom";

export const Pageheader = () => {
  return (
    <>
      <div className="bg-blue-600 flex fixed w-full py-5 justify-between">
        <div>
          <a
            className="flex gap-3 items-center pl-5"
            href="http://localhost:5173"
          >
            <img src={logo} alt="Logo"></img>
            <h1 className="uppercase text-2xl font-bold text-white">
              csaw Blog
            </h1>
          </a>
        </div>
        <div className="flex ">
          <button className="uppercase text-2xl font-bold text-white pr-5">
            <Link to={`/createBlog`}>Blog erstellen</Link>
          </button>
        </div>
      </div>
    </>
  );
};
