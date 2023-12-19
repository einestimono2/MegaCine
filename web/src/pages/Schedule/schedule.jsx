import React from 'react';
import './schedule.scss';
function Schedule() {
    return <section className='schedule'>
        <div className='container'>
        <div class="d-flex align-items-start">
            <div class="nav flex-column nav-pills me-3" id="city-tab" role="tablist" aria-orientation="vertical">
                <button class="nav-link active" id="hn-tab" data-bs-toggle="pill" data-bs-target="#hn" type="button" role="tab" aria-controls="hn" aria-selected="true">Hà Nội</button>
                <button class="nav-link" id="hcm-tab" data-bs-toggle="pill" data-bs-target="#hcm" type="button" role="tab" aria-controls="hcm" aria-selected="false">Hồ Chí Minh</button>
            </div>
            <div class="tab-content" id="city-tabContent">
                <div class="tab-pane fade show active" id="hn" role="tabpanel" aria-labelledby="hn-tab">
                    <div className='container'>
                        <div class="d-flex align-items-start">
                            <div class="nav flex-column nav-pills me-3" id="cinema-city-tab" role="tablist" aria-orientation="vertical">
                                <button class="nav-link active" id="cinema-hn-tab" data-bs-toggle="pill" data-bs-target="#cinema-hn" type="button" role="tab" aria-controls="cinema-hn" aria-selected="true">Tee</button>
                                <button class="nav-link" id="cinema-hn2-tab" data-bs-toggle="pill" data-bs-target="#cinema-hn2" type="button" role="tab" aria-controls="cinema-hn2" aria-selected="false">Bách Ruồi</button>
                            </div>
                            <div class="tab-content" id="cinema-city-tabContent">
                                <div class="tab-pane fade show active" id="cinema-hn" role="tabpanel" aria-labelledby="cinema-hn-tab">
                                    Tee Cinema
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
                        <div class="d-flex align-items-start">
                            <div class="nav flex-column nav-pills me-3" id="cinema-city-tab2" role="tablist" aria-orientation="vertical">
                                <button class="nav-link active" id="cinema-hn-tab2" data-bs-toggle="pill" data-bs-target="#cinema-hn2" type="button" role="tab" aria-controls="cinema-hn2" aria-selected="true">Hoàng Diệu</button>
                                <button class="nav-link" id="cinema-hn2-tab2" data-bs-toggle="pill" data-bs-target="#cinema-hn22" type="button" role="tab" aria-controls="cinema-hn22" aria-selected="false">Sột Sồi</button>
                            </div>
                            <div class="tab-content" id="cinema-city-tabContent2">
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