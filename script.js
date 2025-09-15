async function cargarActividades() {
  const resp = await fetch('actividades.json');
  const data = await resp.json();

  const contenedor = document.getElementById('cartelera');
  contenedor.innerHTML = '';

  const dias = ["Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  dias.forEach(dia => {
    const divDia = document.createElement('div');
    divDia.classList.add('dia');
    divDia.innerHTML = `<h2>${dia}</h2>`;

    const actividadesDia = data.filter(act => act.dia === dia);

    actividadesDia.forEach(act => {
      const divAct = document.createElement('div');
      divAct.classList.add('actividad');
      divAct.textContent = `🗓 ${act.nombre}  ⏰ ${act.hora}  📍 ${act.lugar}`;

      divAct.addEventListener('click', () => mostrarDetalle(act));
      divDia.appendChild(divAct);
    });

    contenedor.appendChild(divDia);
  });
}

function mostrarDetalle(actividad) {
  document.getElementById('modal-titulo').textContent = actividad.nombre;
  document.getElementById('modal-hora').textContent = "⏰ " + actividad.hora;
  document.getElementById('modal-lugar').textContent = "📍 " + actividad.lugar;
  document.getElementById('modal-detalle').textContent = actividad.detalle;

  document.getElementById('modal').style.display = "block";
}

document.getElementById('cerrar').onclick = function() {
  document.getElementById('modal').style.display = "none";
};

window.onclick = function(event) {
  if (event.target === document.getElementById('modal')) {
    document.getElementById('modal').style.display = "none";
  }
};

cargarActividades();
