exports.up = knex => knex.schema.createTable("order_foods", table => {
  table.increments("id");
  table.integer("user_id").references("id").inTable("orders");
  table.integer("food_id").references("id").inTable("foods");
  table.integer("amount");
});

exports.down = knex => knex.schema.dropTable("orders");
