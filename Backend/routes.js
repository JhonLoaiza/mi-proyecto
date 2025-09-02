// backend/routes.js
const express = require("express");
const router = express.Router();
const pool = require("./db");

// Guardar o actualizar paciente
router.post("/guardar", async (req, res) => {
  const {
    rut,
    nombres,
    apellidos,
    direccion,
    ciudad,
    telefono,
    email,
    fechaNacimiento,
    estadoCivil,
    comentarios
  } = req.body;

  try {
    // Verificar si ya existe el RUT
    const [rows] = await pool.query("SELECT rut FROM pacientes WHERE rut = ?", [rut]);

    if (rows.length > 0) {
      // Actualizar
      await pool.query(
        `UPDATE pacientes SET nombres=?, apellidos=?, direccion=?, ciudad=?, telefono=?, email=?, fecha_nacimiento=?, estado_civil=?, comentarios=? WHERE rut=?`,
        [nombres, apellidos, direccion, ciudad, telefono, email, fechaNacimiento, estadoCivil, comentarios, rut]
      );
      return res.json({ mensaje: "Registro actualizado correctamente" });
    } else {
      // Insertar
      await pool.query(
        `INSERT INTO pacientes (rut, nombres, apellidos, direccion, ciudad, telefono, email, fecha_nacimiento, estado_civil, comentarios) VALUES (?,?,?,?,?,?,?,?,?,?)`,
        [rut, nombres, apellidos, direccion, ciudad, telefono, email, fechaNacimiento, estadoCivil, comentarios]
      );
      return res.json({ mensaje: "Registro guardado correctamente" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Buscar por apellido
router.get("/buscar", async (req, res) => {
  const apellido = req.query.apellidos || "";
  try {
    const [rows] = await pool.query(
      "SELECT * FROM pacientes WHERE apellidos LIKE ?",
      [`%${apellido}%`]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
