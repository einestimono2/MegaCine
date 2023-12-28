import React from 'react';
import './login.scss';
import ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

function Login() {
  return  <div class="half bg">
  <div class="login-form"></div>
  <div class="contents">
    <div class="container">
      <div class="row align-items-center justify-content-center" style={{width: "100%"}}>
        <div class="col-md-5">
          <div className='loginForm'>
          <div class="mb-4">
            <h3 className='loginTitle'>ĐĂNG NHẬP</h3>
      
          </div>
          <form action="#" method="post">
            <div class="form-group first mb-3">
              <label for="username"> Email</label>
              <input type="text" class="form-control" id="email" required/>

            </div>
            <div class="form-group last mb-3">
              <label for="password"> Mật khẩu</label>
              <input type="password" class="form-control" id="password" required/>
              
            </div>
            
            <div class="d-flex mb-3 align-items-center" style={{justifyContent: "space-between"}}>
              <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheck"/>
              <label class="form-check-label remember-me" for="flexCheck">
                Nhớ tài khoản
              </label>
            </div>
            <span class=""><a href="#" class="forgot-pass"> Quên mật khẩu</a></span> 
            </div>

            <div className='group-button'>
              <input type="submit" value="Đăng nhập" class="btn btn-block btn-login col-md-5"/>
              <Link to={ROUTES.REGISTER} class="btn btn-block btn-register col-md-5" style={{textDecoration:"none"}}>
                Đăng ký
              </Link>
            </div>
            <span class="d-block my-4 text-center text-muted">&mdash; hoặc &mdash;</span>
            
            <div class="social-login">
              <a href="#" class="facebook btn d-flex justify-content-center align-items-center">
                <span class="icon-facebook mr-3"></span> Đăng nhập với Facebook
              </a>
              <a href="#" class="google btn d-flex justify-content-center align-items-center">
                <span class="icon-google mr-3"></span> Đăng nhập với Google
              </a>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  
}
export default Login;
