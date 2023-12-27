import React from 'react';
import './schedule.scss';
function Schedule() {
    return <section className='schedule'>
        <div className='container-fluid' id='background-schedule'>
            <p className='title-schedule'>Lịch chiếu</p>
        </div>
        <div className='container main-schedule'>
        <div class="d-flex align-items-start col-md-12">
            {/* Danh sách thành phố */}
            <div class="nav flex-column nav-pills me-3 col-md-2" id="city-tab" role="tablist" aria-orientation="vertical">
                <button class="nav-link disable-button" disabled>Khu vực</button>
                <button class="nav-link button-schedule active" id="hn-tab" data-bs-toggle="pill" data-bs-target="#hn" type="button" role="tab" aria-controls="hn" aria-selected="true">Hà Nội</button>
                <button class="nav-link button-schedule" id="hcm-tab" data-bs-toggle="pill" data-bs-target="#hcm" type="button" role="tab" aria-controls="hcm" aria-selected="false">Hồ Chí Minh</button>
                <button class="nav-link button-schedule" id="hcm-tab" data-bs-toggle="pill" data-bs-target="#dn" type="button" role="tab" aria-controls="dn" aria-selected="false">Đà Nẵng</button>
                <button class="nav-link button-schedule" id="hcm-tab" data-bs-toggle="pill" data-bs-target="#bn" type="button" role="tab" aria-controls="bn" aria-selected="false">Bắc Ninh</button>
                <button class="nav-link button-schedule" id="hcm-tab" data-bs-toggle="pill" data-bs-target="#nb" type="button" role="tab" aria-controls="nb" aria-selected="false">Ninh Bình</button>
            </div>
            {/* Danh sách rạp có trong thành phố đó */}
            <div class="tab-content col-md-10" id="city-tabContent">
                <div class="tab-pane fade show active" id="hn" role="tabpanel" aria-labelledby="hn-tab">
                    <div className='container'>
                        <div class="d-flex align-items-start col-md-12">
                            <div class="nav flex-column nav-pills me-3 col-md-3" id="cinema-city-tab" role="tablist" aria-orientation="vertical">
                                {/* Tên rạp */}
                                <button class="nav-link disable-button" disabled>Rạp Tee</button>
                                {/* Tên cơ sở của rạp đó */}
                                <button class="nav-link button-schedule active" id="cinema-hn-tab" data-bs-toggle="pill" data-bs-target="#cinema-hn" type="button" role="tab" aria-controls="cinema-hn" aria-selected="true">Tee</button>
                                <button class="nav-link disable-button" disabled>Rạp Ruồi</button>
                                <button class="nav-link button-schedule" id="cinema-hn2-tab" data-bs-toggle="pill" data-bs-target="#cinema-hn2" type="button" role="tab" aria-controls="cinema-hn2" aria-selected="false">Bách Ruồi</button>
                            </div>
                            <div class="tab-content col-md-9" id="cinema-city-tabContent">
                                <div class="tab-pane fade show active" id="cinema-hn" role="tabpanel" aria-labelledby="cinema-hn-tab">
                                {/* Lịch chiếu tại cơ sở của rạp đó */}
                                <ul class="nav nav-pills mb-3" id="schedule-time" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link button-schedule active" id="time-tab-1" data-bs-toggle="pill" data-bs-target="#time-1" type="button" role="tab" aria-controls="time-1" aria-selected="true">20/12 <br /> Th 4</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link button-schedule" id="time-tab-2" data-bs-toggle="pill" data-bs-target="#time-2" type="button" role="tab" aria-controls="time-2" aria-selected="false">21/12 <br /> Th 5</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link button-schedule" id="time-tab-3" data-bs-toggle="pill" data-bs-target="#time-3" type="button" role="tab" aria-controls="time-3" aria-selected="false">22/12 <br /> Th 6</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link button-schedule" id="time-tab-3" data-bs-toggle="pill" data-bs-target="#time-3" type="button" role="tab" aria-controls="time-3" aria-selected="false">23/12 <br /> Th 7</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link button-schedule" id="time-tab-3" data-bs-toggle="pill" data-bs-target="#time-3" type="button" role="tab" aria-controls="time-3" aria-selected="false">24/12 <br /> CN</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link button-schedule" id="time-tab-3" data-bs-toggle="pill" data-bs-target="#time-3" type="button" role="tab" aria-controls="time-3" aria-selected="false">25/12 <br /> Th 2</button>
                                    </li>
                                </ul>
                                {/* Chi tiết lịch chiếu của cơ sở của rạp đó */}
                                    <div class="tab-content" id="schedule-timeContent">
                                        <div class="tab-pane fade show active" id="time-1" role="tabpanel" aria-labelledby="time-tab-1">
                                            <div className='container notice-schedule'>
                                                <p className='notice-text'><i class="fa-solid fa-circle-info"></i> Nhấn vào suất chiếu để tiến hành mua vé</p>
                                            </div>
                                            <div className='theater-detail mt-3 mb-3'>
                                                <p className='theater-name'>Tee Cinema Bắc Ninh <span style={{color: "var(--border-color-dark)"}}>Thứ 4, 20/12/2023</span></p>
                                                <p className='theater-address'>Địa chỉ: số 10, ngõ Thống Nhất, Đại La, phường Trương Định, quận Hai Bà Trưng, Hà Nội</p>
                                            </div>
                                            <div class="card mb-3">
                                                <div class="row g-0">
                                                    <div class="col-md-4">
                                                    <img src="/assets/images/poster.jpeg" class="img-fluid rounded-start" alt="images"/>
                                                    </div>
                                                    <div class="col-md-8">
                                                    <div class="card-body">
                                                        <h5 class="card-title">The Creator</h5>
                                                        <p class="card-text description-film">The creator the film produced by hoangDieu director.</p>
                                                        <p class="card-text"><small class="text-muted">Thể loại: Hành động | Thời lượng: 128p</small></p>
                                                        <div className='container-fluid'>
                                                            <button className='btn btn-time' disabled>9:30 <br /> <span style={{fontSize: "0.8rem",color: "var(--border-color-dark)"}}>45k</span></button>
                                                            <button className='btn btn-time' disabled>10:15 <br /> <span style={{fontSize: "0.8rem",color: "var(--border-color-dark)"}}>45k</span></button>
                                                            <button className='btn btn-time' disabled>11:00 <br /> <span style={{fontSize: "0.8rem",color: "var(--border-color-dark)"}}>45k</span></button>
                                                            <button className='btn btn-time'>11:45 <br /> <span style={{fontSize: "0.8rem",color: "var(--border-color-dark)"}}>45k</span></button>
                                                            <button className='btn btn-time'>12:30 <br /> <span style={{fontSize: "0.8rem",color: "var(--border-color-dark)"}}>45k</span></button>
                                                            <button className='btn btn-time'>13:15 <br /> <span style={{fontSize: "0.8rem",color: "var(--border-color-dark)"}}>45k</span></button>
                                                            <button className='btn btn-time'>14:00 <br /> <span style={{fontSize: "0.8rem",color: "var(--border-color-dark)"}}>45k</span></button>
                                                            <button className='btn btn-time'>14:45 <br /> <span style={{fontSize: "0.8rem",color: "var(--border-color-dark)"}}>45k</span></button>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card mb-3">
                                                <div class="row g-0">
                                                    <div class="col-md-4">
                                                    <img src="/assets/images/poster2.jpg" class="img-fluid rounded-start" alt="images"/>
                                                    </div>
                                                    <div class="col-md-8">
                                                    <div class="card-body">
                                                        <h5 class="card-title">Trạng Tuệ</h5>
                                                        <p class="card-text description-film">Trạng Tuệ với trí thông minh vượt xa tầm hiểu biết của loài người.</p>
                                                        <p class="card-text"><small class="text-muted">Thể loại: Tâm lý, tình cảm | Thời lượng: 165p</small></p>
                                                        <div className='container-fluid'>
                                                            <button className='btn btn-time' disabled>9:30 <br /> <span style={{fontSize: "0.8rem",color: "var(--border-color-dark)"}}>45k</span></button>
                                                            <button className='btn btn-time' disabled>10:15 <br /> <span style={{fontSize: "0.8rem",color: "var(--border-color-dark)"}}>45k</span></button>
                                                            <button className='btn btn-time' disabled>11:00 <br /> <span style={{fontSize: "0.8rem",color: "var(--border-color-dark)"}}>45k</span></button>
                                                            <button className='btn btn-time'>11:45 <br /> <span style={{fontSize: "0.8rem",color: "var(--border-color-dark)"}}>45k</span></button>
                                                            <button className='btn btn-time'>12:30 <br /> <span style={{fontSize: "0.8rem",color: "var(--border-color-dark)"}}>45k</span></button>
                                                            <button className='btn btn-time'>13:15 <br /> <span style={{fontSize: "0.8rem",color: "var(--border-color-dark)"}}>45k</span></button>
                                                            <button className='btn btn-time'>14:00 <br /> <span style={{fontSize: "0.8rem",color: "var(--border-color-dark)"}}>45k</span></button>
                                                            <button className='btn btn-time'>14:45 <br /> <span style={{fontSize: "0.8rem",color: "var(--border-color-dark)"}}>45k</span></button>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="time-2" role="tabpanel" aria-labelledby="time-tab-2">Thứ 5</div>
                                        <div class="tab-pane fade" id="time-3" role="tabpanel" aria-labelledby="time-tab-3">Thứ 6</div>
                                    </div>
                                </div>
                                
                                <div class="tab-pane fade" id="cinema-hn2" role="cinema-tabpanel" aria-labelledby="cinema-hn2-tab">
                                    Ruồi Cinema
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="tab-pane fade" id="hcm" role="tabpanel" aria-labelledby="hcm-tab">
                    <div className='container'>
                        <div class="d-flex align-items-start col-md-12">
                            <div class="nav flex-column nav-pills me-3 col-md-3" id="cinema-city-tab2" role="tablist" aria-orientation="vertical">
                                <button class="nav-link button-schedule active" id="cinema-hn-tab2" data-bs-toggle="pill" data-bs-target="#cinema-hn2" type="button" role="tab" aria-controls="cinema-hn2" aria-selected="true">Hoàng Diệu</button>
                                <button class="nav-link button-schedule" id="cinema-hn2-tab2" data-bs-toggle="pill" data-bs-target="#cinema-hn22" type="button" role="tab" aria-controls="cinema-hn22" aria-selected="false">Sột Sồi</button>
                            </div>
                            <div class="tab-content col-md-9" id="cinema-city-tabContent2">
                                <div class="tab-pane fade show active" id="cinema-hn2" role="tabpanel" aria-labelledby="cinema-hn-tab2">
                                    HD Cinema
                                </div>
                                
                                <div class="tab-pane fade" id="cinema-hn22" role="cinema-tabpanel" aria-labelledby="cinema-hn2-tab2">
                                    Sồi Cinema
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </section>
}

export default Schedule;