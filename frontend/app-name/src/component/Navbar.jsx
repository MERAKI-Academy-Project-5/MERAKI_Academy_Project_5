import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/auth";
import { MdOutlineFavorite } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaBook } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { CgFileDocument } from "react-icons/cg";
import { GrLogout } from "react-icons/gr";
import { TbLogin } from "react-icons/tb";
import { FaRegIdCard } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="all">
      <div className="bb">
        <a href="#" className="logo">
          <img src="/images/p1.png" ></img>
        </a>

        <ul className="nav-links">
          <li onClick={() => navigate("/")}>Home <IoIosHome />
          </li>
          <li onClick={() => navigate("/courses")}>Courses <FaBook />
          </li>
          <li onClick={() => navigate("/about")}>About us <CgFileDocument />
          </li>
          {isLoggedIn && (
            <>
              <li onClick={() => navigate("/profile")}>Profile <CgProfile />
              </li>
              <li onClick={() => navigate("/favourite")}>Favourite <MdOutlineFavorite />
              </li>
            </>
          )}
          <li>
            <Search />
          </li>
        </ul>

        <div className="auth-buttons">
          {isLoggedIn ? (
            <div class="dropdown">
              <button class="dropbtn">Dropdown Menu</button>

              <div class="dropdown-content">
                <Button variant="danger" onClick={handleLogout}>
                  Logout  <GrLogout />

                </Button>     <button onClick={() => navigate("/dashboard")}>Admin Dashboard</button>
                
              </div>
            </div>


            
          ) : (
            <>
              <Button className="btn-btn" onClick={() => navigate("/login")}>Login <TbLogin /></Button>
              <Button className="btn-btn1" onClick={() => navigate("/register")}>Register <FaRegIdCard />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
