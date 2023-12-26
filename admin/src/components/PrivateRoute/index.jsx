import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../constants/router';

export default function PrivateRouter(props) {
  const access_token = localStorage.getItem('access_token');
  const { children } = props;
  const navigate = useNavigate();
  const onClick = () => {
    navigate(ROUTE.SIGNIN);
  };
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
