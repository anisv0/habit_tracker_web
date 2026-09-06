"use client";

import { useRouter } from "next/navigation";
import LayoutApp from "../../components/LayoutApp";
import FormularioHabito from "../../components/FormularioHabito";
import type { ValoresHabito } from "../../components/FormularioHabito";
import { api } from "../../lib/api";
import type { Habito } from "../../lib/types";

export default function NuevoHabitoPage() {
  const router = useRouter();

  async function crear(valores: ValoresHabito) {
    await api.post<Habito>("/habits", {
      name: valores.name,
      description: valores.description || undefined,
      category: valores.category || undefined,
      color: valores.color,
    });

    router.push("/habitos?creado=1");
  }

  return (
    <LayoutApp>
      <FormularioHabito
        titulo="Nuevo hábito"
        subtitulo="Solo el nombre es obligatorio. Lo demás lo puedes dejar así."
        textoBoton="Crear hábito"
        mostrarSugerencias
        alEnviar={crear}
        alCancelar={() => router.push("/habitos")}
      />
    </LayoutApp>
  );
}
