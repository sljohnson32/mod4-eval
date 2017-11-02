exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('inventory', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.string('description');
      table.string('image_url');
      table.decimal('price');
      
      table.timestamps(true, true);
    }),

    knex.schema.createTable('order_history', function(table) {
      table.increments('id').primary();
      table.decimal('cost');

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.dropTable('order_history'),
    knex.dropTable('inventory')
  ]);
};
