import React from 'react';
import './header.scss';
import ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom border-1 shadow z-1 sticky-top">
      <div className="container-fluid px-5">
        <a className="navbar-brand" href="/">
          <img src="/assets/images/logo-megacine.png" alt="" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Trang chủ
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={ROUTES.SCHEDULE}>
                Lịch chiếu
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Phim
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to={ROUTES.MOVIELIST}>
                    Phim đang chiếu
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={ROUTES.MOVIELIST}>
                    Phim sắp chiếu
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={ROUTES.MOVIELIST}>
                    Phim chiếu sớm
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Rạp
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Rạp Hoàng Diệu
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Rạp Đúc Tee
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Rạp Thị Sủi
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Từ khóa..." aria-label="Search" />
          </form>
          <div className="group-btn-header">
            <Link to={ROUTES.LOGIN} className="btn btn-language">
              <i className="fa-solid fa-right-to-bracket"></i>
            </Link>
            <Link href="" className="btn btn-user">
              <i className="fa-solid fa-user icon-button"></i>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
