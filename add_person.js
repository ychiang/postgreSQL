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
let birthdate = new Date(args[2]);
knex('famous_people').insert({ first_name: args[0], last_name: args[1], birthdate: birthdate })
  .asCallback(function (err, result) {
    if (err) {
      return console.error(err);
    } else {
      console.log('Inserted one more famous person!');
    };
  });
  