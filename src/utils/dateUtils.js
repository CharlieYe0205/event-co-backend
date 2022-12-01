const dateFromDaysDiff = (days) => {
  return new Date(new Date().getTime() + (days * 24 * 60 * 60 * 1000));
};

const calDaysDiff = (date1, date2) => {
  return (date1.getTime() - date2.getTime()) / (24 * 60 * 60 * 1000);
};

module.exports = { dateFromDaysDiff, calDaysDiff };