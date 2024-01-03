import React from 'react';
import { Link } from 'react-router-dom';
import './movie-detail.scss';
import TabDetail from '../../components/tab-detail/tab-detail';

function MovieDetail() {
  return (
    <section>
      <div className="container-fluid detail-movie">
        <div className="container">
          <div className="row mt-3 mb-3">
            <div className="col-md-3">
              <img className="img-detail" src="/assets/images/poster.jpg" alt="" />
            </div>
            <div className="col-md-6 d-flex">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="detail-title">NYC Bách Ruồi đi lấy chồng</h3>
                  <h5 className="detail-sub-title">{"Bachs's old girlfriend is going to marry"}</h5>
                  <div className="d-flex">
                    <Link className="btn btn-like">
                      <i className="fa-solid fa-heart"></i> Thích
                    </Link>
                    <Link className="btn btn-vote">
                      <i className="fa-solid fa-star"></i> Đánh giá
                    </Link>
                    <Link className="btn btn-trailer">Trailer</Link>
                    <Link className="btn btn-ticket">Mua vé</Link>
                  </div>
                  <p className="detail-description mt-3">
                    NYC Bách Ruồi đi lấy chồng kể về câu chuyện tình lâm li bi đát của anh chàng Bách Ruồi khi anh liên
                    tục bị cắm sừng, đào mỏ, gia đình ngăn cấm trong các cuộc tình của mình. Những tưởng cuộc đời của
                    anh chỉ gặp toàn bất hạnh cho đến khi anh gặp một cô gái tên Lina.
                  </p>
                </div>
                <div className="col-md-12 d-flex" style={{ alignItems: 'end', justifyContent: 'space-between' }}>
                  <div>
                    <h6 className="info-detail-title">
                      <i className="fa-regular fa-thumbs-up"></i> Hài lòng
                    </h6>
                    <p className="info-detail">99%</p>
                  </div>
                  <div>
                    <h6 className="info-detail-title">
                      <i className="fa-regular fa-calendar-days"></i> Khởi chiếu
                    </h6>
                    <p className="info-detail">29/12/2023</p>
                  </div>
                  <div>
                    <h6 className="info-detail-title">
                      <i className="fa-regular fa-clock"></i> Thời lượng
                    </h6>
                    <p className="info-detail">365 phút</p>
                  </div>
                  <div>
                    <h6 className="info-detail-title">
                      <i className="fa-solid fa-user-plus"></i> Giới hạn tuổi
                    </h6>
                    <p className="info-detail">18T</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 d-flex" style={{ alignItems: 'center' }}>
              <div className="row">
                <div className="col-md-12">
                  <h6 className="main-detail-title">
                    <i className="fa-solid fa-user-secret"></i> Diễn viên
                  </h6>
                  <p className="sub-detail-title">Nguyễn Huy Bách, Lina Trần, Nguyễn Đức Tuệ, Đỗ Văn Vũ,...</p>
                </div>
                <div className="col-md-12">
                  <h6 className="main-detail-title">
                    <i className="fa-solid fa-film"></i> Đạo diễn
                  </h6>
                  <p className="sub-detail-title">Nguyễn Hoàng Diệu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 d-flex" style={{ alignItems: 'end', justifyContent: 'space-between' }}>
          <div>
            <h6 className="info-detail-title">
              <i className="fa-regular fa-thumbs-up"></i> Hài lòng
            </h6>
            <p className="info-detail">99%</p>
          </div>
          <div>
            <h6 className="info-detail-title">
              <i className="fa-regular fa-calendar-days"></i> Khởi chiếu
            </h6>
            <p className="info-detail">29/12/2023</p>
          </div>
          <div>
            <h6 className="info-detail-title">
              <i className="fa-regular fa-clock"></i> Thời lượng
            </h6>
            <p className="info-detail">365 phút</p>
          </div>
          <div>
            <h6 className="info-detail-title">
              <i className="fa-solid fa-user-plus"></i> Giới hạn tuổi
            </h6>
            <p className="info-detail">18T</p>
          </div>
        </div>
      </div>
      <TabDetail></TabDetail>
    </section>
  );
}

export default MovieDetail;
