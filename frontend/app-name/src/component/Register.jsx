import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [firstName, setfirstName] = useState(second)
  const [lastName, setlastName] = useState(second)
  const [age, setage] = useState(second)
  const [email, setemail] = useState(second)
  const [password, setpassword] = useState(second)
  const [image, setimage] = useState(second)
  const Register = () => {
    const body = { firstName, lastName, age, email, password,image };
    axios
      .post("http://localhost:5000/users/register", body)
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "Registration failed");
      });
  };

  return (
    <div>
        <input type="text" placeholder="firstName" onChange={(e)=>{
            setfirstName(e.target.value)
        }} />
    </div>
  )
};

export default Register;
