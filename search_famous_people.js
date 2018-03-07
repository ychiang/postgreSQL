const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: client.host,
    user: client.user,
    password: client.password,
    database: client.database
  }
});

const args = process.argv.slice(2);

knex.select('*')
  .from('famous_people')
  .where('first_name', args[0])
  .orWhere('last_name', args[0])
  .asCallback(function (err, result) {
    if (err) {
      return console.error(err);
    }
    result.forEach((result) => {
      const firstName = result.first_name;
      const lastName = result.last_name;
      const birthday = result.birthdate;
      console.log("-" + result.id + ": " + firstName + " " + lastName + ", born '" + birthday.toDateString() + "'");
    });
  });