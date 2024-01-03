import React from 'react';
import './login.scss';
import ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="half bg">
      <div className="login-form"></div>
      <div className="contents">
        <div className="container">
          <div className="row align-items-center justify-content-center" style={{ width: '100%' }}>
            <div className="col-md-5">
              <div className="loginForm">
                <div className="mb-4">
                  <h3 className="loginTitle">ĐĂNG NHẬP</h3>
                </div>
                <form action="#" method="post">
                  <div className="form-group first mb-3">
                    <label htmlFor="username"> Email</label>
                    <input type="text" className="form-control" id="email" required />
                  </div>
                  <div className="form-group last mb-3">
                    <label htmlFor="password"> Mật khẩu</label>
                    <input type="password" className="form-control" id="password" required />
                  </div>

                  <div className="d-flex mb-3 align-items-center" style={{ justifyContent: 'space-between' }}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheck" />
                      <label className="form-check-label remember-me" htmlFor="flexCheck">
                        Nhớ tài khoản
                      </label>
                    </div>
                    <span className="">
                      <a href="#" className="forgot-pass">
                        {' '}
                        Quên mật khẩu
                      </a>
                    </span>
                  </div>

                  <div className="group-button">
                    <input type="submit" value="Đăng nhập" className="btn btn-block btn-login col-md-5" />
                    <Link
                      to={ROUTES.REGISTER}
                      className="btn btn-block btn-register col-md-5"
                      style={{ textDecoration: 'none' }}
                    >
                      Đăng ký
                    </Link>
                  </div>
                  <span className="d-block my-4 text-center text-muted">&mdash; hoặc &mdash;</span>

                  <div className="social-login">
                    <a href="#" className="facebook btn d-flex justify-content-center align-items-center">
                      <span className="icon-facebook mr-3"></span> Đăng nhập với Facebook
                    </a>
                    <a href="#" className="google btn d-flex justify-content-center align-items-center">
                      <span className="icon-google mr-3"></span> Đăng nhập với Google
                    </a>
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
export default Login;
