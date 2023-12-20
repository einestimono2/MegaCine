import { type Request } from 'express';

import { Message, PRODUCT_UPLOAD_FOLDER } from '../constants';
import { type IUpdateProductRequest, type IProduct } from '../interfaces';
import { NotFoundError, ProductModel } from '../models';
import { convertRequestToPipelineStages, convertToMongooseId } from '../utils';
import { cloudinaryServices } from '.';

export const createProduct = async (product: IProduct) => {
  if (!product.theater) {
    throw new NotFoundError(Message.MANAGER_THEATER_EMPTY);
  }

  const newProduct = new ProductModel(product);

  // Upload ảnh
  newProduct.image = await cloudinaryServices.uploadImage({
    folder: PRODUCT_UPLOAD_FOLDER,
    public_id: newProduct._id,
    file: product.image
  });

  return await newProduct.save().catch(async (err) => {
    await cloudinaryServices.destroy({
      folder: PRODUCT_UPLOAD_FOLDER,
      public_id: newProduct._id
    });

    throw err;
  });
};

export const getProductById = async (id: string) => {
  const product = await ProductModel.findById(id);
  if (!product) {
    throw new NotFoundError(Message.PRODUCT_NOT_FOUND);
  }

  return product;
};

// Xử lý các trường đa ngữ
export const getProductDetails = async (id: string, lang?: string) => {
  const [product] = await ProductModel.aggregate([
    { $match: { _id: convertToMongooseId(id) } },
    { $set: { description: lang ? `$description.${lang}` : `$description` } }
  ]);
  if (!product) {
    throw new NotFoundError(Message.PRODUCT_NOT_FOUND);
  }

  return product;
};

export const getProducts = async (req: Request) => {
  const options = convertRequestToPipelineStages({
    req,
    fieldsApplySearch: ['name'],
    localizationFields: ['description']
  });

  return await ProductModel.aggregate(options);
};

export const getProductsByTheater = async (req: Request) => {
  const theaterId = req.params.id ?? req.userPayload?.theater;
  if (!theaterId) {
    throw new NotFoundError(Message.MANAGER_THEATER_EMPTY);
  }

  const matchPipeline = [
    {
      $match: { theater: convertToMongooseId(req.userPayload?.theater) }
    }
  ];

  const options = convertRequestToPipelineStages({
    req,
    fieldsApplySearch: ['name'],
    localizationFields: ['description']
  });

  return await ProductModel.aggregate(matchPipeline).append(...options);
};

export const updateProduct = async (id: string, newProduct: IUpdateProductRequest) => {
  // Xóa thumbnail mới khỏi obj nếu có
  const image = newProduct.image;
  if (image) delete newProduct.image;

  const product = await ProductModel.findByIdAndUpdate(id, newProduct, { new: true, runValidators: true });
  if (!product) {
    throw new NotFoundError(Message.PRODUCT_NOT_FOUND);
  }

  if (image) {
    await cloudinaryServices.uploadImage({
      public_id: product._id,
      file: image,
      folder: PRODUCT_UPLOAD_FOLDER
    });
  }

  return product;
};

export const deleteProduct = async (id: string) => {
  const doc = await ProductModel.findByIdAndDelete(id);
  if (!doc) {
    throw new NotFoundError(Message.PRODUCT_NOT_FOUND);
  }
};
