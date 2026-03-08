function realizarSorteo() {
  const evento = obtenerEvento();
  if (!evento || evento.participantes.length < 2) return null;

  const personas = [...evento.participantes];
  let receptores;
  let intentos = 0;
  let valido = false;

  while (!valido && intentos < 1000) {
    receptores = [...personas].sort(() => Math.random() - 0.5);
    valido = true;
    intentos++;

    for (let i = 0; i < personas.length; i++) {
      if (personas[i] === receptores[i]) { valido = false; break; }
      const excl = evento.exclusiones.find(e => e.persona === personas[i]);
      if (excl && excl.noPuedeDarA.includes(receptores[i])) { valido = false; break; }
    }
  }

  if (!valido) return null;

  const resultado = personas.map((p, i) => ({ de: p, para: receptores[i] }));
  evento.resultadoSorteo = resultado;
  guardarEvento(evento);
  return resultado;
}