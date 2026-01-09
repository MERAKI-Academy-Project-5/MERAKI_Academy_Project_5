import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/auth";
import { MdOutlineFavorite } from "react-icons/md";
import { CgProfile, CgFileDocument } from "react-icons/cg";
import { FaBook, FaRegIdCard } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { GrLogout } from "react-icons/gr";
import { TbLogin } from "react-icons/tb";
import GradientText from "./GradientText/GradientText";

import "./GradientText/GradientText.css";

const Navbar = () => {
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
  return (
    <div className="all">
      <div className="bb">
        <a href="/" className="logo">
          <img src="/images/p1.png" alt="logo" />
        </a>
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class"
        >
         Teaching squad
        </GradientText>

        <ul className="nav-links">
          <li onClick={() => navigate("/")}>
            Home <IoIosHome />
          </li>

          <li onClick={() => navigate("/courses")}>
            Courses <FaBook />
          </li>

          <li onClick={() => navigate("/about")}>
            About us <CgFileDocument />
          </li>

          {isLoggedIn && (
            <>
              <li onClick={() => navigate("/profile")}>
                Profile <CgProfile />
              </li>

              <li onClick={() => navigate("/favourite")}>
                Favourite <MdOutlineFavorite />
              </li>
            </>
          )}
          <li onClick={() => navigate("/message")}>
            Chat <CgFileDocument />
          </li>
          <li>
            <Search />
          </li>
        </ul>

        <div className="auth-buttons">
          {isLoggedIn ? (
            <div className="dropdown">
              <button
                className="dropbtn"
                onClick={() => setOpen((prev) => !prev)}
              >
                Menu
              </button>

              {open && (
                <div className="dropdown-content">
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
