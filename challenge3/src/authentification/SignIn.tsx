import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Pageheader } from "../components/common/Pageheader";
import { Logindata } from "../types/types";
import { Link } from "react-router-dom";
import { useGetSignIn } from "../hooks/useGetSignIn";
import { useNavigate } from "react-router-dom";
import { Tokendata } from "../types/types";

const schema = yup.object().shape({
  email: yup.string().required("Geben sie eine E-Mail ein"),
  password: yup.string().required("Geben sie ein Passwort ein"),
});

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Logindata>({
    resolver: yupResolver(schema),
  });

  const { mutate: signIn } = useGetSignIn();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = (data: Logindata) => {
    signIn(data, {
      onSuccess: (response: Tokendata) => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("refresh", response.refresh);
        navigate("/Home");
      },
      onError: () => {
        setLoginError(
          "Ein Fehler ist aufgetreten, überprüfen sie ihre E-Mail und ihr Passwort"
        );
        navigate("/Login");
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

      <section>
        <div className="w-full h-screen relative overflow-hidden">
          <img
            src="/src/assets/OFFICEBackground.jpeg"
            alt="Office"
            className="w-full h-full object-cover absolute -z-10"
          />
          <div className="absolute inset-0 bg-white bg-opacity-50 -z-10"></div>

          <section className="formbg">
            <div className="forminput">
              <h2 className="H2">Login</h2>
              <form
                className="flex flex-col gap-3 sm:gap-5"
                onSubmit={handleSubmit(onSubmit)}
              >
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
                  Login
                </button>
                {loginError && <p className="errortext">{loginError}</p>}
              </form>
              <button className="blueButton">
                <Link to="/Registration">Registrieren</Link>
              </button>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};
