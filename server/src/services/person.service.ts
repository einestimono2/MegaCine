import { type Request } from 'express';
import { type Types, isValidObjectId } from 'mongoose';

import { Message, PERSON_UPLOAD_FOLDER, Roles } from '../constants';
import { type IUpdatePersonRequest, type IPerson } from '../interfaces';
import { NotFoundError, PersonModel } from '../models';
import { convertRequestToPipelineStages } from '../utils';
import { cloudinaryServices } from '.';

export const createPerson = async (person: IPerson) => {
  const newPerson = new PersonModel(person);

  if (person.avatar) {
    newPerson.avatar = await cloudinaryServices.uploadImage({
      public_id: newPerson._id,
      folder: PERSON_UPLOAD_FOLDER,
      file: person.avatar
    });
  }

  return await newPerson.save().catch(async (err) => {
    await cloudinaryServices.destroy({
      public_id: newPerson._id,
      folder: PERSON_UPLOAD_FOLDER
    });

    throw err;
  });
};

export const getOrCreatePerson = async (key: string) => {
  let person: IPerson & { _id: Types.ObjectId };

  // Do tên có thể trùng nên tạo mới luôn
  if (!isValidObjectId(key)) {
    // // Tạo mới nếu không tìm thấy
    // // setDefaultsOnInsert: true cho phép sử dụng các giá trị mặc định được định nghĩa trong Mongoose schema khi chèn một tài liệu mới.
    // person = await PersonModel.findOneAndUpdate(
    //   { fullName: key },
    //   {
    //     $setOnInsert: {
    //       fullName: key
    //     }
    //   },
    //   { upsert: true, new: true, setDefaultsOnInsert: true }
    // );

    person = new PersonModel({ fullName: key });
    await person.save();
  } else {
    person = await getPersonById(key);
  }

  return person;
};

export const getPersonById = async (id: string) => {
  const person = await PersonModel.findById(id);
  if (!person) {
    throw new NotFoundError(Message.PERSON_NOT_FOUND);
  }

  return person;
};

// Xử lý các trường đa ngữ
export const getPersonDetails = async (req: Request) => {
  const id = req.params.id;
  const lang = req.getLocale();
  const isManagerOrAdmin = req.userPayload?.role === Roles.Manager || req.userPayload?.role === Roles.Admin;

  const person = await PersonModel.findById(id, {
    fullName: 1,
    avatar: 1,
    summary: isManagerOrAdmin ? 1 : `$summary.${lang}`,
    createdAt: 1
  })
    .populate('movies', {
      title: 1,
      originalTitle: 1,
      poster: 1,
      releaseDate: 1,
      duration: 1,
      ageType: 1
    })
    .lean();
  if (!person) {
    throw new NotFoundError(Message.PERSON_NOT_FOUND);
  }

  return person;
};

export const getPersons = async (req: Request) => {
  const isManager = req.userPayload?.role !== Roles.User;

  const options = convertRequestToPipelineStages({
    req,
    fieldsApplySearch: ['fullName'],
    localizationFields: isManager ? undefined : ['summary']
  });

  return await PersonModel.aggregate(options);
};

export const updatePerson = async (id: string, newPerson: IUpdatePersonRequest) => {
  // Xóa ảnh mới khỏi obj nếu có
  const avatar = newPerson.avatar;
  if (avatar) delete newPerson.avatar;

  const person = await getPersonById(id);

  Object.assign(person, newPerson);
  await person.validate();

  if (avatar)
    person.avatar = await cloudinaryServices.uploadImage({
      public_id: person._id,
      file: avatar,
      folder: PERSON_UPLOAD_FOLDER
    });

  return await person.save();
};

export const deletePerson = async (id: string) => {
  const doc = await PersonModel.findByIdAndDelete(id);
  if (!doc) {
    throw new NotFoundError(Message.PERSON_NOT_FOUND);
  }
};

export const deleteMovieFromPerson = async (id: string, movieId: string) => {
  const person = await getPersonById(id);

  const idx = person.movies.findIndex((e) => e === movieId);

  if (idx !== -1) {
    person.movies.splice(idx, 1);
    await person.save();
  }
};
