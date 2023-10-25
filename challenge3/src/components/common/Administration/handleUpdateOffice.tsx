import React, { useState, useEffect } from "react";
import { Office } from "../../../types/types";
import axios from "axios";
import { API_URL } from "../../../config/config";

export const UpdateOffice: React.FC = () => {
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);
  const [updateData, setUpdateData] = useState<{
    name: string;
    columns: number;
    rows: number;
  } | null>(null);
  const [offices, setOffices] = useState<Office[]>([]);
  const [message, setMessage] = useState<{
    content: string;
    type: "success" | "error";
  } | null>(null);

  //all offices
  useEffect(() => {
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
        /**/
      }
    };

    fetchOffices();
  }, []);

  //update
  const handleUpdateOffice = async () => {
    if (!selectedOffice || !updateData) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/api/admin/offices/${selectedOffice.id}`,
        updateData,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage({
        content: "Bürostruktur erfolgreich aktualisiert!",
        type: "success",
      });
    } catch (error: any) {
      setMessage({
        content:
          "Fehler beim Aktualisieren des Büros, überprüfen sie ob sich in den vorgegeben Reihen und Spalten schon Tische befinden",
        type: "error",
      });
    }
  };

  return (
    <div className="forminput bg-slate-200 p-3 rounded-lg my-3">
      <h3 className="H3">Büro aktualisieren</h3>

      <label>
        <b>Büro zum Aktualisieren auswählen:</b>
        <select
          className="inputfield mt-2"
          onChange={(e) => {
            const office = offices.find((o) => o.id === e.target.value);
            setSelectedOffice(office || null);
            setUpdateData(
              office
                ? {
                    name: office.name,
                    columns: office.columns,
                    rows: office.rows,
                  }
                : null
            );
          }}
        >
          <option value="">Büro auswählen</option>
          {offices.map((office) => (
            <option key={office.id} value={office.id}>
              {office.name}
            </option>
          ))}
        </select>
        <p>
          Wichtig! Es ist nicht möglich Reihen und Spalten zu Überschreiben die
          schon vollständig besetzt sind. Es müssen vorher die Tische einzeln
          gelöscht werden bevor man reduzieren kann. Die Buchungen für den User
          verschwinden dann.
        </p>
      </label>

      {selectedOffice && (
        <>
          <label className="block mt-4">
            <b>Name:</b>
            <input
              className="inputfield mt-2"
              type="text"
              value={updateData?.name || ""}
              onChange={(e) =>
                setUpdateData((prev) => ({ ...prev!, name: e.target.value }))
              }
            />
          </label>
          <label className="block mt-4">
            <b>Columns:</b>
            <input
              className="inputfield mt-2"
              type="number"
              value={updateData?.columns || 0}
              onChange={(e) =>
                setUpdateData((prev) => ({
                  ...prev!,
                  columns: parseInt(e.target.value),
                }))
              }
            />
          </label>
          <label className="block mt-4">
            <b>Rows:</b>
            <input
              className="inputfield mt-2"
              type="number"
              value={updateData?.rows || 0}
              onChange={(e) =>
                setUpdateData((prev) => ({
                  ...prev!,
                  rows: parseInt(e.target.value),
                }))
              }
            />
          </label>
          <button className="blueButton" onClick={handleUpdateOffice}>
            Büro aktualisieren
          </button>
          <br />
          {message && (
            <div
              className={`bg-white p-3 rounded-sm border-4 border-blue-500 alert ${
                message.type === "success" ? "alert-success" : "alert-error"
              }`}
            >
              {message.content}
            </div>
          )}
        </>
      )}
    </div>
  );
};
