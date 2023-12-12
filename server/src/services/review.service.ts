import { type Request } from 'express';
import { type PipelineStage } from 'mongoose';

import { ReviewModel, NotFoundError, BadRequestError, MovieModel, TheaterModel } from '../models';
import { type IReview } from '../interfaces';
import { Message } from '../constants';
import { addPaginationPipelineStage, convertToMongooseId } from '../utils';

const updateMovieOrTheaterRatingData = async (review: any) => {
  if (review.movie) {
    const result = await ReviewModel.aggregate([
      { $match: { movie: review.movie } },
      {
        $group: {
          _id: '$movie',
          ratingAverage: { $avg: '$rating' },
          ratingCount: { $count: {} }
        }
      },
      { $project: { _id: 0 } }
    ]);

    await MovieModel.findByIdAndUpdate(review.movie, result[0]);
  } else if (review.theater) {
    const result = await ReviewModel.aggregate([
      { $match: { theater: review.theater } },
      {
        $group: {
          _id: '$theater',
          ratingAverage: { $avg: '$rating' },
          ratingCount: { $count: {} }
        }
      },
      { $project: { _id: 0 } }
    ]);

    await TheaterModel.findByIdAndUpdate(review.theater, result[0]);
  }
};

export const createOrUpdateReview = async (review: IReview) => {
  if (review.movie && (review.rating < 0 || review.rating > 10))
    throw new BadRequestError(Message.INVALID_MOVIE_RATING);
  else if (review.theater && (review.rating < 0 || review.rating > 5))
    throw new BadRequestError(Message.INVALID_THEATER_RATING);

  const find: Record<string, any> = { user: review.user };
  if (review.movie) find.movie = review.movie;
  if (review.theater) find.theater = review.theater;

  const newReview = await ReviewModel.findOneAndUpdate(find, review, { new: true, upsert: true });

  await updateMovieOrTheaterRatingData(newReview);

  return newReview;
};

export const getReviewsByMovie = async (req: Request) => {
  const pipeline: PipelineStage[] = [
    { $match: { isActive: true, movie: convertToMongooseId(req.params.id) } },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        pipeline: [{ $project: { _id: 1, name: 1, email: 1, avatar: 1 } }],
        as: 'user'
      }
    },
    { $unwind: '$user' }
  ];

  addPaginationPipelineStage({ req, pipeline });

  return await ReviewModel.aggregate(pipeline);
};

export const getReviewsByTheater = async (req: Request) => {
  const pipeline: PipelineStage[] = [
    { $match: { isActive: true, theater: convertToMongooseId(req.params.id) } },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        pipeline: [{ $project: { _id: 1, name: 1, email: 1, avatar: 1 } }],
        as: 'user'
      }
    },
    { $unwind: '$user' }
  ];

  addPaginationPipelineStage({ req, pipeline });

  return await ReviewModel.aggregate(pipeline);
};

export const deleteReview = async (id: string) => {
  const doc = await ReviewModel.findByIdAndDelete(id);
  if (!doc) {
    throw new NotFoundError(Message.REVIEW_NOT_FOUND);
  }

  await updateMovieOrTheaterRatingData(doc);
};

export const toggleActiveReview = async (id: string) => {
  const review = await ReviewModel.findById(id);
  if (!review) {
    throw new NotFoundError(Message.REVIEW_NOT_FOUND);
  }

  await review.updateOne({ isActive: !review.isActive });
};
