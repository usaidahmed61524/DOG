"use client";
import { useEffect } from "react";
import "../components/styles/navbar.css";
import Image from "next/image";
import { IoLogoGameControllerB } from "react-icons/io";
import { BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import logo from "../images/logo.png";
import "aos/dist/aos.css"; // You can also use <link> for styles
import dynamic from "next/dynamic";
import AOS from "aos";

const MyNavbar = () => {
  useEffect(() => {
    const AOS = require('aos');
    AOS.init();
  }, []);


  const AOS = dynamic(() => import("aos"), {
    ssr: false, // This will load the module only on the client side
  });

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
