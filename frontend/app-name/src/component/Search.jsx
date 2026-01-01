import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const navigate = useNavigate();
  
  const [searchCourses, setsearchCourses] = useState(courses);
const courses = useSelector((state)=> state.courses.courses)

  const handleSearch = (e) => {
    courses.map((elem,i)=>{
      elem
    })
  };

  return (
    <>
      
      <form className="search-wrapper" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search courses"
          value={searchValue}
          onChange={(e) => setsearchValue(e.target.value)}
          
        />
        <button type="submit" className="search-btn" onClick={()=>{
            navigate("/courses")
          }}>🔍</button>
      </form>

      
      <ul>
        {searchCourses.length > 0 ? (
          searchCourses.map(course => (
            <li key={course.id} onClick={()=>{
              navigate("/coursesDetails")
            }}>{course.title} </li>
          ))
        ) : (
          <p>No courses found</p>
        )}
      </ul>
    </>
  );
};


export default Search