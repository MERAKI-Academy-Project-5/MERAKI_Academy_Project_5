import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const creditCardSlice = createSlice({
  name: "creditCard",
  initialState,
  reducers: {
    setCard: (state, action) => {
      const { userId, cardNumber, cardHolder, expiryDate, cvv } = action.payload;
      state[userId] = {
        cardNumber: cardNumber.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim(),
        cardHolder,
        expiryDate,
        cvv: cvv.replace(/./g, '*'),
      };
    },
    clearCard: (state, action) => {
      const userId = action.payload;
      delete state[userId];
    },
  },
});

export const { setCard, clearCard } = creditCardSlice.actions;
export default creditCardSlice.reducer;
