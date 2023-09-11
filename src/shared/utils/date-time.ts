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
  const a = moment(begin);
  const b = moment(end);

  return b.diff(a, 'days');
};

const getTheBegginingOfDay1 = (startDate: any) => {
  const inputDate = new Date(startDate);
  inputDate.setHours(0, 0, 0, 0);

  const timeZoneOffset = inputDate.getTimezoneOffset() * 60000; // Offset in milliseconds
  const localDate = new Date(inputDate.getTime() - timeZoneOffset);

  return moment
    .tz(localDate.toISOString(), 'UTC')
    .tz('Asia/Ho_Chi_Minh')
    .format();
};
const getTheEndOfDay1 = (endDate: any) => {
  const inputDate = new Date(endDate);
  inputDate.setHours(23, 59, 59, 999);

  const timeZoneOffset = inputDate.getTimezoneOffset() * 60000; // Offset in milliseconds
  const localDate = new Date(inputDate.getTime() - timeZoneOffset);

  return moment
    .tz(localDate.toISOString(), 'UTC')
    .tz('Asia/Ho_Chi_Minh')
    .format();
};

export {
  getTheBegginingOfDay,
  getTheEndOfDay,
  getTheEndOfDay1,
  dateDiffInDays,
  getTheBegginingOfDay1,
};
