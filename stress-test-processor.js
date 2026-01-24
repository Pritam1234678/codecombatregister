const { faker } = require('@faker-js/faker');

function generateRandomUser(requestParams, context, ee, next) {
  context.vars.name = faker.person.fullName();
  context.vars.email = faker.internet.email();
  context.vars.phone = faker.string.numeric(10);
  context.vars.rollNumber = faker.string.alphanumeric(10).toUpperCase();
  return next();
}

module.exports = {
  generateRandomUser
};
