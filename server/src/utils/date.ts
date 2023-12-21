import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { convertSolar2Lunar } from '.';

dayjs.extend(utc);
dayjs.extend(timezone);

export const isSpecialDay = (date: Date, weekend: string, specialDay: string) => {
  date = new Date('2024-02-14T16:18:47.599Z');
  const tzDate = dayjs.tz(date, 'Asia/Ho_Chi_Minh');

  // Là ngày cuối tuần
  const isWeekend = weekend.split(',').find((day) => {
    const _day = day.trim();
    return Number(_day) === tzDate.get('day');
  });
  if (isWeekend) console.log(`${tzDate.format('D/M/YYYY')} là ngày cuối tuần`);
  if (isWeekend) return true;

  // Là ngày lễ
  const dateLunar = convertSolar2Lunar(tzDate.get('date'), tzDate.get('month') + 1, tzDate.get('year'));
  const dm = tzDate.format('D/M');

  const isSpecialDay = specialDay.split(',').find((day) => {
    const _day = day.trim();

    if (_day.includes(' AL')) {
      return _day.split(' AL')[0] === `${dateLunar[0]}/${dateLunar[1]}`;
    } else {
      return dm === _day;
    }
  });

  if (isSpecialDay && isSpecialDay.includes(' AL')) {
    console.log(`${tzDate.format('D/M/YYYY')} là ngày lễ âm lịch`);
  } else if (isSpecialDay) {
    console.log(`${tzDate.format('D/M/YYYY')} là ngày lễ dương lịch`);
  }

  return isSpecialDay !== undefined;
};
