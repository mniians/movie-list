//purpose : connect server -> db, query db
var connection = require('./mysql.js');


var selectMovie = () => {
  let query = 'SELECT * FROM movies';
  return new Promise((resolve, reject) =>{
    connection.query(query, function(error, results) {
      if (error){
        reject(error);
      }
      else {
        resolve(results);
      }
    });
  })
}

var insertMovie = (params) => {
  let query = 'INSERT into movies (title) VALUES (?)';
  return new Promise((resolve, reject) => {
    connection.query(query, params, function(error, results) {
      if (error) {
        reject(error);
      }
      else {
        resolve(results);
      }
    });
  })

}

var setMovie = () => {
  let query = 'UPDATE movies SET ? WHERE ?' ;
}
var deleteMovie = () => {
  let query = `DELETE FROM movies WHERE id=`;
}




module.exports = {
  selectMovie,
  insertMovie,
  setMovie,
  deleteMovie
}

