import { useEffect, useState } from "react";

export default function PetList({ currentUser }) {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/pets")
      .then((res) => res.json())
      .then((data) => setPets(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="page-container">
      <h2>Available Pets</h2>
      <ul>
        {pets.map((p) => (
          <li key={p.id}>
            {p.name} - {p.type}
          </li>
        ))}
      </ul>

      {currentUser?.role === "ADMIN" && (
        <button onClick={() => alert("Add Pet functionality here")}>Add Pet</button>
      )}
    </div>
  );
}
