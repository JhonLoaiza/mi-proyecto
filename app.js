const API_URL = "http://localhost:3000/api";

// Guardar registro
async function guardar() {
  const registro = {
    rut: document.getElementById("rut").value.trim(),
    nombres: document.getElementById("nombres").value.trim(),
    apellidos: document.getElementById("apellidos").value.trim(),
    direccion: document.getElementById("direccion").value.trim(),
    ciudad: document.getElementById("ciudad").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    email: document.getElementById("email").value.trim(),
    fechaNacimiento: document.getElementById("fechaNacimiento").value,
    estadoCivil: document.getElementById("estadoCivil").value,
    comentarios: document.getElementById("comentarios").value.trim()
  };

  const resp = await fetch(`${API_URL}/guardar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registro)
  });

  const data = await resp.json();
  alert(data.mensaje);
  document.getElementById("fichaForm").reset();
}

async function buscar() {
  const apellido = document.getElementById("buscarApellido").value.trim();
  
  // URL corregida
  const resp = await fetch(`${API_URL}/buscar?apellido=${encodeURIComponent(apellido)}`);
  const resultados = await resp.json();

  let resultadosDiv = document.getElementById("resultadoBusqueda");
  resultadosDiv.innerHTML = "";

  if (resultados.length === 0) {
    resultadosDiv.innerHTML = "<p class='text-danger'>No se encontraron registros.</p>";
  } else {
    let html = "<ul class='list-group'>";
    resultados.forEach(r => {
      html += `<li class="list-group-item">
                <strong>${r.nombres} ${r.apellidos}</strong> - ${r.rut} <br>
                Ciudad: ${r.ciudad}, Tel: ${r.telefono}, Email: ${r.email}
               </li>`;
    });
    html += "</ul>";
    resultadosDiv.innerHTML = html;
  }
}


// Cerrar
function cerrar() {
  if (confirm("¿Desea cerrar la aplicación?")) {
    window.location.href = "https://google.com";
  }
}

document.getElementById("fichaForm").addEventListener("submit", function(e) {
  e.preventDefault(); // Evita que se recargue la página
  guardar();          // Llama a la función guardar
});

document.getElementById("btn btn-primary").addEventListener("click", buscar);
document.getElementById("cerrarBtn").addEventListener("click", cerrar);
document.getElementById("limpiarBtn").addEventListener("click", () => {
  document.getElementById("pacienteForm").reset();
});

