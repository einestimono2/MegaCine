import { type Request } from 'express';
import mongoose, { type Types, isValidObjectId } from 'mongoose';

import { HttpStatusCode, Message } from '../constants';
import { type IPerson } from '../interfaces';
import { PersonModel } from '../models';
import { ErrorHandler, convertRequestToPipelineStages } from '../utils';

export const createPerson = async (person: IPerson) => {
  const newPerson = new PersonModel(person);

  return await newPerson.save();
};

export const getOrCreatePerson = async (key: string) => {
  let person: IPerson & { _id: Types.ObjectId };

  if (!isValidObjectId(key)) {
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
    throw new ErrorHandler(Message.PERSON_NOT_FOUND, HttpStatusCode.NOT_FOUND_404);
  }

  return person;
};

// Xử lý các trường đa ngữ
export const getPersonDetails = async (id: string, lang?: string) => {
  const [person] = await PersonModel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    { $set: { summary: lang ? `$summary.${lang}` : `$summary` } }
  ]);
  if (!person) {
    throw new ErrorHandler(Message.PERSON_NOT_FOUND, HttpStatusCode.NOT_FOUND_404);
  }

  return person;
};

export const getPersons = async (req: Request) => {
  const options = convertRequestToPipelineStages(req, ['fullName'], ['summary']);

  return await PersonModel.aggregate(options);
};

export const deleteMovieFromPerson = async (id: string, movieId: string) => {
  const person = await getPersonById(id);

  const idx = person.movies.findIndex((e) => e === movieId);

  if (idx !== -1) {
    person.movies.splice(idx, 1);
    await person.save();
  }
};