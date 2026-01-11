import React, { useEffect, useState } from "react";
import "./IsCompleted.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


function IsCompleted() {
  const [data, setData] = useState(null);
  const[user, setUser]= useState({})
  const token = localStorage.getItem("token");
  const userid = useSelector((state) => state.auth.userid);
  const { courseId } = useParams();
  console.log(courseId);
  console.log(userid);
  
 
 useEffect(()=>{
  axios.get(`http://localhost:5000/users/${userid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) =>{ setUser(res.data.user)
        console.log(res.data.user);
        
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/lessons/certificate/${courseId}/users/${userid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) =>{ setData(res.data)
        console.log(res.data);
        
      })
      .catch((err) => console.log(err));
  }, [courseId, token]);

  if (!data) return <p>Loading certificate...</p>;
 
  return (
    <div className="certificate-page">
      <div className="certificate-scale">
        <div className="certificate-canvas">
          <img src="/images/p2.png" alt="Certificate" />

          <div className="cert-title">Certificate of appreciation</div>
          <div className="cert-subtitle">{}</div>
          <div className="cert-name">{user.firstname} {user.lastname}</div>
          <div className="cert-desc">{data.title}</div>
          <div className="cert-course">{data.courseName}</div>
          
        </div>
      </div>
    </div>
  );
}

export default IsCompleted;
