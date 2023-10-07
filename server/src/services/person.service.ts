import { type Request } from 'express';
import { HttpStatusCode, Message } from '../constants';
import { type IPerson } from '../interfaces';
import { PersonModel } from '../models/person.model';
import { ErrorHandler, translateQueryRequest } from '../utils';

export const createPerson = async (person: IPerson) => {
  const newPerson = new PersonModel(person);

  return await newPerson.save();
};

export const findPersonById = async (id: string) => {
  return await PersonModel.findById(id);
};

export const getPersonById = async (id: string) => {
  const person = await PersonModel.findById(id);

  if (!person) {
    throw new ErrorHandler(Message.PERSON_NOT_FOUND, HttpStatusCode.NOT_FOUND_404);
  }

  return person;
};

export const getPersons = async (req: Request) => {
  const options = translateQueryRequest(req, 'fullName');

  return await PersonModel.aggregate(options);
};
