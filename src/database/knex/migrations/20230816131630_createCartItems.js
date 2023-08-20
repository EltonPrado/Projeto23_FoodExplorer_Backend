exports.up = knex => knex.schema.createTable("cartItems", table => {
  table.increments("id");
  table.integer("cart_id").references("id").inTable("carts").onDelete("CASCADE");
  table.integer("food_id").references("id").inTable("foods");
  
  table.text("title");
  table.integer("quantity");

  table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("cartItems");