import { useEffect, useState } from "react";
import "./index.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Inputs = {
  firstname: string;
  lastname: string;
  userrole: "Admin" | "User" | "Editor";
  checkboxChecked: boolean;
};

const schema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  userrole: yup
    .string()
    .oneOf(["Admin", "User", "Editor"], "Ungültige Benutzerrolle")
    .required(),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const [submittedData, setSubmittedData] = useState<Inputs[]>([]);
  useEffect(() => {
    const storedData = localStorage.getItem("submittedData");
    if (storedData) {
      setSubmittedData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("submittedData", JSON.stringify(submittedData));
  }, [submittedData]);

  const onSubmit = (data: Inputs) => {
    console.log(data);
    setSubmittedData((prevData) => [...prevData, data]);
    reset();
  };

  const handleDelete = (index: number) => {
    setSubmittedData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  return (
    <>
      <section className="flex flex-col md:flex-row w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col text-center items-center md:w-1/2 gap-2"
        >
          <h1 className="text-3xl font-bold uppercase text-blue-400">
            User form
          </h1>
          <input
            type="text"
            placeholder="firstname"
            className="inputstyle"
            {...register("firstname")}
          />
          <input
            type="text"
            placeholder="lastname"
            className="inputstyle"
            {...register("lastname")}
          />
          <select {...register("userrole")} className="inputstyle">
            <option value="" disabled selected hidden>
              Userrole
            </option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Editor">Editor</option>
          </select>
          <div>
            <input
              type="checkbox"
              {...register("checkboxChecked")}
              className="mr-2"
            />
            <label htmlFor="checkbox">Checkbox</label>
          </div>
          <button type="submit" className="bluebutton">
            senden
          </button>

          <div>{errors.firstname?.message}</div>
          <div>{errors.lastname?.message}</div>
          <div>{errors.userrole?.message}</div>
        </form>

        {submittedData.length > 0 && (
          <div
            className={`submitted-data ${
              submittedData.length > 7 ? "overflow-y-auto max-h-96" : ""
            }  flex flex-col md:w-1/2 justify-center items-center border-2 border-black h-auto p-5 m-5`}
          >
            {submittedData.map((data, index) => (
              <div key={index} className="w-11/12 border-b-2 border-gray-600">
                <div className="flex justify-between py-2">
                  <div className="flex flex-col">
                    <div className="flex gap-1">
                      <p>{data.firstname}</p>
                      <p> {data.lastname}</p>
                    </div>
                    <div>
                      <p
                        className={`text-lg ${
                          data.checkboxChecked
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        Newsletter {data.checkboxChecked}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-400"
                    >
                      Löschen
                    </button>
                    <p>{data.userrole}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default App;
