exports.up = knex => knex.schema.createTable("food_ingredients", table => {
  table.increments("id");
  table.integer("food_id").references("id").inTable("foods").onDelete("CASCADE");
  table.text("name").notNullable();
});

exports.down = knex => knex.schema.dropTable("food_ingredients");
