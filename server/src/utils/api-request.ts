/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { type Request } from 'express';
import { type PipelineStage } from 'mongoose';

/**
 * Chuyển đổi tất cả Query Request để áp dụng vào aggregate
 *
 * @param req - Request
 * @param fieldsApplySearch - Các trường trong Database áp dụng cho việc tìm kiếm
 * @param localizationFields - Các trường trong Database có đa ngôn ngữ
 * @returns Pipeline Aggregation
 *
 */
export const convertRequestToPipelineStages = ({
  req,
  fieldsApplySearch,
  localizationFields
}: {
  req: Request;
  fieldsApplySearch?: string[];
  localizationFields?: string[];
}) => {
  const query: PipelineStage[] = [];

  //! Search
  if (req.query.keyword && fieldsApplySearch) {
    const map: Array<Record<string, any>> = [];
    const fields: string[] = [];

    // Chuyển đổi những field song ngữ về dạng en và vi
    fieldsApplySearch.forEach((e) => {
      if (localizationFields?.includes(e)) {
        fields.push(`${e}.en`);
        fields.push(`${e}.vi`);
      } else {
        fields.push(e);
      }
    });

    let hasIdField = false;

    fields.forEach((field) => {
      const record: Record<string, any> = {};

      if (field === '_id') hasIdField = true;
      record[field] = { $regex: `${req.query.keyword as string}`, $options: 'i' };

      map.push(record);
    });

    if (hasIdField)
      query.push({
        $addFields: {
          _id: { $toString: '$_id' }
        }
      });

    query.push({
      $match: { $or: map }
    });
  }

  //! Filters
  const queryObj = { ...req.query };
  const excludeFields = ['keyword', 'page', 'sort', 'limit', 'fields', 'hl']; // Trường thừa
  excludeFields.forEach((key) => delete queryObj[key]);

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

  query.push({
    $match: JSON.parse(queryStr)
  });

  //! Sort
  if (req.query.sort) {
    const map = {};

    (req.query.sort as any).split(',').forEach((field: string) => {
      if (field[0] !== '+' && field[0] !== '-') {
        map[field] = 1;
      } else {
        map[field.substring(1)] = field[0] === '-' ? -1 : 1;
      }
    });

    query.push({
      $sort: map
    });
  }

  //! Limit fields
  if (req.query.fields) {
    const map = {};

    (req.query.fields as any).split(',').forEach((field: string) => (map[field.trim()] = 1));

    query.push({
      $project: map
    });
  }

  //! Xử lý kết quả trả về của ngôn ngữ hiện tại với các trường có song ngữ
  // vd: name: {vi : "TV", en: "TA"} --> name: "TV" | Name: "TA"
  if (localizationFields) {
    const map = {};

    localizationFields.forEach(
      // { $project: {MyKey: {$ifNull: ['$A', '$B'] }}}
      // (field: string) => (map[field] = 0)
      (field: string) => (map[field] = { $ifNull: [`$${field}.${req.getLocale()}`, `$${field}`] })
    );

    query.push({
      $set: map
    });
  }

  //! Pagination
  addPaginationPipelineStage({ req, pipeline: query });

  return query;
};

export const addPaginationPipelineStage = ({ req, pipeline }: { req: Request; pipeline: PipelineStage[] }) => {
  //! Pagination
  if (req.query.page && req.query.limit) {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const skip = (page - 1) * limit;

    pipeline.push(
      {
        $facet: {
          extra: [
            { $count: 'totalCount' },
            {
              $addFields: {
                pageIndex: page,
                pageSize: limit,
                totalPages: {
                  $ceil: {
                    $divide: ['$totalCount', limit]
                  }
                }
              }
            }
          ],
          data: [{ $skip: skip }, { $limit: limit }]
        }
      },
      { $unwind: '$extra' }
    );
  } else {
    pipeline.push(
      {
        $facet: {
          extra: [{ $count: 'totalCount' }],
          data: [
            // { "$match": { }}
          ]
        }
      },
      { $unwind: '$extra' }
    );
  }
};
