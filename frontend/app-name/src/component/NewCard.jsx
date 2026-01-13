import "./NewCard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCard } from "../redux/creditCardSlice"; // adjust path
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const NewCard = () => {
  const userId = localStorage.getItem("userId") || null;
  const {price } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const cardInfo = useSelector((state) => state.creditCard[userId]);
  const handleConfirm = () => {
    if (!cardNumber || !expiryDate || !cvv) {
      toast.error("Please fill all required fields!");
      return;
    }
    if (saveCard) {
      dispatch(
        setCard({
          userId,
          cardNumber,
          cardHolder,
          expiryDate,
          cvv,
        })
      );
    }
    navigate(`/payment/${price}`);
  };
  const handleUseSavedCard = () => {
    if (!cardInfo) {
      toast.error("No saved card found!");
      return;
    }
    navigate(`/payment/${price}`);
  };

  return (
    <div className="newcard-container">
      <h2 className="newcard-title">Add Card</h2>
      {cardInfo && (
        <div className="saved-card-section">
          <p>Saved Card: {cardInfo.cardNumber} ({cardInfo.cardHolder})</p>
          <button onClick={handleUseSavedCard} className="confirm-btn">
            Use Saved Card
          </button>
        </div>
      )}
      <div className="card-form">
        <label>
          Card Number
          <input
            placeholder="**** **** **** 6522"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </label>
        <label>
          Card Holder
          <input
            placeholder="Full Name"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
          />
        </label>
        <div >
          <label>
            Expire Date
            <input
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </label>
          <label>
            CVC/CVV2
            <input
              placeholder="***"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </label>
        </div>
        <label className="save-card">
          <input
            type="checkbox"
            checked={saveCard}
            onChange={() => setSaveCard(!saveCard)}
          />
          Save your card information. It’s confidential.
        </label>
      </div>
      <button onClick={handleConfirm} className="confirm-btn">
        Confirm
      </button>
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

export default NewCard;
