/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { dateFromDaysDiff } = require("../../src/utils/dateUtils");

exports.seed = async function (knex) {
  await knex('bookings').del()
  await knex('events').del()

  await knex('events').insert([
    { name: 'event 1 (expired)', capacity: 100, date: dateFromDaysDiff(-1) },
    { name: 'event 2 (in 1 day)', capacity: 3, date: dateFromDaysDiff(1) },
    { name: 'event 3 (in 5 days)', capacity: 3, date: dateFromDaysDiff(5) },
    { name: 'event 4 (in 11 days)', capacity: 10, date: dateFromDaysDiff(11) },
    { name: 'event 5 (in 300 days)', capacity: 1000, date: dateFromDaysDiff(300) },
  ]);
};
