// ── DRAGDROP.JS ──────────────────────────────────────────────
// HTML5 Drag & Drop API: reordenar participantes

let dragSrc = null;

function iniciarDragDrop(listaEl) {
  const items = listaEl.querySelectorAll(".drag-item");

  items.forEach(item => {
    item.setAttribute("draggable", "true");

    item.addEventListener("dragstart", function (e) {
      dragSrc = this;
      this.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
    });

    item.addEventListener("dragend", function () {
      this.classList.remove("dragging");
      listaEl.querySelectorAll(".drag-item").forEach(i => i.classList.remove("drag-over"));
      guardarOrdenParticipantes(listaEl);
    });

    item.addEventListener("dragover", function (e) {
      e.preventDefault();
      if (this !== dragSrc) {
        listaEl.querySelectorAll(".drag-item").forEach(i => i.classList.remove("drag-over"));
        this.classList.add("drag-over");
      }
    });

    item.addEventListener("drop", function (e) {
      e.preventDefault();
      if (this !== dragSrc) {
        const all = [...listaEl.querySelectorAll(".drag-item")];
        const si = all.indexOf(dragSrc), ti = all.indexOf(this);
        listaEl.insertBefore(dragSrc, si < ti ? this.nextSibling : this);
      }
    });
  });
}

function guardarOrdenParticipantes(listaEl) {
  const nombres = [...listaEl.querySelectorAll(".drag-item")].map(i => i.dataset.nombre);
  const evento = obtenerEvento();
  if (!evento) return;
  evento.participantes = nombres;
  guardarEvento(evento);

  const badge = document.getElementById("orden-guardado");
  if (badge) {
    badge.classList.remove("d-none");
    setTimeout(() => badge.classList.add("d-none"), 1800);
  }
}
