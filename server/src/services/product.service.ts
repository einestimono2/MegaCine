import { type Request } from 'express';

import { Message } from '../constants';
import { type IUpdateProductRequest, type IProduct } from '../interfaces';
import { NotFoundError, ProductModel } from '../models';
import { convertRequestToPipelineStages, convertToMongooseId } from '../utils';
import { cloudinaryServices } from '.';

export const createProduct = async (product: IProduct, image?: string) => {
  if (!product.theater) {
    throw new NotFoundError(Message.MANAGER_THEATER_EMPTY);
  }

  // Upload ảnh
  if (image) {
    product.image = await cloudinaryServices.uploadImage(image, 'products');
  }

  const newProduct = new ProductModel(product);
  return await newProduct.save().catch(async (err) => {
    await cloudinaryServices.destroy(product.image.public_id);

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

  return await ProductModel.aggregate(matchPipeline).append(options);
};

export const updateProduct = async (id: string, newProduct: IUpdateProductRequest) => {
  const product = await getProductById(id);

  if (newProduct.name) product.name = newProduct.name;
  if (newProduct.description) {
    try {
      product.description = JSON.parse(newProduct.description);
    } catch (_) {}
  }
  if (newProduct.image)
    product.image = await cloudinaryServices.replaceImage(product.image.public_id, newProduct.image, 'products');
  if (newProduct.price) product.price = newProduct.price;
  if (newProduct.isActive) product.isActive = newProduct.isActive;

  return await product.save();
};

export const deleteProduct = async (id: string) => {
  const product = await getProductById(id);

  // Xóa ảnh trên cloudinary
  await cloudinaryServices.destroy(product.image.public_id);

  await product.deleteOne();
};
