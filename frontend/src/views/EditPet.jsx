import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditPet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const EditPet = () => {
  const { id } = useParams();

  const [pet, setPet] = useState({});
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    // Fetch pet details by ID
    const fetchPetDetails = async () => {
      try {
        const response = await axios.get(
          `https://pet-shelter-9wau.onrender.com/api/pets/${id}`
        );
        setPet(response.data);
        setName(response.data.name);
        setType(response.data.type);
        setDescription(response.data.description);
        setSkills(response.data.skills);
        setLikes(response.data.likes);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      }
    };

    fetchPetDetails();
  }, [id]);

  const updatePet = async () => {
    try {
      const updatedPet = {
        name,
        type,
        description,
        skills,
        likes,
      };

      await axios.put(
        `https://pet-shelter-9wau.onrender.com/api/pets/${id}`,
        updatedPet
      );
      // Handle success or redirection
      window.location.href = "/";
    } catch (error) {
      console.error("Error updating pet:", error);
      alert("Error updating pet");
    }
  };

  return (
    <div>
      <header>
        <h2>Edit Pet</h2>
      </header>
      <div className="edit-container">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            minLength={3}
          />
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Type"
            required
            minLength={3}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            minLength={3}
          />
          <button onClick={updatePet}>
            <FontAwesomeIcon icon={faEdit} />
            Edit Pet
          </button>
        </div>
        {/* Render skills input fields */}
        <div>
          <h3>Skills (optional)</h3>
          <input
            type="text"
            value={skills[0]}
            onChange={(e) => setSkills([e.target.value, skills[1], skills[2]])}
            placeholder="Skill 1"
          />
          <input
            type="text"
            value={skills[1]}
            onChange={(e) => setSkills([skills[0], e.target.value, skills[2]])}
            placeholder="Skill 2"
          />
          <input
            type="text"
            value={skills[2]}
            onChange={(e) => setSkills([skills[0], skills[1], e.target.value])}
            placeholder="Skill 3"
          />
        </div>
      </div>
    </div>
  );
};

export default EditPet;
