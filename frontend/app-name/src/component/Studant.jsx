import "./Student.css";

const students = [
  {
    id: 1,
    name: "Ahmed Ali",
    email: "ahmed@gmail.com",
    course: "React Basics",
    status: "Active",
  },
  {
    id: 2,
    name: "Sara Mohammad",
    email: "sara@gmail.com",
    course: "UI/UX Design",
    status: "Blocked",
  },
  {
    id: 3,
    name: "Omar Khaled",
    email: "omar@gmail.com",
    course: "Node.js",
    status: "Active",
  },
];

const Students = () => {
  return (
    <div className="students-page">
      {/* Header */}
      <div className="students-header">
        <h1>Students</h1>
        <input type="text" placeholder="Search student..." />
      </div>

      {/* Students Grid */}
      <div className="students-grid">
        {students.map((student) => (
          <div className="student-card" key={student.id}>
            <div className="avatar">
              {student.name.charAt(0)}
            </div>

            <h3>{student.name}</h3>
            <p className="email">{student.email}</p>
            <p className="course">{student.course}</p>

            <span
              className={
                student.status === "Active"
                  ? "status active"
                  : "status blocked"
              }
            >
              {student.status}
            </span>

            <div className="actions">
              <button className="view">View</button>
              <button className="block">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
