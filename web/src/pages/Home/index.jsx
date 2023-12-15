import React from 'react';
import './index.scss';

function HomePage() {
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
  <div class="swipe listMovie animate__animated animate__pulse">
            <div class="swiper-wrapper h-auto">
                <div class="swiper-slide mb-5 h-auto">
                    <div class="card h-100">
                        <div id="avatar-hue" class="avatar container"></div>
                        <div class="card-body text-center">
                            <p>CHỊ HUẾ</p>
                            <p>Marketing Ritta Hair Salon</p>
                            <div class="container">
                              <i class="fa-solid fa-quote-left"></i>
                            </div>
                            <p class="card-text">
                              Phần mềm e-spa
                            </p>
                        </div>
                    </div>
                </div>

                <div class="swiper-slide mb-5 h-auto">
                  <div class="card h-100">
                    <div id="avatar-helen" class="avatar container"></div>
                    <div class="card-body text-center">
                        <p>BÀ HELEN TRẦN</p>
                        <p>Giám đốc Eden Beauty</p>
                        <div class="container">
                          <i class="fa-solid fa-quote-left"></i>
                        </div>
                        <p class="card-text">
                          Phần mềm e-spa
                        </p>
                    </div>
                  </div>
                </div>

                <div class="swiper-slide mb-5 h-auto">
                  <div class="card h-100">
                    <div id="avatar-anh" class="avatar container"></div>
                    <div class="card-body text-center">
                        <p>ANH NGỌC ANH</p>
                        <p>Giám đốc chuỗi Spa Lagertroemia</p>
                        <div class="container">
                          <i class="fa-solid fa-quote-left"></i>
                        </div>
                        <p class="card-text">
                          Phần mềm
                        </p>
                    </div>
                  </div>
                </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
  </div>;
}

export default HomePage;
