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
  console.log("Searching ...")

  const queryString = "SELECT * FROM famous_people WHERE last_name = $1::text"
  client.query(queryString, [process.argv[2]], (err, result) => {
    const id = result.rows[0].id;
    const firstName = result.rows[0].first_name;
    const lastName = result.rows[0].last_name;
    const birthday = result.rows[0].birthdate;
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Found " + id + " person(s) by the name '" + lastName + "':");
    console.log("-" + id + ": " + firstName + " " + lastName + ", born '" + birthday + "'");
    client.end();
  });
});