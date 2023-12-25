export const getVietNamFormatDate = (date) => {
  return new Date(date).toLocaleDateString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
