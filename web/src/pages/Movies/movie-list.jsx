import React from 'react';
import './movie-list.scss';
import { Link } from 'react-router-dom';
import ROUTES from '../../constants/routes';
function MovieList() {
    return <section className='movieList'>
        <div className='container-fluid' id='background-schedule'>
            <p className='title-schedule'>Danh sách phim</p>
        </div>
        <div className='container mb-3'>
            <div className='row mt-3' style={{width: "100%"}}>
                <div className='col-md-2'>
                    <p>Nổi bật</p>
                    <select class="form-select mb-3" aria-label="hot-film">
                        <option selected>Phổ biến</option>
                        <option value="1">Mới nhất</option>
                    </select>
                    <p>Thể loại</p>
                    <select class="form-select mb-3" aria-label="type-film">
                        <option selected>Tất cả</option>
                        <option value="1">Tâm lý - tình cảm</option>
                        <option value="2">Hành động</option>
                        <option value="3">Kinh dị</option>
                        <option value="4">Hoạt hình</option>
                        <option value="5">Cổ trang</option>
                    </select>
                    <p>Ngôn ngữ</p>
                    <select class="form-select mb-3" aria-label="hot-film">
                        <option selected>Tất cả</option>
                        <option value="1">Tiếng Việt</option>
                        <option value="2">Tiếng Trung</option>
                        <option value="3">Tiếng Anh</option>
                        <option value="4">Tiếng Lào</option>
                    </select>
                </div>
                <div className='col-md-10'>
                <div class="row row-cols-1 row-cols-md-6 g-4">
                    <div class="col">
                        <div class="card h-10">
                        <img src="assets/images/poster.jpg" class="card-img-top-movie" alt="..."/>
                        <div class="card-body">
                            <Link to={ROUTES.MOVIEDETAIL}><h5 class="card-title">HD đại chiến Zú To</h5></Link>
                        </div>
                        <div class="card-footer footer-movie">
                            <small class="text-muted">27/12</small>
                            <small class="text-vote"><i class="fa-regular fa-thumbs-up"></i> 90%</small>
                        </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100">
                        <img src="assets/images/poster.jpeg" class="card-img-top-movie" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">The Creator</h5>
                        </div>
                        <div class="card-footer footer-movie">
                            <small class="text-muted">27/12</small>
                            <small class="text-vote"><i class="fa-regular fa-thumbs-up"></i> 90%</small>
                        </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100">
                        <img src="assets/images/poster2.jpg" class="card-img-top-movie" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Trạng Tuệ</h5>
                        </div>
                        <div class="card-footer footer-movie">
                            <small class="text-muted">27/12</small>
                            <small class="text-vote"><i class="fa-regular fa-thumbs-up"></i> 90%</small>
                        </div>
                        </div>
                    </div>
                    
                    </div>
                </div>
            </div>
        </div>
    </section>;
}

export default MovieList;