// Definir los días en orden
const dias = ["Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

// Cargar actividades.json
fetch("actividades.json")
  .then(res => res.json())
  .then(data => {
    dias.forEach(dia => {
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
            console.log("Click detectado en:", act.titulo); // DEBUG
            document.getElementById("modal-titulo").textContent = " 📅 " + act.titulo || "";
            document.getElementById("modal-hora").textContent = "⏰ " + (act.hora || "");
            document.getElementById("modal-lugar").textContent = "📍 " + (act.lugar || "");
            document.getElementById("modal-detalle").textContent = act.detalle || "";

            // Si hay mapa, lo mostramos
            const modalMapa = document.getElementById("modal-mapa");
            if (act.mapa) {
              modalMapa.innerHTML = `<iframe src="${act.mapa}" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
            } else {
              modalMapa.innerHTML = "";
            }

            const modal = document.getElementById("modal");
            modal.style.display = "block";
            console.log("Modal abierto"); // DEBUG
          });
        });
      }
    });
  });
  .catch(err => console.error("Error cargando actividades.json:", err));

// Botón cerrar modal
document.getElementById("cerrar").addEventListener("click", () => {
  console.log("Cerrando modal"); // DEBUG
  document.getElementById("modal").style.display = "none";
});
// Cerrar modal al hacer click fuera
window.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (e.target === modal) {
    modal.style.display = "none";
    console.log("Modal cerrado clic afuera"); // DEBUG
  }
});
