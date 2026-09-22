"use client";

import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import LayoutApp from "../components/LayoutApp";
import TarjetaResumen from "../components/TarjetaResumen";
import GraficaMes from "../components/GraficaMes";
import SemanaTipica from "../components/SemanaTipica";
import RankingHabitos from "../components/RankingHabitos";
import { api, ApiError } from "../lib/api";
import type { Habito, Resumen } from "../lib/types";

export default function EstadisticasPage() {
  const [habitos, setHabitos] = useState<Habito[]>([]);
  const [resumen, setResumen] = useState<Resumen | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargar = useCallback(async () => {
    try {
      const [listaHabitos, datosResumen] = await Promise.all([
        api.get<Habito[]>("/habits"),
        api.get<Resumen>("/stats/summary"),
      ]);

      setHabitos(listaHabitos);
      setResumen(datosResumen);
      setError("");
    } catch (e) {
      setError(
        e instanceof ApiError ? e.message : "No se pudieron cargar tus datos",
      );
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    async function iniciar() {
      await cargar();
    }

    void iniciar();
  }, [cargar]);

  if (cargando) {
    return (
      <LayoutApp>
        <Box sx={{ display: "grid", placeItems: "center", minHeight: "60vh" }}>
          <CircularProgress />
        </Box>
      </LayoutApp>
    );
  }

  const activos = habitos.filter((habito) => habito.active).length;
  const diferencia = (resumen?.percentMonth ?? 0) - (resumen?.percentPrevMonth ?? 0);

  return (
    <LayoutApp>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h2"
          sx={{ color: "primary.main", fontSize: { xs: 24, md: 30 } }}
        >
          Estadísticas
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: 14, mt: 0.5 }}>
          Tu constancia de los últimos 30 días
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {habitos.length === 0 ? (
        <Card sx={{ p: 6, textAlign: "center" }}>
          <Typography sx={{ fontWeight: 700, color: "primary.main" }}>
            Todavía no hay nada que medir
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: 14, mt: 1, mb: 3 }}>
            Crea tu primer hábito y aquí verás cómo avanzas.
          </Typography>
          <Button
            component={NextLink}
            href="/habitos/nuevo"
            variant="contained"
            startIcon={<AddRoundedIcon />}
          >
            Crear hábito
          </Button>
        </Card>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
              gap: { xs: 1.5, sm: 2.5 },
              mb: 2.5,
            }}
          >
            <TarjetaResumen
              etiqueta="Total de hábitos"
              valor={habitos.length}
              detalle={`${activos} activos`}
            />
            <TarjetaResumen
              etiqueta="Completados hoy"
              valor={resumen?.completedToday ?? 0}
              detalle={`${resumen?.pendingToday ?? 0} pendientes`}
            />
            <TarjetaResumen
              etiqueta="Días consecutivos"
              valor={resumen?.currentStreak ?? 0}
              detalle={`mejor marca: ${resumen?.bestStreak ?? 0}`}
              destacada
              icono={
                <LocalFireDepartmentRoundedIcon
                  sx={{ fontSize: 24, color: "secondary.dark" }}
                />
              }
            />
            <TarjetaResumen
              etiqueta="Progreso del mes"
              valor={`${resumen?.percentMonth ?? 0}%`}
              detalle={`${diferencia >= 0 ? "+" : ""}${diferencia} frente al mes pasado`}
              icono={
                <TrendingUpRoundedIcon
                  sx={{ fontSize: 22, color: "secondary.dark" }}
                />
              }
            />
          </Box>

          <Box sx={{ mb: 2.5 }}>
            <GraficaMes dias={resumen?.last30Days ?? []} />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
              gap: 2.5,
              alignItems: "start",
            }}
          >
            <RankingHabitos habitos={habitos} />

            <SemanaTipica
              dias={resumen?.last30Days ?? []}
              totalHabitos={resumen?.totalHabits ?? 0}
            />
          </Box>
        </>
      )}
    </LayoutApp>
  );
}
