import { useNavigate } from "react-router-dom";

export default function PetCard({ pet }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/pets/${pet._id}`)}
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "10px",
        margin: "10px",
        cursor: "pointer",
        width: "200px",
      }}
    >
      <img
        src={pet.images[0] || "https://via.placeholder.com/150"}
        alt={pet.name}
        style={{ width: "100%", borderRadius: "10px" }}
      />
      <h3>{pet.name}</h3>
      <p>{pet.breed}</p>
      <p>{pet.age} years | {pet.gender}</p>
      <p>{pet.description?.slice(0, 50)}...</p>
    </div>
  );
}
