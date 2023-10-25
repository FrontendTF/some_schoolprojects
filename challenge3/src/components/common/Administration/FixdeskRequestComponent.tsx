import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config/config";
import { Booking, Office } from "../../../types/types";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  department: string;
  id: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Desk {
  label: string;
  id: string;
  office: Office;
  bookings: Booking[];
  row: number;
  column: number;
  fixdesk?: {
    id?: string;
    user?: User;
  };
  type: string;
  equipment: string[];
  createdAt: string;
  updatedAt: string;
}

interface FixdeskRequest {
  id: string;
  user: User;
  desk: Desk;
  status: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: User;
}
interface FixdeskComponentProps {}

const FixdeskComponent: React.FC<FixdeskComponentProps> = ({}) => {
  const [allRequests, setAllRequests] = useState<FixdeskRequest[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API_URL}/api/admin/fix-desk-requests`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //not reviewed anzeigen
        const pendingRequests = response.data.filter(
          (request: FixdeskRequest) => request.status === "notreviewed"
        );

        setAllRequests(pendingRequests);
      } catch (error) {
        setError("Es gab ein Problem beim Abrufen der Fixdesk-Anfragen.");
      }
    };

    fetchAllRequests();
  }, []);

  //annehmen
  const approveRequest = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/api/admin/fix-desk-requests`,
        { id: id, status: "approved" },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //liste aktualisieren
      setAllRequests((prevRequests) =>
        prevRequests.filter((request: FixdeskRequest) => request.id !== id)
      );
    } catch (error) {
      setError("Es gab ein Problem beim Genehmigen der Fixdesk-Anfrage.");
    }
  };
  //ablehnen
  const declineRequest = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${API_URL}/api/fixdesk-requests/${id}`,

        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //liste aktualisieren
      setAllRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== id)
      );
    } catch (error) {
      setError("Es gab ein Problem beim Ablehnen der Fixdesk-Anfrage.");
    }
  };

  return (
    <>
      <div className="bg-slate-200">
        <h3 className="H3 text-center">Fixdesk Requests</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="grid gap-3 p-5 md:grid-cols-2 lg:grid-cols-3 ">
          {allRequests.map((request) => (
            <div
              key={request.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px 0",
                backgroundColor: "bisque",
              }}
            >
              <h3>
                Name: {request.user.firstname} {request.user.lastname}
              </h3>
              <p>Email: {request.user.email}</p>
              <p>Office: {request.desk.office.name}</p>
              <p>Department: {request.user.department}</p>
              <p>Desk: {request.desk.label}</p>
              <p>Status: {request.status}</p>

              <button onClick={() => approveRequest(request.id)}>
                &#10004;
              </button>
              <button onClick={() => declineRequest(request.id)}>
                &#10060;
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FixdeskComponent;
