import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
