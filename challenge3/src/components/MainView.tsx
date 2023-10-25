import React, { useEffect, useState } from "react";
import { SignUp } from "../authentification/SignUp";
import { SignIn } from "../authentification/SignIn";
import { Homescreen } from "./common/Homescreen/Homescreen";
import { User } from "../types/types";
import { useGetSignUp } from "../hooks/useGetSignUp";
import { useGetSignIn } from "../hooks/useGetSignIn";
import { Bookingrooms } from "./Booking/Bookingrooms";
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import { TokenStorage } from "../authentification/TokenStorage";
import { OfficeRoom } from "./Booking/OfficeRoom";
import Modal from "react-modal";
import { Profil } from "./common/profil/Profil";
import { Reservation } from "./common/reservation/Reservation";
import { Favoriten } from "./common/favoriten/Favoriten";
import { Administration } from "./common/Administration/Administration";

type UserProp = {
  user: User;
};

export const MainView = ({ user }: UserProp) => {
  Modal.setAppElement("#root");
  const { mutate: signUp } = useGetSignUp();
  const { mutate: signIn } = useGetSignIn();
  const [, setCurrentUser] = useState<User | null>(null);

  return (
    <>
      <BrowserRouter>
        <TokenStorage />
        <Routes>
          <Route path="Login" index element={<SignIn />} />
          <Route path="Registration" element={<SignUp />} />
          <Route path="Home" element={<Homescreen users={user} />} />
          <Route path="Bookingplan" element={<Bookingrooms />} />
          <Route path="OfficeRoom/:officeId" element={<OfficeRoom />} />
          <Route path="Home" element={<Homescreen users={user} />} />
          <Route path="Profil" element={<Profil />} />
          <Route path="Reservation" element={<Reservation />} />
          <Route path="Favoriten" element={<Favoriten />} />
          <Route path="Administration" element={<Administration />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
