import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../config/config";
import { Office } from "../../../types/types";

export const CreateDesk: React.FC = () => {
  const [deskData, setDeskData] = useState({
    label: "",
    office: "",
    equipment: [""],
  });

  const [offices, setOffices] = useState<Office[]>([]);
  const [message, setMessage] = useState<{
    content: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    //beim laden abrufen
    const fetchOffices = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/offices`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setOffices(response.data);
      } catch (error) {
        console.error("Error fetching offices:", error);
      }
    };

    fetchOffices();
  }, []);

  const handleCreateDesk = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Sending desk data:", deskData);
      await axios.post(`${API_URL}/api/admin/desks`, deskData, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage({ content: "Desk erfolgreich erstellt!", type: "success" });
    } catch (error) {
      setMessage({
        content:
          "Füllen sie alles aus und überprüfen sie ob im jeweiligen Office in den Reihen oder Spalten noch Platz für einen Desk ist, wenn nicht updaten sie das Office",
        type: "error",
      });
    }
  };

  return (
    <div className="forminput bg-slate-200 p-3 my-3">
      <h3 className="H3">Tisch erstellen</h3>
      <label>
        <b>Tisch Label: </b>
        <input
          className="inputfield"
          type="text"
          value={deskData.label}
          onChange={(e) => setDeskData({ ...deskData, label: e.target.value })}
        />
      </label>
      <br />
      <label>
        <b>Büro auswählen:</b>
        <select
          className="inputfield"
          value={deskData.office}
          onChange={(e) => setDeskData({ ...deskData, office: e.target.value })}
        >
          {offices.map((office) => (
            <option key={office.id} value={office.id}>
              {office.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        <b>Ausrüstung: </b>
        <input
          className="inputfield"
          type="text"
          value={deskData.equipment.join(", ")}
          placeholder="HDMI, USB C, Monitor"
          onChange={(e) => {
            const equipments = e.target.value
              .split(",")
              .map((item) => item.trim());
            setDeskData({ ...deskData, equipment: equipments });
          }}
        />
      </label>
      <br />
      <button className="blueButton" onClick={handleCreateDesk}>
        Tisch hinzufügen
      </button>
      {message && (
        <div
          className={`mt-4 p-4 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {message.content}
        </div>
      )}
    </div>
  );
};
