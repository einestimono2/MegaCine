import { type Request } from 'express';
import { type Types, isValidObjectId } from 'mongoose';

import { Message } from '../constants';
import { type IUpdatePersonRequest, type IPerson } from '../interfaces';
import { NotFoundError, PersonModel } from '../models';
import { convertRequestToPipelineStages, convertToMongooseId } from '../utils';
import { cloudinaryServices } from '.';

export const createPerson = async (person: IPerson, avatar?: string) => {
  if (person.summary && typeof person.summary === 'string') {
    try {
      person.summary = JSON.parse(person.summary);
    } catch (_) {}
  }

  if (avatar) {
    person.avatar = await cloudinaryServices.uploadImage(avatar, 'avatars');
  }

  const newPerson = new PersonModel(person);

  return await newPerson.save().catch(async (err) => {
    await cloudinaryServices.destroy(person.avatar.public_id);

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
export const getPersonDetails = async (id: string, lang?: string) => {
  const [person] = await PersonModel.aggregate([
    { $match: { _id: convertToMongooseId(id) } },
    { $set: { summary: lang ? `$summary.${lang}` : `$summary` } }
  ]);
  if (!person) {
    throw new NotFoundError(Message.PERSON_NOT_FOUND);
  }

  return person;
};

export const getPersons = async (req: Request) => {
  const options = convertRequestToPipelineStages({
    req,
    fieldsApplySearch: ['fullName'],
    localizationFields: ['summary']
  });

  return await PersonModel.aggregate(options);
};

export const updatePerson = async (id: string, newPerson: IUpdatePersonRequest) => {
  const person = await getPersonById(id);

  if (newPerson.fullName) person.fullName = newPerson.fullName;
  if (newPerson.summary) {
    try {
      person.summary = JSON.parse(newPerson.summary);
    } catch (_) {}
  }
  if (newPerson.avatar)
    person.avatar = await cloudinaryServices.replaceImage(person.avatar.public_id, newPerson.avatar, 'people');

  return await person.save();
};

export const deletePerson = async (id: string) => {
  const person = await getPersonById(id);

  // Xóa ảnh trên cloudinary
  await cloudinaryServices.destroy(person.avatar.public_id);

  await person.deleteOne();
};

export const deleteMovieFromPerson = async (id: string, movieId: string) => {
  const person = await getPersonById(id);

  const idx = person.movies.findIndex((e) => e === movieId);

  if (idx !== -1) {
    person.movies.splice(idx, 1);
    await person.save();
  }
};
