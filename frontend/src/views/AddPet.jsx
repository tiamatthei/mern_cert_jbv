import React, { useState } from "react";
import "./AddPet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const AddPet = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    skills: ["", "", ""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillChange = (e, index) => {
    const newSkills = [...formData.skills];
    newSkills[index] = e.target.value;
    setFormData({ ...formData, skills: newSkills });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/pets/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Pet added:", data);
      // Redirect to home page after successful creation
      window.location.href = "/";
    } catch (error) {
      console.error("Error adding pet:", error);
      alert("Error adding pet");
    }
  };

  return (
    <>
      <header>
        <h1>Pet Shelter</h1>
        <Link to="/" className="back-link">
          Back to Home
        </Link>
      </header>
      <h3>Know a pet needing a home?</h3>
      <main>
        {/* Add the Link component with the "to" prop set to "/" */}
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="left-column">
              <label>
                Pet Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  minLength={3}
                />
              </label>
              <br />
              <label>
                Pet Type:
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  minLength={3}
                />
              </label>
              <br />
              <label>
                Pet Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  minLength={3}
                />
              </label>
              <button type="submit">
                <FontAwesomeIcon icon={faUpload} />
                &ensp; Add Pet
              </button>
            </div>
            <div className="right-column">
              <label>Skills (optional):</label>
              {formData.skills.map((skill, index) => (
                <div key={index}>
                  <label>{`Skill ${index + 1}:`}</label>
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(e, index)}
                  />
                </div>
              ))}
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default AddPet;
