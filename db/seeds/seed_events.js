/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { dateFromDaysDiff } = require("../../src/utils/dateUtils");

exports.seed = async function (knex) {
  await knex('bookings').del()
  await knex('events').del()

  await knex('events').insert([
    { name: 'event 1', capacity: 100, date: dateFromDaysDiff(-1) },
    { name: 'event 2', capacity: 3, date: dateFromDaysDiff(1) },
    { name: 'event 3', capacity: 3, date: dateFromDaysDiff(5) },
    { name: 'event 4', capacity: 10, date: dateFromDaysDiff(11) },
    { name: 'event 5', capacity: 1000, date: dateFromDaysDiff(300) },
  ]);
};
