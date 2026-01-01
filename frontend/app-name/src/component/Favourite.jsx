import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavourite } from "../redux/favouriteSlice";

function Favourite() {
  const dispatch = useDispatch();
  const favouriteCourses = useSelector(
    (state) => state.favourite.items
  );

  return (
    <div className="favourite-section">
      <h1>Favourite Courses ❤️</h1>

      {favouriteCourses.length === 0 ? (
        <p className="favourite-empty">
          No favourite courses yet
        </p>
      ) : (
        <div className="favourite-grid">
          {favouriteCourses.map((course) => (
            <div className="favourite-card" key={course.id}>
              <img src={course.image} alt={course.title} />

              <h3>{course.title}</h3>
              <p>{course.description}</p>

              <div className="favourite-bottom">
                <span className="price">
                  ${course.price}
                </span>

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
