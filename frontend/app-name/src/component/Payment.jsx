import "./Payment.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Payment = () => {
  const {price } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") || null;
  const cardInfo = useSelector((state) => state.creditCard[userId]) || {};
  const [method, setMethod] = useState("card");
  const [cardHolder, setCardHolder] = useState(cardInfo.cardHolder || "");
  const [cardNumber, setCardNumber] = useState(cardInfo.cardNumber || "");
  const [expiryDate, setExpiryDate] = useState(cardInfo.expiryDate || "");
  const [cvv, setCvv] = useState("");
  const [sameBilling, setSameBilling] = useState(true);

  const handleConfirm = () => {
    if (!cardNumber || !expiryDate || !cvv || !cardHolder) {
            toast.error("Please fill all required card fields!");
      return;
    }
    navigate(`/checkout/${price}`);
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Checkout</h2>

      <div className="payment-steps">
        <span onClick={()=>{navigate(`/newcard/${price}`)}} className="active">Shipping</span>
        <span onClick={()=>{navigate(`/payment/${price}`)}} className="active">Payment</span>
        <span >Review</span>
      </div>

      <h3 className="section-title">Choose a payment method</h3>

      <div className="payment-methods">
        <label className={`method ${method === "card" ? "selected" : ""}`}>
          <input
            type="radio"
            name="method"
            checked={method === "card"}
            onChange={() => setMethod("card")}
          />
          Credit Card
        </label>
      </div>

      {method === "card" && (
        <div className="card-form">
          <input
            placeholder="Name on card"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
          />
          <input
            placeholder="Card number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <div className="row">
            <input
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
            <input
              placeholder="CVC"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>

          <div>
            <label className="checkbox">
              <input
                type="checkbox"
                checked={sameBilling}
                onChange={() => setSameBilling(!sameBilling)}
              />
              My billing address is the same as my shipping address
            </label>
          </div>

          <button onClick={handleConfirm} className="confirm-btn">
            Confirm and continue
          </button>
        </div>
      )}
        <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
   
    </div>
  );
};

export default Payment;
