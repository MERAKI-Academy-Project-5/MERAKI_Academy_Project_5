import { useEffect, useState } from "react";
import "./Instructors.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Instructors = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setUsers(result.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [instructors]);

  useEffect(() => {
    const filteredInstructors = users.filter((user) => Number(user.role) === 3);
    setInstructors(filteredInstructors);
  }, [users]);

  const deleteUserById = (id) => {
    console.log(id);
    
  axios
    .delete(`http://localhost:5000/users/deleteUserById/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((result) => {
      setInstructors((prev) =>
        prev.filter((instructors) => instructors._id !== id))
    })
    .catch((err) => {
      console.log(err);
    });
};
console.log(instructors);

  return (
    <div className="students-page">
      <div className="students-grid">
        {instructors && instructors.map((instructor) => (
          <div className="student-card" key={instructor.id}>
            <img src={instructor.image} alt={instructor.name} />

            <h3>{instructor.name}</h3>
            <p>
              {instructor.firstname} {instructor.lastname}
            </p>

            <div className="actions">
              <button
                className="view"
                onClick={() => navigate(`/profile/${instructor.id}`)}
              >
                View
              </button>
              <button className="block" onClick={() => deleteUserById(instructor.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
