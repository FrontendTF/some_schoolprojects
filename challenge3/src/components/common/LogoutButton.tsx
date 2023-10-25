import React from "react";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    navigate("/Login");
  };

  return <button onClick={logout} className="blueButton">LOGOUT</button>;
};
