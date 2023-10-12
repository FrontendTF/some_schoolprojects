import { useState } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import { Blogs } from "./pages/Blogs";
import { Contact } from "./pages/Contact";
import { NoPage } from "./pages/NoPage";

function App() {
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [bmi, setBmi] = useState<number>(0);

  const weightinput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(event.target.value));
  };
  const heightinput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(event.target.value));
  };

  const calculateBmi = () => {
    let heightInMeters = height / 100; // convert height to meters from centimeters
    let calculatedBmi = weight / (heightInMeters * heightInMeters);
    setBmi(calculatedBmi);
  };
  return (
    <>
      <div className="flex flex-col gap-5 justify-center items-center bg-blue-950 text-white">
        <h1 className="text-4xl font-bold">BMI Tracker</h1>
        <div className="flex gap-5">
          <div className="flex flex-col">
            <h2>Weight (in kg)</h2>
            <input
              className="bg-white rounded-full p-2 text-black"
              type="number"
              placeholder="weight"
              onChange={weightinput}
            />
          </div>
          <div>
            <h2>Height (in cm)</h2>
            <input
              className="bg-white rounded-full p-2 text-black"
              type="number"
              placeholder="height"
              onChange={heightinput}
            />
          </div>
        </div>
        <button
          className="bg-gray-200 rounded-full py-3 px-5 text-gray-800"
          onClick={calculateBmi}
        >
          Calculate BMI
        </button>
        <p>Your BMI is: {bmi}</p>

        <br />
        <br />
        <br />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
