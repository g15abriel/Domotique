/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('hosts', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('ip').notNullable()
    table.string('ifON').notNullable()
    table.string('ifOFF').notNullable()
    table.string('done').notNullable()
    table.integer('userId').references('id').inTable('users').notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('hosts')
};
