import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
//impor from socketConf file
import socket from "../socketConf";

const Home = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [pets, setPets] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/pets");
      const data = await response.json();
      const sortedPets = data.sort((a, b) => a.type.localeCompare(b.type));
      setPets(sortedPets);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  fetchData();

  //socketIO

  function onConnect() {
    setIsConnected(true);
  }

  function onDisconnect() {
    setIsConnected(false);
  }

  const handlePetsUpdated = (updatedPets) => {
    console.log("updatedPets:", updatedPets);
    setPets(updatedPets);
  };

  useEffect(() => {
    //verifies that the socket is connected
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("petUpdated", handlePetsUpdated);
    socket.onAny((eventName, ...args) => {
      console.log(eventName, args);
    });

    return () => {
      console.log("unmounting");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("petsUpdated", handlePetsUpdated);
    };
  }, []);

  return (
    <div>
      <header>
        <h1>Pet Shelter</h1>
        <Link
          to="/pets/new"
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          Add a new pet to shelter
        </Link>
      </header>
      <h3>These pets are looking for a good home</h3>
      <table>
        <thead key="thead">
          <tr key="header">
            <th key="name">Name</th>
            <th key="type">Type</th>
            <th key="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(pets) &&
            pets.map((pet) => (
              <tr key={pet._id}>
                <td>{pet.name}</td>
                <td>{pet.type}</td>
                <td>
                  <Link key={pet._id + "details"} to={`/pets/${pet._id}`}>
                    Details
                  </Link>
                  <Link key={pet._id + "edit"} to={`/pets/${pet._id}/edit`}>
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
