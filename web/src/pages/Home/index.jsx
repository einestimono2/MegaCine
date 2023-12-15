import React from 'react';
import './index.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function HomePage() {
  return <div className='container'>
    <Swiper
      spaceBetween={30}
      slidesPerView={4}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <div class="card">
          <img src="/assets/images/poster.jpeg" class="card-img-top" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">The Creater</h5>
            <p class="card-text">Thể loại: Hành động, phiêu lưu <br /> Khởi chiếu: 15/12/2023</p>
          </div>
          <ul class="list-group list-group-flush container">
            <li class="list-group-item"><a href="#" class="card-link btn btn-success">Đặt vé ngay</a></li>
          </ul>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div class="card">
          <img src="/assets/images/poster.jpeg" class="card-img-top" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">The Creater</h5>
            <p class="card-text">Thể loại: Hành động, phiêu lưu <br /> Khởi chiếu: 15/12/2023</p>
          </div>
          <ul class="list-group list-group-flush container">
            <li class="list-group-item"><a href="#" class="card-link btn btn-success">Đặt vé ngay</a></li>
          </ul>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div class="card">
          <img src="/assets/images/poster.jpeg" class="card-img-top" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">The Creater</h5>
            <p class="card-text">Thể loại: Hành động, phiêu lưu <br /> Khởi chiếu: 15/12/2023</p>
          </div>
          <ul class="list-group list-group-flush container">
          <li class="list-group-item"><a href="#" class="card-link btn btn-success">Đặt vé ngay</a></li>
          </ul>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div class="card">
          <img src="/assets/images/poster.jpeg" class="card-img-top" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">The Creater</h5>
            <p class="card-text">Thể loại: Hành động, phiêu lưu <br /> Khởi chiếu: 15/12/2023</p>
          </div>
          <ul class="list-group list-group-flush container">
            <li class="list-group-item"><a href="#" class="card-link btn btn-success">Đặt vé ngay</a></li>
          </ul>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div class="card">
          <img src="/assets/images/poster.jpeg" class="card-img-top" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">The Creater</h5>
            <p class="card-text">Thể loại: Hành động, phiêu lưu <br /> Khởi chiếu: 15/12/2023</p>
          </div>
          <ul class="list-group list-group-flush container">
            <li class="list-group-item"><a href="#" class="card-link btn btn-success">Đặt vé ngay</a></li>
          </ul>
        </div>
      </SwiperSlide>
  </Swiper>
  </div>;
}

export default HomePage;
