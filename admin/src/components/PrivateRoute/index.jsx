import { Button, Result } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../constants/router';
import { addAddresses } from '../../redux/reducer/signupSlide';

export default function PrivateRouter(props) {
  const access_token = localStorage.getItem('access_token');
  const { children } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClick = () => {
    navigate(ROUTE.SIGNIN);
  };
  const res = async () => {
    const response = await axios.get('https://provinces.open-api.vn/api/?depth=3');
    if (response) {
      dispatch(addAddresses({ addresses: response.data }));
    }
  };
  useEffect(() => {
    res();
  }, []);
  return (
    <div>
      {access_token ? (
        children
      ) : (
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Button type="primary" onClick={onClick}>
              Back Sign In
            </Button>
          }
        />
      )}
    </div>
  );
}
