import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addToFavourite, removeFromFavourite, setFavourite } from "../redux/favouriteSlice";
import "./Favourite.css";
import { useNavigate } from "react-router-dom";


function Favourite() {
  const dispatch = useDispatch();
  const favouriteCourses = useSelector((state) => state.favourite.items);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/favourite", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => dispatch(setFavourite(res.data)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  const handleToggleFavourite = (course) => {
    const exists = favouriteCourses.find((c) => c.id === course.id);

    if (exists) {
      axios
        .delete(`http://localhost:5000/favourite/${course.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then(() => dispatch(removeFromFavourite(course.id)))
        .catch((err) => console.log(err));
    } else {
      axios
        .post(
          "http://localhost:5000/favourite",
          { courseId: course.id },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        )
        .then(() => dispatch(addToFavourite(course)))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="unauth-wrapper">
      <div className="unauth-grid">
        {favouriteCourses.length === 0 ? (
          <div className="unauth-card">
            <h3>Favourite Courses ❤️</h3>
            <p>No favourite courses yet</p>
          </div>
        ) : (
          favouriteCourses.map((course) => (
            <div className="unauth-card" key={course.id}>
              <img onClick={(()=>{
                navigate("/")
              })} src={course.image} alt={course.title} />
              <h3>{course.title}</h3>
              <div className="unauth-bottom">
                <span className="price">${course.price}</span>
                <button
                  className="remove-btn"
                  onClick={() => handleToggleFavourite(course)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Favourite;
