function guardarEvento(evento) {
  localStorage.setItem("regalo_evento", JSON.stringify(evento));
}

function obtenerEvento() {
  const data = localStorage.getItem("regalo_evento");
  return data ? JSON.parse(data) : null;
}

function eventoVacio() {
  return {
    organizador: "",
    incluirOrganizador: false,
    participantes: [],
    exclusiones: [],
    celebracion: "",
    tipoEvento: "",
    fecha: "",
    presupuesto: "",
    resultadoSorteo: []
  };
}

function limpiarStorage() {
  localStorage.removeItem("regalo_evento");
}
