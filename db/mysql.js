const mysql = require('mysql');

// write out database code here:
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "movielist"
});


// export controller methods
module.exports = con;

