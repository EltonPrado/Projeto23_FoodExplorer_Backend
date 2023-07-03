
exports.up = knex => knex.schema.createTable("foods", table => {
  table.increments("id");
  table.text("title");
  table.text("category");
  table.text("description");
  table.float("price");
  table.text("image");
  
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("foods");
