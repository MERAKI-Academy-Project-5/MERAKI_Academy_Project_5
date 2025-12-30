import React from 'react'
import { useSelector } from 'react-redux';

import { useState } from "react";
const courses = useSelector((state) => state.courses.courses)
const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchCourses, setsearchCourses] = useState(courses);

  const handleSearch = (e) => {
    e.preventDefault();

    const result = courses.filter(course =>
      course.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    setsearchCourses(result);
  };

  return (
    <>
      
      <form className="search-wrapper" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search courses"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit" className="search-btn">🔍</button>
      </form>

      
      <ul>
        {searchCourses.length > 0 ? (
          searchCourses.map(course => (
            <li key={course.id}>{course.title}</li>
          ))
        ) : (
          <p>No courses found</p>
        )}
      </ul>
    </>
  );
};

export default Search