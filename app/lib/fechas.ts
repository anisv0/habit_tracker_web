export function claveHoy() {
  return new Date().toISOString().slice(0, 10);
}

export function fechaLarga() {
  return new Intl.DateTimeFormat("es", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
}

export function saludo() {
  const hora = new Date().getHours();

  if (hora < 12) return "Buenos días";
  if (hora < 19) return "Buenas tardes";
  return "Buenas noches";
}

export function inicialDia(clave: string) {
  const dia = new Date(`${clave}T12:00:00.000Z`).getUTCDay();
  return ["D", "L", "M", "M", "J", "V", "S"][dia];
}
