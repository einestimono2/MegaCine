import React, { useEffect, useState } from 'react';
import { Tabs, Card, Image, Button, Modal, Skeleton } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { movieApi } from '../../apis/movieApi';
import { theaterApi } from '../../apis/theaterApi';
import apiCaller from '../../apis/apiCaller';
import './index.scss';
import { NO_IMAGE } from '../../constants/images';
import { getEmbedYoutubeURL } from '../../utils/format-yt-url';

const { Meta } = Card;

const banners = [
  'assets/images/banner_01.jpg',
  'assets/images/banner_02.jpg',
  'assets/images/banner_03.webp',
  'assets/images/banner_04.webp',
];

function HomePage() {
  const [movieLoading, setMovieLoading] = useState(true);
  const [theaterLoading, setTheaterLoading] = useState(true);

  const [currentMovieTab, setCurrentMovieTab] = useState(1);
  const [currentTheaterTab, setCurrentTheaterTab] = useState(1);
  const [modalOpen, setModalOpen] = useState('');

  const [nowShowingMovie, setNowShowingMovie] = useState([]);
  const [comingSoonMovie, setComingSoonMovie] = useState([]);
  const [nearbyTheater, setNearbyTheater] = useState();
  const [mostRateTheater, setMostRateTheater] = useState();

  const onMovieChange = (idx) => {
    setCurrentMovieTab(idx);
  };

  const onTheaterChange = (idx) => {
    setCurrentTheaterTab(idx);
  };

  const getMovieTabData = () => {
    return currentMovieTab === 1 ? nowShowingMovie : comingSoonMovie;
  };

  const getTheaterTabData = () => {
    return currentTheaterTab === 1 ? nearbyTheater : mostRateTheater;
  };

  const errorHandler = (error) => {
    setMovieLoading(false);
    toast.error(error.message, { autoClose: 3000, theme: 'colored' });
  };

  const listMovieNowShowing = async () => {
    const response = await apiCaller({
      request: movieApi.listMovieNowShowing({
        limit: 10,
        page: 1,
      }),
      errorHandler,
    });

    if (response) {
      console.log('Now Showing');
      setNowShowingMovie(response?.data);
    }
  };

  const listMovieComingSoon = async () => {
    const response = await apiCaller({
      request: movieApi.listMovieComingSoon({
        limit: 10,
        page: 1,
      }),
      errorHandler,
    });

    if (response) {
      console.log('Coming Soon');
      setComingSoonMovie(response?.data);
    }
  };

  const listNearbyTheater = async (latitude, longitude) => {
    if (!latitude || !latitude) return;

    const response = await apiCaller({
      request: theaterApi.listNearbyTheater({
        latitude,
        longitude,
      }),
      errorHandler,
    });

    if (response) {
      console.log('Nearby');
      setNearbyTheater(response?.data);
    }
  };

  const listMostRateTheater = async () => {
    const response = await apiCaller({
      request: theaterApi.listMostRateTheater(),
      errorHandler,
    });

    if (response) {
      console.log('Most Rate');
      setMostRateTheater(response?.data);
    }
  };

  const getData = async (ofTheater, lat, lng) => {
    if (ofTheater) {
      setTheaterLoading(true);

      await Promise.all([Promise.resolve(listNearbyTheater(lat, lng)), Promise.resolve(listMostRateTheater())]).then(
        () => {
          setTheaterLoading(false);
          if (!lat || !lng) setCurrentTheaterTab(2);
        },
      );
    } else {
      setMovieLoading(true);

      await Promise.all([Promise.resolve(listMovieNowShowing()), Promise.resolve(listMovieComingSoon())]).then(() => {
        setMovieLoading(false);
      });
    }
  };

  // Gọi API lấy danh sách movie
  useEffect(() => {
    getData();
  }, []);

  // Lấy tọa độ hiện tại của mình
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (data) => getData(true, data.coords.latitude, data.coords.longitude), // success
        () => getData(true), // Error - Từ chối
      );
    }
  }, []);

  return (
    <section className="banner">
      {/* Banner */}
      <div className="" id="home-slide">
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {banners.map((banner, idx) => (
              <div key={idx} className={`carousel-item ${idx === 0 ? 'active' : ''}`} data-bs-interval="10000">
                <img src={banner} className="d-block w-100 rounded-0" alt="image" />
              </div>
            ))}
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

      {/* Movies */}
      <div className="container mt-4 mb-1">
        <div className="d-flex flex-column w-100">
          {/* Tiêu đề và tab Đang chiếu | Sắp chiếu */}
          <div className="d-flex align-items-center justify-content-start">
            <h2 className="fw-bold border-5 border-start border-primary ps-2 me-5">PHIM</h2>
            <Tabs
              size="large"
              defaultActiveKey="1"
              items={[
                {
                  key: 1,
                  label: 'Đang chiếu',
                  disabled: movieLoading,
                },
                {
                  key: 2,
                  label: 'Sắp chiếu',
                  disabled: movieLoading,
                },
              ]}
              onChange={onMovieChange}
            />
          </div>

          {/* Data movie tương ứng */}
          <div className="row row-cols-5 gy-4 justify-content-between mb-3">
            {movieLoading ? (
              Array(5)
                .fill(1)
                .map((_e, idx) => (
                  <Skeleton.Input active key={idx} style={{ height: 380, width: 240 }} className="rounded-3" />
                ))
            ) : getMovieTabData()?.length === 0 ? (
              <div className="container h-5">
                <div className="fs-4 fw-bold my-5">Hiện tại chưa có lịch chiếu tương ứng!</div>
              </div>
            ) : (
              getMovieTabData()?.map((movie) => (
                <div key={movie._id}>
                  <Card
                    hoverable={false}
                    style={{ width: 240, padding: 0 }}
                    bodyStyle={{ padding: 0, backgroundColor: '#e4edf2' }}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('a');
                    }}
                    cover={
                      <div className="position-relative">
                        <Image
                          alt=""
                          src={movie.poster}
                          height={340}
                          width={'100%'}
                          className="rounded-3"
                          preview={{
                            visible: false,
                            mask: (
                              <div className="d-flex flex-column">
                                <Button
                                  className="mb-3"
                                  type="primary"
                                  icon={<i className="fa-solid fa-video"></i>}
                                  size="large"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setModalOpen(movie.trailer);
                                  }}
                                >
                                  Trailer
                                </Button>
                                <Button size="large" ghost icon={<i className="fa-solid fa-ticket"></i>}>
                                  Đặt vé
                                </Button>
                              </div>
                            ),
                          }}
                        />

                        <div
                          style={{ minWidth: 35 }}
                          className="position-absolute top-0 end-0 m-2 px-1 bg-warning text-white fw-bold rounded-3 text-center"
                        >
                          {movie.ageType}
                        </div>
                      </div>
                    }
                  >
                    <div className="pe-auto cusor-pointer">
                      <Meta className="pb-1 pt-2" description={movie.genres.join(', ')} />
                      <Meta className="pb-3" title={movie.title} />
                    </div>
                  </Card>
                </div>
              ))
            )}
          </div>

          {/* Nút xem thêm */}
          {getMovieTabData()?.length >= 10 && (
            <div className="text-center mb-5 mt-3">
              <Button type="primary" size="large" style={{ width: '20%' }}>
                Xem thêm
                <i className="ms-2 fa-solid fa-chevron-right fs-6" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Theaters */}
      <div className="container mb-1">
        <div className="d-flex flex-column w-100">
          {/* Tiêu đề và tab Ở gần | Nổi bật */}
          <div className="d-flex align-items-center justify-content-start">
            <h2 className="fw-bold border-5 border-start border-primary ps-2 me-5">RẠP</h2>
            <Tabs
              size="large"
              defaultActiveKey="1"
              items={[
                {
                  key: 1,
                  label: 'Gần đây',
                  disabled: theaterLoading,
                },
                {
                  key: 2,
                  label: 'Nổi bật',
                  disabled: theaterLoading,
                },
              ]}
              onChange={onTheaterChange}
            />
          </div>

          {/* Data movie tương ứng */}
          <div className="row row-cols-5 gy-4 justify-content-between mb-5">
            {theaterLoading ? (
              Array(5)
                .fill(1)
                .map((_e, idx) => (
                  <Skeleton.Input key={idx} style={{ height: 380, width: 240 }} className="rounded-3" />
                ))
            ) : getTheaterTabData()?.length === 0 ? (
              <div className="container h-5">
                <div className="fs-4 fw-bold my-5">Không có rạp thỏa mãn!</div>
              </div>
            ) : (
              getTheaterTabData()?.map((theater) => (
                <div key={theater._id}>
                  <Card
                    hoverable
                    style={{ width: 250, paddingLeft: 0 }}
                    bodyStyle={{ padding: 0 }}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('a');
                    }}
                    cover={
                      <div className="position-relative w-100">
                        <Image
                          alt=""
                          src={theater.images?.at(0) ?? NO_IMAGE}
                          height={250}
                          width={250}
                          preview={false}
                        />

                        <div className="position-absolute top-0 end-0 m-2 px-2 bg-warning text-white fw-bold rounded-3 text-center">
                          {theater.ratingAverage ?? 0}
                          <i className="ms-1 fa-solid fa-star"></i>
                        </div>

                        {theater.distance && (
                          <div className="position-absolute bottom-0 end-0 m-2 px-2 bg-success text-white fw-bold rounded-3 text-center">
                            {(theater.distance / 1000).toFixed(2)}
                            {' km'}
                          </div>
                        )}
                      </div>
                    }
                  >
                    <div className="pe-auto cusor-pointer px-1">
                      <h6 className="pb-1 pt-2 max-2-lines fw-bold">{theater.name}</h6>
                      <small className="pb-3 max-3-lines text-muted" style={{ minHeight: 80 }}>
                        {theater.address}
                      </small>
                    </div>
                  </Card>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Popup trailer */}
      {modalOpen && (
        <Modal
          footer={null}
          closeIcon={false}
          centered
          width={'70%'}
          open
          className="modal-trailer"
          onCancel={() => setModalOpen('')}
        >
          <iframe
            style={{ width: '100%', height: '60vh', borderRadius: '6px' }}
            src={getEmbedYoutubeURL(modalOpen)}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        </Modal>
      )}
      <ToastContainer theme="colored" newestOnTop />
    </section>
  );
}

export default HomePage;
