import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const TokenStorage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refresh = localStorage.getItem("refresh");
    if (token && refresh) {
      navigate("/Home");
    } else {
      navigate("/Login");
    }
  }, []);

  return null;
};
