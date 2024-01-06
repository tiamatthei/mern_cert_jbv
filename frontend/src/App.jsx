import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPet from "./views/AddPet";
import Home from "./views/Home";
import Details from "./views/Details";
import EditPet from "./views/EditPet"; // Import the EditPet component

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/pets/new" element={<AddPet />} />
        <Route exact path="/pets/:id" element={<Details />} />
        <Route exact path="/pets/:id/edit" element={<EditPet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
