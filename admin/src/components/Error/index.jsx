import React from 'react';
import { Image, Button } from 'antd';

import { ERROR_IMAGE } from '../../constants/images';

export default function Error(props) {
  return (
    <div className="text-center my-28">
      <Image className="rounded-[3.5px]" preview={false} src={ERROR_IMAGE} />
      <div className="text-center text-[#FF0000] font-bold text-2xl">{props.message}</div>
      <Button className="mt-12 w-[15%]" size="large" type="primary" danger onClick={props.onClick}>
        Thử lại
      </Button>
    </div>
  );
}
