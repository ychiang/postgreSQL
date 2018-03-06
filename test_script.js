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

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

const queryString = "SELECT * FROM famous_people WHERE last_name = $1::text"
client.query(queryString, [process.argv[2]], (err, result) => {
  if (err) {
    return console.error("error running query", err);
  }
  console.log(result.rows[0]); //output: 1
  client.end();
  });
});