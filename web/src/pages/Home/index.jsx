import React from 'react';
import './index.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function HomePage() {
  return <section className='banner'>
    <div className='container swipe-slide'>
    <Tabs>
    <TabList>
      <Tab>Đang chiếu</Tab>
      <Tab>Sắp chiếu</Tab>
    </TabList>
    <TabPanel>
     <div className='container'>
     <Swiper
      spaceBetween={30}
      slidesPerView={5}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <div class="card">
          <img src="/assets/images/poster.jpeg" class="card-img-top" alt="..."/>
          <a href="#" class="card-link btn btn-datve">Đặt vé ngay</a>
          <div class="card-body">
            <h5 class="card-title">The Creater</h5>
            <p class="card-text">Thể loại: Hành động, phiêu lưu <br /> Khởi chiếu: 15/12/2023</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div class="card">
          <img src="/assets/images/poster.jpeg" class="card-img-top" alt="..."/>
          <a href="#" class="card-link btn btn-datve">Đặt vé ngay</a>
          <div class="card-body">
            <h5 class="card-title">The Creater</h5>
            <p class="card-text">Thể loại: Hành động, phiêu lưu <br /> Khởi chiếu: 15/12/2023</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div class="card">
          <img src="/assets/images/poster.jpeg" class="card-img-top" alt="..."/>
          <a href="#" class="card-link btn btn-datve">Đặt vé ngay</a>
          <div class="card-body">
            <h5 class="card-title">The Creater</h5>
            <p class="card-text">Thể loại: Hành động, phiêu lưu <br /> Khởi chiếu: 15/12/2023</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div class="card">
          <img src="/assets/images/poster.jpeg" class="card-img-top" alt="..."/>
          <a href="#" class="card-link btn btn-datve">Đặt vé ngay</a>
          <div class="card-body">
            <h5 class="card-title">The Creater</h5>
            <p class="card-text">Thể loại: Hành động, phiêu lưu <br /> Khởi chiếu: 15/12/2023</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div class="card">
          <img src="/assets/images/poster.jpeg" class="card-img-top" alt="..."/>
          <a href="#" class="card-link btn btn-datve">Đặt vé ngay</a>
          <div class="card-body">
            <h5 class="card-title">The Creater</h5>
            <p class="card-text">Thể loại: Hành động, phiêu lưu <br /> Khởi chiếu: 15/12/2023</p>
          </div>
        </div>
      </SwiperSlide>
  </Swiper>
     </div>
    </TabPanel>
    <TabPanel>
      <div className='container'>
      <Swiper
      spaceBetween={30}
      slidesPerView={5}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <div class="card">
          <img src="/assets/images/poster2.jpg" class="card-img-top" alt="..."/>
          <a href="#" class="card-link btn btn-datve">Đặt vé ngay</a>
          <div class="card-body">
            <h5 class="card-title">Trạng Tuệ</h5>
            <p class="card-text">Thể loại: Hành động, phiêu lưu <br /> Khởi chiếu: 22/12/2023</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div class="card">
          <img src="/assets/images/poster2.jpg" class="card-img-top" alt="..."/>
          <a href="#" class="card-link btn btn-datve">Đặt vé ngay</a>
          <div class="card-body">
            <h5 class="card-title">Trạng Tuệ</h5>
            <p class="card-text">Thể loại: Hành động, phiêu lưu <br /> Khởi chiếu: 22/12/2023</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div class="card">
          <img src="/assets/images/poster2.jpg" class="card-img-top" alt="..."/>
          <a href="#" class="card-link btn btn-datve">Đặt vé ngay</a>
          <div class="card-body">
            <h5 class="card-title">Trạng Tuệ</h5>
            <p class="card-text">Thể loại: Hành động, phiêu lưu <br /> Khởi chiếu: 22/12/2023</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div class="card">
          <img src="/assets/images/poster2.jpg" class="card-img-top" alt="..."/>
          <a href="#" class="card-link btn btn-datve">Đặt vé ngay</a>
          <div class="card-body">
            <h5 class="card-title">Trạng Tuệ</h5>
            <p class="card-text">Thể loại: Hành động, phiêu lưu <br /> Khởi chiếu: 22/12/2023</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div class="card">
          <img src="/assets/images/poster2.jpg" class="card-img-top" alt="..."/>
          <a href="#" class="card-link btn btn-datve">Đặt vé ngay</a>
          <div class="card-body">
            <h5 class="card-title">Trạng Tuệ</h5>
            <p class="card-text">Thể loại: Hành động, phiêu lưu <br /> Khởi chiếu: 15/12/2023</p>
          </div>
        </div>
      </SwiperSlide>
  </Swiper>
      </div>
    </TabPanel> 
  </Tabs>
    
    </div>
    <div className='container' id='home-slide'>
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
    
  </section>;
}

export default HomePage;
