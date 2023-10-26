import { type NextFunction, type Request, type Response } from 'express';

import { CatchAsyncError } from '../middlewares';
import { HttpStatusCode } from '../constants';
import { productServices } from '../services';

//! Create Product
export const createProduct = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const product = await productServices.createProduct(
    { ...req.body, theater: req.userPayload?.theater },
    req.file?.path
  );

  res.status(HttpStatusCode.CREATED_201).json({
    status: 'success',
    data: { product }
  });
});

//! Update Product
export const updateProduct = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const product = await productServices.updateProduct(req.params.id, { ...req.body, image: req.file?.path });

  res.status(HttpStatusCode.CREATED_201).json({
    status: 'success',
    data: { product }
  });
});

//! Delete Product
export const deleteProduct = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  await productServices.deleteProduct(req.params.id);

  res.status(HttpStatusCode.OK_200).json({
    status: 'success'
  });
});

//! Get Product Info
export const getProduct = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const prodcut = await productServices.getProductDetails(req.params.id, req.getLocale());

  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: { prodcut }
  });
});

//! Get List Product
export const getProducts = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await productServices.getProducts(req); // [ { extra: {}, data: [] } ]

  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: {
      extra: payload?.extra ?? { totalCount: 0 },
      products: payload?.data ?? []
    }
  });
});

//! Get List Product
export const getProductsByTheater = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await productServices.getProductsByTheater(req); // [ { extra: {}, data: [] } ]

  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: {
      extra: payload?.extra ?? { totalCount: 0 },
      products: payload?.data ?? []
    }
  });
});
