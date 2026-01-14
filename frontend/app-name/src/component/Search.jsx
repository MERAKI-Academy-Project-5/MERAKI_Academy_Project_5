import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setCourses} from "../redux/coursesSlice"
import { useNavigate } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import "./Search.css"
import { setCourseId } from "../redux/courseDetailsSlice";

const Search = () => {
  const navigate = useNavigate();
 const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const [searchValue, setSearchValue] = useState("");
  const [searchCourses, setSearchCourses] = useState([]);
const dropdownRef = useRef();
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
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSearchCourses([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="search-wrapper" ref={dropdownRef}>
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
              onClick={() => {
                console.log(course);
                 dispatch(setCourseId(course.id))
                navigate(`/courseDetails`)}}>  {course.title}</ListGroup.Item>
    ))}
    </ListGroup>
 )}
      
    </div>
  );
};

export default Search