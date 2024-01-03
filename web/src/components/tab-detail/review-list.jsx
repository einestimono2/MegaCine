import React from 'react';
import './tab-detail.scss';
import { Rate } from 'antd';

function ReviewList() {
  return (
    <div>
      <div className="card mt-3">
        <div className="card-header">
          <div className="d-flex user-review" style={{ alignItems: 'center' }}>
            <i className="fa-solid fa-user"></i>&nbsp; Đức Tuệ
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">Thương nam chính Bách Ruồi quá</h5>
          <p className="card-text">1 giờ trước</p>
          <div className="d-flex">
            <Rate allowHalf defaultValue={2.5} />
          </div>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-header">
          <div className="d-flex user-review" style={{ alignItems: 'center' }}>
            <i className="fa-solid fa-user"></i>&nbsp; Thị Duyên
          </div>
        </div>
        <div className="card-body mt-3">
          <h5 className="card-title">Nam chính Bách Ruồi thật là quá đáng thương. Hy vọng anh ấy được siêu thoát...</h5>
          <p className="card-text">2 giờ trước</p>
          <div className="d-flex">
            <Rate allowHalf defaultValue={4.5} />
          </div>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-header">
          <div className="d-flex user-review" style={{ alignItems: 'center' }}>
            <i className="fa-solid fa-user"></i>&nbsp; Văn Vú
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">Thấy nam chính Bách Ruồi giống mình quá hihi</h5>
          <p className="card-text">1 giờ trước</p>
          <div className="d-flex">
            <Rate allowHalf defaultValue={1.5} />
          </div>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-header">
          <div className="d-flex user-review" style={{ alignItems: 'center' }}>
            <i className="fa-solid fa-user"></i>&nbsp; Đức Tuệ
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">Thương nam chính Bách Ruồi quá</h5>
          <p className="card-text">1 giờ trước</p>
          <div className="d-flex">
            <Rate allowHalf defaultValue={5} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewList;
