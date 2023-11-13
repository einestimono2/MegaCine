import express from 'express';
import { HttpStatusCode } from '../../constants';
import { omitIsNil } from '../../utils';
import { type ISuccessResponse } from '../../interfaces';

express.response.sendOK = function ({ message, data, extra }: ISuccessResponse = {}) {
  return this.status(HttpStatusCode.OK_200).json(omitIsNil({ status: 'success', message, data, extra }));
};

express.response.sendCREATED = function ({ message, data, extra }: ISuccessResponse = {}) {
  return this.status(HttpStatusCode.CREATED_201).json(omitIsNil({ status: 'success', message, data, extra }));
};
