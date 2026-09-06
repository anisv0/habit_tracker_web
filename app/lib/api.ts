const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export class ApiError extends Error {
  status: number;

  constructor(mensaje: string, status: number) {
    super(mensaje);
    this.status = status;
  }
}

function obtenerToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

async function peticion<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
  const token = obtenerToken();

  let respuesta: Response;

  try {
    respuesta = await fetch(`${API_URL}${ruta}`, {
      ...opciones,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...opciones.headers,
      },
    });
  } catch {
    throw new ApiError("No se pudo conectar con el servidor", 0);
  }

  const datos = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    const mensaje = Array.isArray(datos?.message)
      ? datos.message[0]
      : datos?.message;

    throw new ApiError(mensaje ?? "Ocurrio un error inesperado", respuesta.status);
  }

  return datos as T;
}

export const api = {
  get: <T>(ruta: string) => peticion<T>(ruta),

  post: <T>(ruta: string, cuerpo?: unknown) =>
    peticion<T>(ruta, { method: "POST", body: JSON.stringify(cuerpo ?? {}) }),

  patch: <T>(ruta: string, cuerpo?: unknown) =>
    peticion<T>(ruta, { method: "PATCH", body: JSON.stringify(cuerpo ?? {}) }),

  del: <T>(ruta: string) => peticion<T>(ruta, { method: "DELETE" }),
};
