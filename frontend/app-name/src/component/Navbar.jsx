import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { Button } from "react-bootstrap";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/auth";
import { GrLogout } from "react-icons/gr";
import { TbLogin } from "react-icons/tb";
import { FaRegIdCard } from "react-icons/fa";
import GradientText from "./react bits/GradientText/GradientText";
import { useNavigate } from "react-router-dom";
import {
  selectRole,
  selectIsAdmin,
  selectIsTeacher,
  selectIsStudent,
} from "../redux/selectors";
import PillNav from "./react bits/PillNav/PillNav";
import Profile from "./Profile";

const Navbar = () => {
  const dropdownRef = useRef();
  const role = useSelector(selectRole);
  const isAdmin = useSelector(selectIsAdmin);
  const isTeacher = useSelector(selectIsTeacher);
  const isStudent = useSelector(selectIsStudent);
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/login");
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  const handleGuestLogin = async () => {
  try {
    const res = await axios.post("http://localhost:5000/login", {
      email: "ahmad@gmail.com",
      password: "12345",
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userId", res.data.user.id);
    localStorage.setItem("role", res.data.user.role);

  

    navigate("/");
    setOpen(false);
  } catch (error) {
    console.error("Guest login failed", error);
  }
};


  return (
    <div className="all">
      <div className="bb">
        <div className="logo-title">
          <a href="/" className="logo">
            <img src="/images/p1.png" alt="logo" />
          </a>
          <GradientText
            colors={["#40ffaa", "#a03ba0", "#40ffaa", "#a03ba0", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className="custom-class"
          >
            Teaching squad
          </GradientText>
        </div>

        <div className="nav-center">
          <PillNav
            items={[
              { label: "Home", href: "/" },
              { label: "Courses", href: "/courses" },
              { label: "About us", href: "/about" },
              ...(isLoggedIn
                ? [{ label: "Favourite", href: "/favourite" }]
                : []),
              { label: "Chat", href: "/message" },
            ]}
            activeHref={window.location.pathname}
            onNavigate={(href) => navigate(href)}
            className="custom-nav"
            ease="power2.easeOut"
            baseColor="transparent"
            pillColor="rgba(255,255,255,0.25)"
            pillTextColor="#5e27b7"
            hoveredPillTextColor="#ffffff"
          />
          <Search />
        </div>

        <div className="auth-buttons">
          {isLoggedIn ? (
            <div className="dropdown">
              <button
                className="dropbtn"
                onClick={() => setOpen((prev) => !prev)}
              >
                Menu
              </button>

              {open && (isAdmin ) && (
                <div className="dropdown-content" ref={dropdownRef}>
                  <button
                    className="dropdown-link-btn logout"
                    onClick={()=>{
                      navigate(`/profile/${id}`)
                    }}
                  >
                    Profile
                  </button>
                  <button
                    className="dropdown-link-btn"
                    onClick={() => {
                      navigate("/dashboard");
                      setOpen(false);
                    }}
                  >
                    Admin Dashboard
                  </button>

                  <button
                    className="dropdown-link-btn logout"
                    onClick={handleLogout}
                  >
                    Logout <GrLogout />
                  </button>
                  
                </div>
              )}
   {open && (isTeacher ) && (
                <div className="dropdown-content" ref={dropdownRef}>
                  <button
                    className="dropdown-link-btn logout"
                    onClick={()=>{
                      navigate(`/profile/${id}`)
                    }}
                  >
                    Profile
                  </button>
                  <button
                    className="dropdown-link-btn"
                    onClick={() => {
                      navigate("/teacherDashboard");
                      setOpen(false);
                    }}
                  >
                    Teacher Dashboard
                  </button>

                  <button
                    className="dropdown-link-btn logout"
                    onClick={handleLogout}
                  >
                    Logout <GrLogout />
                  </button>
                  
                </div>
              )}
              {open && isStudent && (
                <div className="dropdown-content" ref={dropdownRef}>
                  <button
                    className="dropdown-link-btn logout"
                    onClick={()=>{
                      navigate(`/profile/${id}`)
                    }}
                  >
                    Profile
                  </button>
                  <button
                    className="dropdown-link-btn logout"
                    onClick={handleLogout}
                  >
                    Logout <GrLogout />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button className="btn-btn" onClick={() => navigate("/login")}>
                Login <TbLogin />
              </Button>
              <Button
                className="btn-btn1"
                onClick={() => navigate("/register")}
              >
                Register <FaRegIdCard />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
