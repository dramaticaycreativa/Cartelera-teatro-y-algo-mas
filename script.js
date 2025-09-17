// Definir los días en orden
const dias = ["Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

// Función para normalizar (quita tildes y pone en minúsculas)
function normalizarId(dia) {
  return dia.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Cargar actividades.json
fetch("actividades.json")
  .then(res => res.json())
  .then(data => {
    dias.forEach(dia => {
      const id = normalizarId(dia); // ejemplo: "Miércoles" -> "miercoles"
      const contenedor = document.getElementById(dia.toLowerCase());
      if (contenedor && data[dia]) {
        data[dia].forEach(act => {
          const divAct = document.createElement("div");
          divAct.classList.add("actividad");
          divAct.innerHTML = `
            <h3>📅 ${act.titulo}</h3>
            <p>⏰ ${act.hora}</p>
            <p>📍 ${act.lugar}</p>
          `;
          contenedor.appendChild(divAct);

          // Modal de detalle
          divAct.addEventListener("click", () => {
            document.getElementById("modal-titulo").textContent = " 📅 " + act.titulo || "";
            document.getElementById("modal-hora").textContent = "⏰ " + (act.hora || "");
            document.getElementById("modal-lugar").textContent = "📍 " + (act.lugar || "");
            document.getElementById("modal-detalle").textContent = act.detalle || "";

            document.getElementById("modal").style.display = "block";
          });
        });
      }
    });
  });
 .catch(err => console.error("Error cargando actividades.json:", err));
// Botón cerrar modal
document.getElementById("cerrar").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});
// Cerrar modal al hacer click fuera
window.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
