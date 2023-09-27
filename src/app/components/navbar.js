"use client";
import { useEffect, useState } from "react";
import "../components/styles/navbar.css";
import Image from "next/image";
import { IoLogoGameControllerB } from "react-icons/io";
import { BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import logo from "../images/logo.png";
import "aos/dist/aos.css";
import dynamic from "next/dynamic";
import AOS from "aos";

import { useAuth } from "../Authentication";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import swal from "sweetalert";

const MyNavbar = () => {
  const auth = useAuth();
  const [show, setShow] = useState(false);
  const [domain, setDomain] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [inputError, setInputError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [loginBtnVisible, setLoginBtnVisible] = useState(true);

  useEffect(() => {
    const AOS = require("aos");
    AOS.init();
  }, []);

  const AOS = dynamic(() => import("aos"), {
    ssr: false,
  });

  const loginwithDomain = async (d, i) => {
    let useObj;
    try {
      const response = await axios.get(
        `/login?username=${d}&tokenid=${i}`
      );
      // console.log(response.data);
      useObj = response.data;
      swal("Login", "successfully Login With MMIT Domain:", "success");
    } catch (error) {
      swal("Error", "credential are not valid", "error");
      setLoading(false);
    }

    return { d, i, useObj };
  };

  const handleClose = () => {
    setShow(false);
    setLoading(false);
  };
  const onSubmit = async () => {
    if (!domain || !tokenId) {
      swal("Error", "please fill this fields!", "error");
      // setLoading(false);

      return;
    } else {
      const regex = /\.mmit$/;
      if (!regex.test(domain)) {
        // setLoading(false);
        setInputError("Please enter a valid .mmit domain address.");
        return;
      } else {
        setLoading(true);
        let login;
        try {
          login = await loginwithDomain(domain, tokenId);
        } catch (error) {
          swal("Error", `${error}`, "error");
          setLoading(false);
        }

        const user = login.useObj;
        const userValidate = user.success;
        if (userValidate) {
          setLoading(false);
          setUserName(user.validate.username);
          auth.login({
            user,
          });

          setLoginBtnVisible(false);
        } else {
          swal("Error", "Credential are not valid", "error");
          setLoading(false);
        }
      }
      setLoading(false);
    }
    setShow(false);
    setLoading(false);
  };

  const logOutUser = () => {
    setLoginBtnVisible(true);
  };

  const handleShow = () => setShow(true);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div
          className="navbar-brand"
          data-aos="zoom-in"
          data-aos-duration="1000"
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

            <li className="nav-item">
              {/* <button className="btn btn-dark">Login With MMIT Domain</button> */}

              {loginBtnVisible ? (
                <Button className="btn btn-dark" onClick={handleShow}>
                  Login With MMIT Domain
                </Button>
              ) : (
                <>
                  <span className="text-light my-4 mx-2">{userName}</span>
                  <Button className="login-btn" onClick={logOutUser}>
                    LogOut
                  </Button>
                </>
              )}
            </li>

            {loading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title className="text-light">Insert Your MMIT Domain</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        placeholder="Domain"
                        onChange={(e) => {
                          setDomain(e.target.value);
                          setInputError("");
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control
                        type="number"
                        placeholder="Token Id"
                        onChange={(e) => {
                          setTokenId(e.target.value);
                        }}
                      />
                    </Form.Group>

                    <p className="text-danger my-2">{inputError}</p>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="dark" onClick={onSubmit}>
                    Login
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
