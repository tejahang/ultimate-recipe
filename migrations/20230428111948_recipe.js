/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('recipe', (table) => {
    table.increments('id').primary(); // id
    table.string('name').notNullable(); // varchar 255
    table.string('description').notNullable(); // varchar 255
    table.string('ingredients').notNullable(); // varchar 255
    table.string('instructions').notNullable(); // varchar 255
    table.string('image').notNullable(); // varchar 255
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('recipe');
};
