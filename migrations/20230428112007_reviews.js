/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('review', (table) => {
    table.increments('id').primary(); // id
    table.string('review').notNullable(); // varchar 255
    table.integer('recipe_id').notNullable().unsigned(); // reference id from recipe table
    table.foreign('recipe_id').references('recipe.id');
    table.integer('user_id').notNullable().unsigned(); // reference id from users table
    table.foreign('user_id').references('users.id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('review');
};
