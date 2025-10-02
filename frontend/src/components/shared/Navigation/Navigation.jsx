import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { logout } from "../../../http";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);

  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };

  const logoText = {
    marginLeft: "10px",
  };

  const logoImg = {
    height: "30px",
    width: "30px",
  };

  async function logoutUser() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img style={logoImg} src="/images/logo.png" alt="logo" />
        <span style={logoText}>DJwhoCodes</span>
      </Link>
      {isAuth && <button onClick={logoutUser}>Logout</button>}
    </nav>
  );
};

export default Navigation;
