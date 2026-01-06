import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavourite } from "../redux/favouriteSlice";
import axios from "axios";

function Favourite() {
  const dispatch = useDispatch();
  const favouriteCourses = useSelector(
    (state) => state.favourite.items

    
  );
console.log(favouriteCourses);

useEffect (()=>{



},[])
  return (
    <div className="unauth-wrapper">

      {favouriteCourses.length === 0 ? (
        <div className="unauth-card">
          <div className="browser-bar">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="unauth-content">
            <div className="unauth-emoji"></div>
            <h1>Favourite Courses ❤️</h1>
            <h2 className="unauth-title">No favourite courses yet</h2>
            <p className="unauth-text"></p>
          </div>
        </div>
      ) : (
        <div className="unauth-grid">
          {favouriteCourses.map((course) => (
            
            <div className="unauth-card" key={course.id}>
              <img src={course.image} alt={course.title} />
              <h3>{course.title}</h3>
              <p>{course.description}</p>

              <div className="unauth-bottom">
                <span className="price">${course.price}</span>
                <button
                  className="remove-btn"
                  onClick={() =>
                    dispatch(removeFromFavourite(course.id))
                  }
                >
                  Remove ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
}

export default Favourite;
