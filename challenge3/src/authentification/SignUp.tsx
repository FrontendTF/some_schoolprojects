import React, { useState } from "react";
import { Pageheader } from "../components/common/Pageheader";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Registrationdata } from "../types/types";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetSignUp } from "../hooks/useGetSignUp";

const schema = yup.object().shape({
  firstname: yup.string().required("Geben sie den Vornamen ein"),
  lastname: yup.string().required("Geben sie den Nachnamen ein"),
  email: yup.string().required("Geben sie eine E-Mail ein"),
  password: yup.string().required("Geben sie ein Passwort ein"),
  department: yup
    .string()
    .required("Wählen sie eine Abteilung")
    .notOneOf([""], "Eine Abteilung muss ausgewählt werden"),
});

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Registrationdata>({
    resolver: yupResolver(schema),
  });

  const { mutate: signUp } = useGetSignUp();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showUnSuccess, setShowUnSuccess] = useState(false);

  const onSubmit = (data: Registrationdata) => {
    setShowSuccess(false);
    setShowUnSuccess(false);

    signUp(data, {
      onSuccess: () => {
        setShowSuccess(true);
      },
      onError: () => {
        setShowUnSuccess(true);
      },
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
      
      <section >
        <div className="bg-div">
        <img
                 src="/src/assets/OFFICEBackground.jpeg"
                 alt="Office"
                  className="bg-image"
                />
               <div className="bg-oppacity"></div>

               <div className="formbg">
        <div className="forminput">
          <h2 className="H2">Registration</h2>
          <form
            className="flex flex-col gap-3 sm:gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="labeltext">
              <span>Vorname</span>
              <input
                {...register("firstname")}
                className="inputfield labeltext"
                type="text"
              />
              {errors.firstname && <p>{errors.firstname.message}</p>}
            </label>

            <label className="labeltext">
              <span>Nachname</span>
              <input
                {...register("lastname")}
                className="inputfield"
                type="text"
              />
              {errors.lastname && <p>{errors.lastname.message}</p>}
            </label>

            <label className="labeltext">
              <span>Abteilung</span>
              <select
                {...register("department")}
                defaultValue=""
                className="inputfield"
              >
                <option value="" disabled>
                  Wählen Sie eine Abteilung aus
                </option>
                <option value="CodingSchool">CodingSchool</option>
                <option value="Diamir">Diamir</option>
                <option value="WebundSoehne">WebundSoehne</option>
                <option value="DarwinsLab">DarwinsLab</option>
                <option value="DeepDive">DeepDive</option>
                <option value="TailoredApps">TailoredApps</option>
              </select>
              {errors.department && <p>{errors.department.message}</p>}
            </label>

            <label className="labeltext">
              <span>E-Mail</span>
              <input
                {...register("email")}
                className="inputfield"
                type="email"
                placeholder="max.mustermann@gmail.com"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </label>
            <label className="labeltext">
              <span>Passwort </span>
              <input
                {...register("password")}
                className="inputfield"
                type="password"
                placeholder="password"
              />
              {errors.password && <p>{errors.password.message}</p>}
            </label>
            <button className="blueButton" type="submit">
              Registrieren
            </button>
            <p
              className="errortext"
              id="successfulregistration"
              hidden={!showSuccess}
            >
              Ihr Account wurde erstellt &#128077;, sie können nun zurück zum
              Login gehen und sich anmelden
            </p>
            <p
              className="errortext"
              id="successfulregistration"
              hidden={!showUnSuccess}
            >
              Bei der Registrierung ist etwas schief gelaufen &#x1F44E;, diese
              E-Mail wird bereits verwendet
            </p>
          </form>
          <button className="blueButton">
            <Link to="/Login">Zurück zum Login</Link>
          </button>
        </div>
        </div>


        </div>
        
      </section>
    </>
  );
};
