import React from 'react';
import './banner.scss';

function Banner() {
    return <div className='container' id='home-slide'>
    <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="10000">
          <img src="/assets/images/banner_01.jpg" class="d-block w-100" alt="image"/>
        </div>
        <div class="carousel-item" data-bs-interval="2000">
          <img src="/assets/images/banner_02.jpg" class="d-block w-100" alt="image"/>
        </div>
        <div class="carousel-item">
          <img src="/assets/images/banner_03.webp" class="d-block w-100" alt="image"/>
        </div>
        <div class="carousel-item">
          <img src="/assets/images/banner_04.webp" class="d-block w-100" alt="image"/>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    </div>
}

export default Banner;