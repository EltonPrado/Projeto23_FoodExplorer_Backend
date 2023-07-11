const { hash } = require("bcryptjs");

exports.seed = async function(knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      name: "admin",
      email: "admin@email.com",
      password: await hash("123321", 8),
      admin: true,
    }
  ]);
};
