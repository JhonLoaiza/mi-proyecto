// backend/db.js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",      // cambia según tu usuario
  password: "chugi12",      // tu contraseña
  database: "fichas_medicas"
});

module.exports = pool;
