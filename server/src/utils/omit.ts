/* eslint-disable @typescript-eslint/no-dynamic-delete */

// Loại bỏ giá trị null | undefined của obj
// deep --> Loại bỏ cả nested object
export const omitIsNil = (obj: any = {}, deep: boolean = false): any => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] == null) {
      delete obj[key];
    }
  });

  if (deep) {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object') {
        omitIsNil(obj[key], true);
      }
    });
  }

  return obj;
};
