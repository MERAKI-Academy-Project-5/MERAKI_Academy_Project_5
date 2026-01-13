import axios from "axios";
import "./CheckoutReview.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CheckoutReview = () => {
  const {price } = useParams();
    const navigate = useNavigate();

  const userId = localStorage.getItem("userId") || null;
 const courseId = useSelector((state) => state.courseDetails.courseId);
  const cardInfo = useSelector((state) => state.creditCard[userId]);
  console.log(courseId);
   const addCourseToStudent = () => {
    const student = userId;
    const course = courseId;
    axios
      .post(
        `http://localhost:5000/courses/addCourseToStudent`,
        { student, course },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  const addLessonsToCourse = () => {
    const coursesid = courseId
        const userid = userId;

    axios.post(
      "http://localhost:5000/lessons/addLessonsToCourse",
      { userid, coursesid },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ).then((res) => {console.log(res);
    })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="review-container">
      <h2 className="review-title">Checkout</h2>
      <div className="review-steps">
        <span onClick={()=>{navigate(`/newcard/${price}`)}} className="step done">Shipping</span>
        <span onClick={()=>{navigate(`/payment/${price}`)}} className="step done">Payment</span>
        <span onClick={()=>{navigate(`/checkout/${price}`)}} className="step active">Review</span>
      </div>
      <div className="summary-card">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>total price</span>
          <span>{price} $</span>
        </div>

      </div>
      {cardInfo ? (
        <div className="info-card">
          <div className="info-header">
            <h4>Payment</h4>
          </div>
          <p>💳 {cardInfo.cardNumber}</p>
          <p>Card Holder: {cardInfo.cardHolder}</p>
          <p>Exp: {cardInfo.expiryDate}</p>
        </div>
      ) : (
        <div className="info-card">
          <p>No saved credit card found.</p>
        </div>
      )}
      <button    onClick={() => {
                    addCourseToStudent();
                    addLessonsToCourse();
                    navigate("/courseDetails")
                  }} className="submit-btn">Submit Order</button>
    </div>
  );
};

export default CheckoutReview;
