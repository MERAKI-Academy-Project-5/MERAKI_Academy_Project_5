import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setCourses} from "../redux/coursesSlice"
import { useNavigate } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import "./Search.css"
const courses = [
  { id: 1, title: "Web Development" },
  { id: 2, title: "UI / UX Design" },
  { id: 3, title: "Backend Development" },
  { id: 4, title: "Mobile App Development" },
  { id: 5, title: "Data Structures & Algorithms" },
];

const Search = () => {
  const navigate = useNavigate();
 const dispatch = useDispatch();
  //const courses = useSelector((state) => state.courses.courses);
  const [searchValue, setSearchValue] = useState("");
  const [searchCourses, setSearchCourses] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim() === "") {
      setSearchCourses([]);
      return;
    }

    const filteredCourses = courses.filter(course =>
      course.title.toLowerCase().includes(value.toLowerCase())
    );

    setSearchCourses(filteredCourses);
  };

  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search courses..."
        value={searchValue}
        onChange={handleSearch}
      />
 {searchCourses.length > 0 && (
        <ListGroup className="search-results">
           {searchCourses.map(course => (
      <ListGroup.Item  key={course.id}
              onClick={() => navigate(`/courseDetails/${course.id}`)}>  {course.title}</ListGroup.Item>
    ))}
    </ListGroup>
 )}
      
    </div>
  );
};

export default Search