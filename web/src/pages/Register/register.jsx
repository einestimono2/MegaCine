import React from 'react';
import './register.scss';
import ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="half bg">
      <div className="login-form"></div>
      <div className="contents">
        <div className="container">
          <div className="row align-items-center justify-content-center" style={{ width: '100%' }}>
            <div className="col-md-5">
              <div className="loginForm">
                <div className="mb-4">
                  <h3 className="loginTitle">ĐĂNG KÝ</h3>
                </div>
                <form action="#" method="post">
                  <div className="form-group first mb-3">
                    <label htmlFor="name"> Họ và tên</label>
                    <input type="text" className="form-control" id="name" required />
                  </div>
                  <div className="form-group first mb-3">
                    <label htmlFor="phone"> Số điện thoại</label>
                    <input type="text" className="form-control" id="phone" required />
                  </div>
                  <div className="form-group first mb-3">
                    <label htmlFor="username"> Email</label>
                    <input type="text" className="form-control" id="email" required />
                  </div>
                  <div className="form-group last mb-3">
                    <label htmlFor="password"> Mật khẩu</label>
                    <input type="password" className="form-control" id="password" required />
                  </div>

                  <div className="d-flex mb-3 align-items-center" style={{ justifyContent: 'space-between' }}>
                    {/* <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheck"/>
              <label className="form-check-label remember-me" for="flexCheck">
                Nhớ tài khoản
              </label>
            </div> */}
                    <span className="">
                      <Link to={ROUTES.LOGIN} className="forgot-pass">
                        {' '}
                        Đã có tài khoản
                      </Link>
                    </span>
                  </div>

                  <div className="group-button">
                    <input type="submit" value="Đăng ký" className="btn btn-block btn-login col-md-5" />
                    <Link
                      to={ROUTES.LOGIN}
                      className="btn btn-block btn-register col-md-5"
                      style={{ textDecoration: 'none' }}
                    >
                      Đăng nhập
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
