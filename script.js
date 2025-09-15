// ====== Cargar actividades desde actividades.json ======
async function cargarActividades() {
  try {
    const respuesta = await fetch("actividades.json");
    if (!respuesta.ok) {
      throw new Error("No se pudo cargar actividades.json");
    }

    const datos = await respuesta.json();
    const cartelera = document.getElementById("cartelera");

    // Vaciar contenido por si se recarga
    cartelera.innerHTML = "";

    // Recorre los días
    Object.keys(datos).forEach(dia => {
      const divDia = document.createElement("div");
      divDia.classList.add("dia");

      const tituloDia = document.createElement("h2");
      tituloDia.textContent = "🗓 " + dia;
      divDia.appendChild(tituloDia);

      // Recorre actividades del día
      datos[dia].forEach(act => {
        const divAct = document.createElement("div");
        divAct.classList.add("actividad");
        divAct.innerHTML = `
          <strong>${act.titulo}</strong><br>
          ⏰ ${act.hora} <br>
          📍 ${act.lugar}
        `;

        // Evento para abrir modal con detalle
        divAct.addEventListener("click", () => {
          document.getElementById("modal-titulo").textContent = act.titulo;
          document.getElementById("modal-hora").textContent = "⏰ " + act.hora;
          document.getElementById("modal-lugar").textContent = "📍 " + act.lugar;
          document.getElementById("modal-detalle").textContent = act.detalle;
          document.getElementById("modal").style.display = "block";
        });

        divDia.appendChild(divAct);
      });

      cartelera.appendChild(divDia);
    });

  } catch (error) {
    console.error("Error cargando actividades:", error);
    document.getElementById("cartelera").innerHTML = "<p>No se pudo cargar la cartelera.</p>";
  }
}

// ====== Modal ======
document.addEventListener("DOMContentLoaded", () => {
  cargarActividades();

  const modal = document.getElementById("modal");
  const cerrar = document.getElementById("cerrar");

  cerrar.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
