import React from 'react';
import './banner.scss';

function Banner() {
  return (
    <div className="container" id="home-slide">
      <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <img src="/assets/images/banner_01.jpg" className="d-block w-100" alt="image" />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src="/assets/images/banner_02.jpg" className="d-block w-100" alt="image" />
          </div>
          <div className="carousel-item">
            <img src="/assets/images/banner_03.webp" className="d-block w-100" alt="image" />
          </div>
          <div className="carousel-item">
            <img src="/assets/images/banner_04.webp" className="d-block w-100" alt="image" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Banner;
