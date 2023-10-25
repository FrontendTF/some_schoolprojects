import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config/config";

export const CreateOffice: React.FC = () => {
  const [officeData, setOfficeData] = useState({
    name: "",
    columns: 0,
    rows: 0,
  });
  const [notification, setNotification] = useState<string | null>(null);

  const handleCreateOffice = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/api/admin/offices`, officeData, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setNotification("Büro wurde erfolgreich erstellt!");
    } catch (error) {
      setNotification("Fehler beim Erstellen des Büros.");
    }
  };

  return (
    <div className="forminput bg-slate-200 p-3 rounded-lg my-3">
      <h3 className="H3">Neues Büro erstellen</h3>
      <label>
        <b> Name: </b>
        <input
          className="inputfield"
          type="text"
          value={officeData.name}
          onChange={(e) =>
            setOfficeData({ ...officeData, name: e.target.value })
          }
        />
      </label>
      <br />
      <label>
        <b>Spalten: </b>
        <input
          className="inputfield"
          type="number"
          value={officeData.columns}
          onChange={(e) =>
            setOfficeData({ ...officeData, columns: Number(e.target.value) })
          }
        />
      </label>
      <br />
      <label>
        <b>Reihen: </b>
        <input
          className="inputfield"
          type="number"
          value={officeData.rows}
          onChange={(e) =>
            setOfficeData({ ...officeData, rows: Number(e.target.value) })
          }
        />
      </label>
      <br />
      <button className="blueButton" onClick={handleCreateOffice}>
        Erstellen
      </button>
      {notification && (
        <p
          className={`mt-2 p-2 rounded ${
            notification.includes("erfolgreich") ? "bg-green-200" : "bg-red-200"
          }`}
        >
          {notification}
        </p>
      )}
    </div>
  );
};
