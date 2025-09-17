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
            document.getElementById("modal-titulo").textContent = " 📅 " + act.titulo;
            document.getElementById("modal-hora").textContent = "⏰ " + act.hora;
            document.getElementById("modal-lugar").textContent = "📍 " + act.lugar;
            document.getElementById("modal-detalle").textContent = act.detalle;

            // Si hay mapa, lo mostramos
            const modalMapa = document.getElementById("modal-mapa");
            if (act.mapa) {
              modalMapa.innerHTML = `<iframe src="${act.mapa}" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
            } else {
              modalMapa.innerHTML = "";
            }

            document.getElementById("modal").style.display = "block";
          });
        });
      }
    });
  });

// Botón cerrar modal
document.getElementById("cerrar").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});
