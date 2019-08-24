
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
        tbl.increments();
        tbl
            .string('username', 255)
            .notNullable()
            .unique()
        tbl
            .string('password', 255)
            .notNullable()
        tbl
            .string('name', 255)
            .notNullable()
        tbl
            .integer('phoneNumber')
            .unique()
        tbl 
            .string('address', 255)
        tbl
            .string('currentUseage', 255)
        tbl 
            .bool('medicalQuery')
            .defaultTo(false)
        tbl 
            .bool('recreationalQuery')
            .defaultTo(false)
        tbl
            .string('medicalPurpose', 255)
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
};
