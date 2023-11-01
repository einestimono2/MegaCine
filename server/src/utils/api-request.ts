/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { type Request } from 'express';

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
  const query: any = [];

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

    fields.forEach((field) => {
      const record: Record<string, any> = {};

      record[field] = { $regex: `${req.query.keyword as string}`, $options: 'i' };

      map.push(record);
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
  if (req.query.page && req.query.limit) {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const skip = (page - 1) * limit;

    query.push(
      // {
      //   $skip: skip
      // },
      // {
      //   $limit: limit
      // }
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
    query.push(
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

  return query;
};
