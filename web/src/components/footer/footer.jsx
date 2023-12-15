import React from 'react';
import './footer.scss';

function Footer() {
  return <div className='footer'>
    <div className='row'>
        <div className='col-md-2'>
            <div className='container'>
                <img src="/assets/images/logo-megacine.png" alt="" />
            </div>
        </div>
        <div className='col-md-4'>
            <p className='title-info'>Công ty TNHH Đức Tee</p>
            <p className='info-footer'>Số ĐKKD: 0961739454 <br />
            Đăng ký lần đầu ngày 13/12/2023 <br />
            Địa chỉ: 10 Thống Nhất, P. Trương Định, Q. Hai Bà Trưng, Tp. Hà Nội <br />
            </p>
        </div>
        <div className='col-md-4'>
            <p className='title-info'>Đối tác</p>
            <div className='co-ops'>
                <img className='co-ops-img' src="/assets/images/beta-cineplex-v2.jpg" alt="" />
                <img className='co-ops-img' src="/assets/images/cinemax.png" alt="" />
                <img className='co-ops-img' src="/assets/images/cinestar.png" alt="" />
                <img className='co-ops-img' src="/assets/images/dcine.png" alt="" />
                <img className='co-ops-img' src="/assets/images/mega-gs-cinemas.png" alt="" />
                <img className='co-ops-img' src="/assets/images/beta-cineplex-v2.jpg" alt="" />
                <img className='co-ops-img' src="/assets/images/cinemax.png" alt="" />
                <img className='co-ops-img' src="/assets/images/cinestar.png" alt="" />
                <img className='co-ops-img' src="/assets/images/dcine.png" alt="" />
                <img className='co-ops-img' src="/assets/images/mega-gs-cinemas.png" alt="" />
            </div>
        </div>
        <div className='col-md-2 stamp-container'>
                <img className='stamp' src="/assets/images/stamp.png" alt="" />
        </div>
    </div>
  </div>;
}

export default Footer;