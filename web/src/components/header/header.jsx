import React from 'react';
import './header.scss';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';


function Header() {

  return <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><img src="/assets/images/logo-megacine.png" alt="" /></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Trang chủ</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Đặt vé</a>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={ROUTES.SCHEDULE}>Lịch chiếu</Link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Phim
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link class="dropdown-item" to={ROUTES.MOVIELIST}>Đang chiếu</Link></li>
            <li><Link class="dropdown-item" to={ROUTES.MOVIELIST}>Sắp chiếu</Link></li>
            <li><Link class="dropdown-item" to={ROUTES.MOVIELIST}>Chiếu sớm</Link></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Rạp
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Rạp Hoàng Diệu</a></li>
            <li><a class="dropdown-item" href="#">Rạp Đúc Tee</a></li>
            <li><a class="dropdown-item" href="#">Rạp Thị Sủi</a></li>
          </ul>
        </li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Từ khóa..." aria-label="Search"/>
      </form>
      <div class = "group-btn-header">
      <Link to={ROUTES.LOGIN} className='btn btn-language'><i class="fa-solid fa-right-to-bracket"></i></Link >
      <Link  href="" className='btn btn-user'><i class="fa-solid fa-user icon-button"></i></Link >
      </div>
    </div>
  </div>
</nav>;
}

export default Header;