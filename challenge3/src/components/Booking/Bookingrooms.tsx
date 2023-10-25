import React, { useState } from "react";
import { useGetAllOffices } from "../../hooks/useGetAllOffices";
import { Link, useNavigate } from "react-router-dom";
import { Pageheader } from "../common/Pageheader";

export const Bookingrooms = () => {
  const { data, isLoading, isError } = useGetAllOffices();
  const navigate = useNavigate();
  const [selectedOffice, setSelectedOffice] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleOfficeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOffice(event.target.value);
  };
  //wenn nigs ausgewählt ist
  const handleContinue = () => {
    if (!selectedOffice) {
      setErrorMessage("Bitte wählen Sie ein Büro aus!");
      return;
    }
    navigate(`/Room?officeId=${selectedOffice}`);
  };

  if (isLoading) return <div>Laden...</div>;
  if (isError || !data) return <div>Fehler beim Laden der Büros</div>;

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
      <div className="w-full h-screen relative overflow-hidden">
        <img
          src="/src/assets/OFFICEBackground.jpeg"
          alt="Office"
          className="w-full h-full object-cover absolute -z-10"
        />
        <div className="absolute inset-0 bg-white bg-opacity-50 -z-10"></div>
        <div className="formbg">
          <h2 className="H2"> Bookingplan</h2>
          <br />
          <div className="forminput">
            <label className="labeltext">
              <span>
                <b>Liste aller Büros</b>
              </span>
              <select
                className="inputfield flex"
                value={selectedOffice}
                onChange={handleOfficeChange}
              >
                <option value="" disabled>
                  Wählen Sie ein Büro aus
                </option>
                {data.map((office, index) => (
                  <option key={index} value={office.id}>
                    {office.name}
                  </option>
                ))}
              </select>
            </label>
            {selectedOffice && (
              <Link to={`/OfficeRoom/${selectedOffice}`}>
                <button className="blueButton" onClick={handleContinue}>
                  Zum Büro
                </button>
              </Link>
            )}
            {errorMessage && <p className="errorText">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </>
  );
};
