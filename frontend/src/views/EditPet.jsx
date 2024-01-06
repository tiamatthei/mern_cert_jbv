import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPet = ({ petId }) => {
  const [pet, setPet] = useState({});
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch pet details by ID
    const fetchPetDetails = async () => {
      try {
        const response = await axios.get(`/api/pets/${petId}`);
        setPet(response.data);
        setName(response.data.name);
        setType(response.data.type);
        setDescription(response.data.description);
        setSkills(response.data.skills);
        setLikes(response.data.likes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pet details:', error);
      }
    };

    fetchPetDetails();
  }, [petId]);

  const updatePet = async () => {
    // Implement logic to update pet details
    // Make a PUT request to update the pet data
    try {
      const updatedPet = {
        name,
        type,
        description,
        skills,
        likes,
      };

      await axios.put(`/api/pets/${petId}`, updatedPet);
      // Handle success or redirection
    } catch (error) {
      console.error('Error updating pet:', error);
    }
  };

  const handleLike = () => {
    // Implement logic to increment likes
    // Update the likes count in the state and backend
    setLikes(likes + 1);
  };

  // Render loading state while fetching pet details
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Pet</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Type"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      {/* Render skills input fields */}
      {/* Render like button */}
      <button onClick={updatePet}>Update Pet</button>
      <button onClick={handleLike}>Like</button>
    </div>
  );
};

export default EditPet;
