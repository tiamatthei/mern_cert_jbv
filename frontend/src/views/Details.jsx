import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";
import io from "socket.io-client";

const Details = () => {
  const [pet, setPet] = useState({});
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const { id } = useParams();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketConnection = io(process.env.REACT_APP_SOCKET_SERVER_URL);

    setSocket(socketConnection);

    return () => {
      if (socketConnection) {
        socketConnection.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const fetchPetDetails = async () => {
      try {
        const response = await fetch(`https://pet-shelter-9wau.onrender.com/api/pets/${id}`);
        const data = await response.json();
        setPet(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      }
    };

    fetchPetDetails();

    const handlePetsUpdated = (updatedPets) => {
      // Handle the update only if the updated pet's ID matches the current pet's ID
      console.log("updatedPets:", updatedPets);
      if (updatedPets.some((p) => p._id === id)) {
        fetchPetDetails();
      }
    };

    socket.on("petsUpdated", handlePetsUpdated);

    return () => {
      socket.off("petsUpdated", handlePetsUpdated);
    };
  }, [id, socket]);

  const handleLike = async () => {
    try {
      await fetch(`https://pet-shelter-9wau.onrender.com/api/pets/${id}/like`, { method: "PUT" });
      setPet((prevPet) => ({
        ...prevPet,
        likes: prevPet.likes + 1,
      }));
      setLiked(true); // Set liked state to true
    } catch (error) {
      console.error("Error liking pet:", error);
    }
  };

  const handleAdopt = async () => {
    try {
      var deleted = await fetch(`https://pet-shelter-9wau.onrender.com/api/pets/${id}/adopt`, { method: "DELETE" });
      // Handle successful deletion, e.g., redirect to another page
      if (deleted.status === 200) {
        window.location.href = "/";
        socket.emit("petsUpdated"); // Emit event to update pets in Home
      }
    } catch (error) {
      console.error("Error adopting pet:", error);
    }
  };

  return (
    <div className="pet-details">
      <h2>Pet Details</h2>
      <div className="pet-info">
        <p>
          <strong>Name:</strong> {pet.name}
        </p>
        <p>
          <strong>Type:</strong> {pet.type}
        </p>
        <p>
          <strong>Description:</strong> {pet.description}
        </p>
      </div>

      {/* Render pet skills */}
      {pet.skills && pet.skills.length > 0 && (
        <div className="pet-skills">
          <p>
            <strong>Skills:</strong>
          </p>
          <ul>
            {pet.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Render like button */}
      <div className="like-section">
        <button onClick={handleLike} disabled={liked}>
          {liked ? "Liked" : "Like"}
        </button>
        <p>
          <strong>Likes:</strong> {pet.likes}
        </p>
      </div>

      {/* Add an adopt button with functionality to delete the pet from the database */}
      <button onClick={handleAdopt} className="adopt-button">
        Adopt
      </button>
    </div>
  );
};

export default Details;
