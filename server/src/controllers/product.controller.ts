import { type NextFunction, type Request, type Response } from 'express';

import { CatchAsyncError } from '../middlewares';
import { productServices } from '../services';

//! Create Product
export const createProduct = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const product = await productServices.createProduct({ ...req.body, theater: req.userPayload?.theater });

  res.sendCREATED({
    data: product
  });
});

//! Update Product
export const updateProduct = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const product = await productServices.updateProduct(req.params.id, { ...req.body });

  res.sendCREATED({
    data: product
  });
});

//! Delete Product
export const deleteProduct = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  await productServices.deleteProduct(req.params.id);

  res.sendOK();
});

//! Get Product Info
export const getProduct = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const product = await productServices.getProductDetails(req.params.id, req.getLocale());

  res.sendOK({
    data: product
  });
});

//! Get List Product
export const getProducts = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await productServices.getProducts(req); // [ { extra: {}, data: [] } ]

  res.sendOK({
    data: payload?.data ?? [],
    extra: payload?.extra ?? { totalCount: 0 }
  });
});

//! Get List Product
export const getProductsByTheater = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await productServices.getProductsByTheater(req); // [ { extra: {}, data: [] } ]

  res.sendOK({
    data: payload?.data ?? [],
    extra: payload?.extra ?? { totalCount: 0 }
  });
});
