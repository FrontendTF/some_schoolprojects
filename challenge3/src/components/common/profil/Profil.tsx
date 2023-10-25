import React, { ChangeEvent, useEffect, useState } from "react";
import { Pageheader } from "../Pageheader";
import { LogoutButton } from "../LogoutButton";
import axios from "axios";
import { API_URL } from "../../../config/config";

const baseURL = `${API_URL}/api/users`;

export const Profil = () => {
  const [user, setUser] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    department: "",
    email: "",
    password: "",
  });
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    // GET Request, um Benutzerdaten vom Server zu laden
    if (token) {
      axios
        .get(`${baseURL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setUserId(response.data.id);
          setFormData({
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            department: response.data.department,
            email: response.data.email,
            password: "",
          });
        });
    }
  }, [token]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === "department") {
      setSelectedDepartment(value);
    }
  };

  const handleEditButtonClick = () => {
    setEditMode(true);
  };

  const handleEditAbot = () => {
    setEditMode(false);
  };

  const handleSaveButtonClick = () => {
    setFormData({ ...formData, department: selectedDepartment });
    axios
      .put(`${baseURL}/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        //console.log('Server Response:', response.data);
        setUser(response.data);
        setEditMode(false);
        alert("Deine Daten wurden erfolgreich aktualisiert!");
      })
      .catch((error) => {
        console.error("Fehler beim Speichern der Daten:", error);
        alert(
          "Fehler beim aktualisieren deiner Daten. Vergewissere dich, dass alle Felder ausgefüllt sind."
        );
      });
  };

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
      <div>
        {user ? (
          editMode ? (
            <section className="">
              <div className="w-full h-screen relative overflow-hidden">
                <img
                  src="/src/assets/OFFICEBackground.jpeg"
                  alt="Office"
                  className="w-full h-full object-cover absolute -z-10"
                />
                <div className="absolute inset-0 bg-white bg-opacity-50 -z-10"></div>

                <div className="formbg">
                  <div className="forminput">
                    <h2 className="H2 uppercase"> Profil</h2>
                    <form className="forminput">
                      <label>
                        Vorname: <br />
                        <input
                          type="text"
                          name="firstname"
                          value={formData.firstname}
                          onChange={handleInputChange}
                          className="inputfield"
                        />
                      </label>
                      <label>
                        Nachname: <br />
                        <input
                          type="text"
                          name="lastname"
                          value={formData.lastname}
                          onChange={handleInputChange}
                          className="inputfield"
                        />
                      </label>
                      <label>
                        E-Mail: <br />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="inputfield"
                        />
                      </label>
                      <label>
                        Department: <br />
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          className="inputfield"
                        >
                          <option value="CodingSchool">CodingSchool</option>
                          <option value="Diamir">Diamir</option>
                          <option value="WebundSoehne">WebundSoehne</option>
                          <option value="DarwinsLab">DarwinsLab</option>
                          <option value="DeepDive">DeepDive</option>
                          <option value="TailoredApps">TailoredApps</option>
                        </select>
                      </label>

                      <label>
                        Neues/Altes Password: <br />
                        <input
                          type="password"
                          name="password"
                          required
                          onChange={handleInputChange}
                          autoComplete="off"
                          className="inputfield"
                        />
                      </label>
                    </form>
                    <button
                      onClick={handleSaveButtonClick}
                      className="blueButton"
                    >
                      Speichern
                    </button>
                    <button onClick={handleEditAbot} className="blueButton">
                      abbrechen
                    </button>
                    <LogoutButton />
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section>
              <div className="w-full h-screen relative overflow-hidden">
                <img
                  src="/src/assets/OFFICEBackground.jpeg"
                  alt="Office"
                  className="w-full h-full object-cover absolute -z-10"
                />
                <div className="absolute inset-0 bg-white bg-opacity-50 -z-10"></div>

                <div className="formbg p-6 rounded-lg shadow-md">
                  <div className="forminput">
                    <h2 className="H2 uppercase"> Profil</h2>
                    <div className="profile-info space-y-4">
                      <span>
                        Vorname: <br />
                        <p className="spanProfil">{user.firstname}</p>
                      </span>
                      <span>
                        Nachname: <br />
                        <p className="spanProfil">{user.lastname}</p>
                      </span>
                      <span>
                        Department: <br />
                        <p className="spanProfil">{user.department}</p>
                      </span>
                      <span>
                        E-Mail: <br />
                        <p className="spanProfil">{user.email}</p>
                      </span>
                      <span>
                        Passwort: <br />
                        <p className="spanProfil">*******</p>
                      </span>
                    </div>

                    <button
                      onClick={handleEditButtonClick}
                      className="blueButton"
                    >
                      Edit
                    </button>

                    <LogoutButton />
                  </div>
                </div>
              </div>
            </section>
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};
