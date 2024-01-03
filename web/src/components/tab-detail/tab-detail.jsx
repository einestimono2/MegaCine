import React from 'react';
import './tab-detail.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import ReviewList from './review-list';
import Schedule from '../../pages/Schedule/schedule';

function TabDetail() {
  return (
    <div className="container-fluid my-3">
      <Tabs>
        <TabList>
          <Tab>Thông tin phim</Tab>
          <Tab>Lịch chiếu</Tab>
          <Tab>Đánh giá</Tab>
        </TabList>
        <TabPanel>
          <div className="container">
            <div className="card">
              <iframe
                width="760"
                height="415"
                src="https://www.youtube.com/embed/cYCOcxWgPVU?si=gz_aIsmy_Dbznzll"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div className="container">
            <div className="review w-100">
              <p className="review-title">Cộng đồng</p>
              <ReviewList></ReviewList>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <Schedule></Schedule>
        </TabPanel>
        <TabPanel>
          <div className="container">
            <div className="review w-100">
              <p className="review-title">Cộng đồng</p>
              <ReviewList></ReviewList>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default TabDetail;
