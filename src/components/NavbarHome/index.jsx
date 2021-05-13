import { NavLink } from "react-router-dom";
import React, { Fragment } from "react";
import "./style.css";

export default function NavbarHome() {
  const user = JSON.parse(localStorage.getItem("User"));


  const renderStatus = () => {
    if (user) {
      return (
        <Fragment>
          <li className="nav-item login border-right">
            <div className="nav-link d-flex">
              <i className="fa fa-user-circle user-icon" />
              <span className="mt-1 ml-1 px-1">{user.hoTen}</span>
            </div>
          </li>
          <li className="nav-item register">
            <div className="nav-link d-flex">
              <span className="mt-1 ml-1 px-1">Đăng xuất</span>
            </div>
          </li>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <li className="nav-item login border-right">
          <NavLink className="nav-link d-flex" to="/login">
            <i className="fa fa-user-circle user-icon" />
            <span className="mt-1 ml-1 px-1">Đăng Nhập</span>
          </NavLink>
        </li>
        <li className="nav-item register">
          <NavLink className="nav-link d-flex" to="/register">
            <span className="mt-1 ml-1 px-1">Đăng Ký</span>
          </NavLink>
        </li>
      </Fragment>
    );

  };

  return (
    <header id="header" className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a
          className="navbar-brand ml-3 col-sm-10 col-md-2 col-lg-3 col-xl-4"
          href="#header"
        >
          <img src="./images/logo.png" target="logo" alt="logo" />
        </a>
        <button
          className="navbar-toggler col-sm-1"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse col-md-10 col-lg-9 col-xl-8"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav item-left col-md-7">
            <li className="nav-item">
              <a className="nav-link" href="#intro-film">
                Lịch Chiếu
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#schedule">
                Cụm rạp
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#news">
                Tin tức
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#application">
                Ứng dụng
              </a>
            </li>
          </ul>
          <ul className="navbar-nav item-right col-md-5">
            {renderStatus()}
            {/* <li className="nav-item login border-right">
              <NavLink className="nav-link d-flex" to="/login">
                <i className="fa fa-user-circle user-icon" />
                <span className="mt-1 ml-1 px-1">Đăng Nhập</span>
              </NavLink>
            </li>
            <li className="nav-item register">
              <NavLink className="nav-link d-flex" to="/register">
                <span className="mt-1 ml-1 px-1">Đăng Ký</span>
              </NavLink>
            </li> */}
          </ul>
        </div>
      </nav>
    </header>
  );
}
