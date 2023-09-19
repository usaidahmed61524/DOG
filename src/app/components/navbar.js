"use client";
import "../components/styles/navbar.css";
import Image from "next/image";
import { IoLogoGameControllerB } from "react-icons/io";
import { BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import logo from "../images/logo.png";
const MyNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div
          className="navbar-brand"
          data-aos="zoom-in"
          data-aos-duration="3000"
        >
          <Image src={logo} alt="logo" className="logo" />
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="myList">
            <li className="nav-item">
              <IoLogoGameControllerB className="navIcons" />
            </li>

            <li className="nav-item">
              <BsTwitter className="navIcons" />
            </li>

            <li className="nav-item">
              <AiFillInstagram className="navIcons" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
