exports.up = knex => knex.schema.createTable("food_ingredients", table => {
  table.increments("id");
  table.text("name").notNullable();
  table.integer("food_id").references("id").inTable("foods").onDelete("CASCADE");
});

exports.down = knex => knex.schema.dropTable("food_ingredients");
