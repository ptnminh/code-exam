const moment = require('moment-timezone');

const getTheBegginingOfDay = (startDate: any) => {
  const inputDate = new Date(startDate).getTime();
  const endOfDay = moment(inputDate).startOf('day').toDate();

  return moment
    .tz(endOfDay.toISOString(), 'UTC')
    .tz('Asia/Ho_Chi_Minh')
    .format();
};

const getTheEndOfDay = (endDate: any) => {
  const inputDate = new Date(endDate).getTime();
  const endOfDay = moment(inputDate).endOf('day').toDate();

  return moment
    .tz(endOfDay.toISOString(), 'UTC')
    .tz('Asia/Ho_Chi_Minh')
    .format();
};

const dateDiffInDays = (begin: string, end: string) => {
  const a = new Date(begin);
  const b = new Date(end);
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

export { getTheBegginingOfDay, getTheEndOfDay, dateDiffInDays };
