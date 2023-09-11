const getTheBegginingOfDay = (startDate: any) => {
  const inputDate = new Date(startDate);
  inputDate.setHours(0, 0, 0, 0);

  const timeZoneOffset = inputDate.getTimezoneOffset() * 60000; // Offset in milliseconds
  const localDate = new Date(inputDate.getTime() - timeZoneOffset);

  return localDate.toISOString();
};
const getTheEndOfDay = (endDate: number) => {
  const inputDate = new Date(endDate);
  inputDate.setHours(23, 59, 59, 999);

  const timeZoneOffset = inputDate.getTimezoneOffset() * 60000; // Offset in milliseconds
  const localDate = new Date(inputDate.getTime() - timeZoneOffset);

  return localDate.toISOString();
};

export { getTheBegginingOfDay, getTheEndOfDay };
