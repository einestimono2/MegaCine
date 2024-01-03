import React, { useEffect, useState } from 'react';
import './index.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { movieApi } from '../../apis/movieApi';
import apiCaller from '../../apis/apiCaller';

function HomePage() {
  const [data, setData]= useState()
  const [dataComingSoon, setDataComingSoon] = useState()

  const listMovieNowShowing = async ()=>{
    const errorHandler = (error) => {
      console.log('Fail: ', error);
    };
    const data = {}
    const response = await apiCaller({
      request: movieApi.listMovieNowShowing(data),
      errorHandler,
    });
    if (response) {
      setData(response?.data)
    }
  }
  
  const listMovieComingSoon = async ()=>{
    const errorHandler = (error) => {
      console.log('Fail: ', error);
    };
    const dataComingSoon = {}
    const response = await apiCaller({
      request: movieApi.listMovieComingSoon(dataComingSoon),
      errorHandler,
    });
    if (response) {
      setDataComingSoon(response?.dataComingSoon)
    }
  }
  useEffect( ()=>{
    listMovieNowShowing();
    listMovieComingSoon()
  },[])

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
      {data?.map((val)=>(

      <SwiperSlide>
        <div class="card">
          <img src="/assets/images/poster.jpeg" class="card-img-top" alt="..."/>
          <a href="#" class="card-link btn btn-datve">Đặt vé ngay</a>
          <div class="card-body">
            <h5 class="card-title">{val.title}</h5>
            <p class="card-text">Thể loại: {val.genres.join(", ")} <br /> Khởi chiếu: {val.releaseDate}</p>
          </div>
        </div>
      </SwiperSlide>
      ))}
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
      {dataComingSoon?.map((val) => (
      <SwiperSlide>
        <div class="card">
          <img src="/assets/images/poster2.jpg" class="card-img-top" alt="..."/>
          <a href="#" class="card-link btn btn-datve">Đặt vé ngay</a>
          <div class="card-body">
            <h5 class="card-title">{val.title}</h5>
            <p class="card-text">Thể loại: {val.genres} <br /> Khởi chiếu: {val.releaseDate}</p>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
      </div>
    </TabPanel> 
  </Tabs>
    </div>
  </section>;
}

export default HomePage;
