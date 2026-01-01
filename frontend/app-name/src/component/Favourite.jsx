import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavourite } from "../redux/favouriteSlice";

function Favourite() {
  const dispatch = useDispatch();
  const favouriteCourses = useSelector(
    (state) => state.favourite.items
  );

  return (
    <div className="container mt-4">
      <h1>Favourite Courses ❤️</h1>

      {favouriteCourses.length === 0 ? (
        <p>No favourite courses yet</p>
      ) : (
        favouriteCourses.map((course) => (
          <div key={course.id} className="card mb-3 p-3">
            <h4>{course.title}</h4>
            <p>{course.description}</p>

            <button
              className="btn btn-danger"
              onClick={() =>
                dispatch(removeFromFavourite(course.id))
              }
            >
              Remove ❌
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Favourite;
