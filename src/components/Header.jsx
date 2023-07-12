import React from "react";
import logo from "../assets/Logo.png";
import { BiCalendar } from "react-icons/bi";

const Header = () => {
  return (
    <>
      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="navbar-brand-wrapper d-flex justify-content-center align-items-center">
          <div className="navbar-brand-inner-wrapper d-flex  align-items-center justify-content-center w-100">
            <div className="navbar-brand brand-logo">
              <img src={logo} alt="" />
            </div>
          </div>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-date dropdown">
              <div className="nav-link d-flex justify-content-center align-items-center">
                <h6 className="date mb-0 mt-0 mr-8">Today : Mar 23</h6>
                <BiCalendar className="date" />
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
