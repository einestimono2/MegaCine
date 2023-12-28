import React from 'react';
import './register.scss';
import ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

function Register() {
  return <div class="half bg">
  <div class="login-form"></div>
  <div class="contents">
    <div class="container">
      <div class="row align-items-center justify-content-center" style={{width: "100%"}}>
        <div class="col-md-5">
          <div className='loginForm'>
          <div class="mb-4">
            <h3 className='loginTitle'>ĐĂNG KÝ</h3>
      
          </div>
          <form action="#" method="post">
          <div class="form-group first mb-3">
              <label for="name"> Họ và tên</label>
              <input type="text" class="form-control" id="name" required/>
            </div>
            <div class="form-group first mb-3">
              <label for="phone"> Số điện thoại</label>
              <input type="text" class="form-control" id="phone" required/>
            </div>
            <div class="form-group first mb-3">
              <label for="username"> Email</label>
              <input type="text" class="form-control" id="email" required/>
            </div>
            <div class="form-group last mb-3">
              <label for="password"> Mật khẩu</label>
              <input type="password" class="form-control" id="password" required/>
              
            </div>
            
            <div class="d-flex mb-3 align-items-center" style={{justifyContent: "space-between"}}>
              {/* <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheck"/>
              <label class="form-check-label remember-me" for="flexCheck">
                Nhớ tài khoản
              </label>
            </div> */}
            <span class=""><Link to={ROUTES.LOGIN} class="forgot-pass"> Đã có tài khoản</Link></span> 
            </div>

            <div className='group-button'>
              <input type="submit" value="Đăng ký" class="btn btn-block btn-login col-md-5"/>
              <Link to={ROUTES.LOGIN} class="btn btn-block btn-register col-md-5" style={{textDecoration:"none"}}>
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
}
export default Register;