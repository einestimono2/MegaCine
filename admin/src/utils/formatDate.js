export const getVietNamFormatDate = (date, showTime = true) => {
  const configs = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  if (showTime) {
    configs.hour = '2-digit';
    configs.minute = '2-digit';
  }

  return new Date(date).toLocaleDateString('en-GB', configs);
};
