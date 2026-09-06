"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Box, CircularProgress } from "@mui/material";
import LayoutApp from "../../../components/LayoutApp";
import FormularioHabito from "../../../components/FormularioHabito";
import type { ValoresHabito } from "../../../components/FormularioHabito";
import { api, ApiError } from "../../../lib/api";
import type { Habito } from "../../../lib/types";

export default function EditarHabitoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [habito, setHabito] = useState<Habito | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<Habito>(`/habits/${id}`)
      .then(setHabito)
      .catch((e) =>
        setError(
          e instanceof ApiError ? e.message : "No se pudo cargar el hábito",
        ),
      )
      .finally(() => setCargando(false));
  }, [id]);

  async function guardar(valores: ValoresHabito) {
    await api.patch<Habito>(`/habits/${id}`, {
      name: valores.name,
      description: valores.description,
      category: valores.category,
      color: valores.color,
    });

    router.push("/habitos?editado=1");
  }

  if (cargando) {
    return (
      <LayoutApp>
        <Box sx={{ display: "grid", placeItems: "center", minHeight: "60vh" }}>
          <CircularProgress />
        </Box>
      </LayoutApp>
    );
  }

  if (error || !habito) {
    return (
      <LayoutApp>
        <Alert severity="error">{error || "Hábito no encontrado"}</Alert>
      </LayoutApp>
    );
  }

  return (
    <LayoutApp>
      <FormularioHabito
        titulo="Editar hábito"
        subtitulo="Cambia lo que quieras. Tu historial de días cumplidos no se toca."
        textoBoton="Guardar cambios"
        valorInicial={{
          name: habito.name,
          description: habito.description ?? "",
          category: habito.category ?? "",
          color: habito.color,
        }}
        alEnviar={guardar}
        alCancelar={() => router.push("/habitos")}
      />
    </LayoutApp>
  );
}
