import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Room } from "./RoomView";
import axios from "axios";
import { API_URL } from "../../config/config";
import { Desk, Office } from "../../types/types";
import { Pageheader } from "../common/Pageheader";

export const OfficeRoom = () => {
  const { officeId } = useParams<{ officeId: string }>();
  const [officeDetails, setOfficeDetails] = useState<Office | null>(null);
  const [desks, setDesks] = useState<Desk[]>([]);

  useEffect(() => {
    const fetchOfficeDetails = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get<Office>(
        `${API_URL}/api/offices/${officeId}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOfficeDetails(response.data);
      setDesks(response.data.desks || []);
    };

    fetchOfficeDetails();
  }, [officeId]);
  //für kurze ladezeit
  if (!officeDetails) return <div>Loading...</div>;

  //wenn Raum ohne Tisch wegen "Fake Räume"
  if (desks.length === 0) {
    return (
      <div className="H2">In diesem Raum befindet sich derzeit kein Tisch</div>
    );
  }

  return (
    <>
      <Pageheader
        users={{
          id: "",
          firstname: "",
          lastname: "",
          email: "",
          isAdmin: false,
          department: "",
          createdAt: "",
          updatedAt: "",
        }}
      />
      <h2 className="H2">Office Tischübersicht </h2>
      <Room officeDetails={officeDetails} desks={desks} />
    </>
  );
};
