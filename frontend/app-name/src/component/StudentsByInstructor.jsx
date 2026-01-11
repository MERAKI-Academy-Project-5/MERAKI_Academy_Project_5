import { useEffect, useState } from "react";
import "./Student.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const StudentsByInstructor = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const { userid } = useParams();

  useEffect(() => {
  axios
      .get(
        `http://localhost:5000/courses/getDitinctStudentsByInstructorId/instructor/disticts/${userid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        console.log(result.data.students);
        setStudents(result.data.students);
      })
      .catch((err) => console.log(err));
  }, [students]);

  const deleteUserById = (id) => {
    console.log(id);
    
  axios
    .delete(`http://localhost:5000/users/deleteUserById/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((result) => {
      setStudents((prev) =>
        prev.filter((student) => student._id !== id))
    })
    .catch((err) => {
      console.log(err);
    });
};


  return (
    <div className="students-page">
      <div className="students-grid">
        {students && students.map((student) => (
          <div className="student-card" key={student.id}>
            <img src={student.image} alt={student.name} />

            <h3>{student.name}</h3>
            <p>
              {student.firstname} {student.lastname}
            </p>
            <p>
              {student.email}
            </p>

            <div className="actions">
              <button
                className="view"
                onClick={() => navigate(`/profile/${student.id}`)}
              >
                View
              </button>
              <button className="block" onClick={() => deleteUserById(student.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsByInstructor;
