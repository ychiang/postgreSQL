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
  if (err) {
    return console.error("error running query", err);
  }
  //result.rowCount = result.rows.length
  console.log("Found " + result.rowCount + " person(s) by the name '" + process.argv[2] + "':");
  // start loop
  result.rows.forEach((result) => {
    const firstName = result.first_name;
    const lastName = result.last_name;
    const birthday = result.birthdate;
    console.log("-" + result.id + ": " + firstName + " " + lastName + ", born '" + birthday.toDateString() + "'");
  });
  // end loop
  client.end();
  });
});