"use client";

import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import LayoutApp from "../components/LayoutApp";
import TarjetaResumen from "../components/TarjetaResumen";
import FilaHabito from "../components/FilaHabito";
import { api, ApiError } from "../lib/api";
import { useAuth } from "../lib/auth";
import { claveHoy, fechaLarga, inicialDia, saludo } from "../lib/fechas";
import type { Habito, Resumen } from "../lib/types";

export default function DashboardPage() {
  const { usuario } = useAuth();

  const [habitos, setHabitos] = useState<Habito[]>([]);
  const [resumen, setResumen] = useState<Resumen | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [ocupado, setOcupado] = useState<string | null>(null);

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
    void cargar();
  }, [cargar]);

  async function alternar(habito: Habito) {
    setOcupado(habito.id);
    setError("");

    try {
      if (habito.completedToday) {
        await api.del(`/habits/${habito.id}/records/${claveHoy()}`);
      } else {
        await api.post(`/habits/${habito.id}/records`, {});
      }

      await cargar();
    } catch (e) {
      setError(
        e instanceof ApiError ? e.message : "No se pudo actualizar el hábito",
      );
    } finally {
      setOcupado(null);
    }
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

  const maximo = Math.max(1, ...(resumen?.last7Days ?? []).map((d) => d.completed));
  const diferenciaMes = (resumen?.percentMonth ?? 0) - (resumen?.percentPrevMonth ?? 0);
  const primerNombre = usuario?.name.split(" ")[0] ?? "";

  return (
    <LayoutApp>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ justifyContent: "space-between", alignItems: { sm: "center" }, mb: 4 }}
      >
        <Box>
          <Typography
            variant="h2"
            sx={{ color: "primary.main", fontSize: { xs: 24, md: 30 } }}
          >
            {saludo()}, {primerNombre}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: 14, mt: 0.5 }}>
            {fechaLarga()}
            {resumen && resumen.currentStreak > 0
              ? ` · llevas ${resumen.currentStreak} ${
                  resumen.currentStreak === 1 ? "día seguido" : "días seguidos"
                }`
              : ""}
          </Typography>
        </Box>

        <Button
          component={NextLink}
          href="/habitos/nuevo"
          variant="contained"
          startIcon={<AddRoundedIcon />}
          sx={{ height: 48, flexShrink: 0 }}
        >
          Crear hábito
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2.5,
          mb: 3,
        }}
      >
        <TarjetaResumen
          etiqueta="Hábitos activos"
          valor={resumen?.totalHabits ?? 0}
          detalle={`de ${resumen?.totalHabits ?? 0} creados`}
        />
        <TarjetaResumen
          etiqueta="Completados hoy"
          valor={resumen?.completedToday ?? 0}
          detalle={`de ${resumen?.totalHabits ?? 0} de hoy`}
        />
        <TarjetaResumen
          etiqueta="Racha actual"
          valor={resumen?.currentStreak ?? 0}
          detalle={`días · mejor: ${resumen?.bestStreak ?? 0}`}
          destacada
          icono={
            <LocalFireDepartmentRoundedIcon
              sx={{ fontSize: 24, color: "secondary.dark" }}
            />
          }
        />
        <TarjetaResumen
          etiqueta="Cumplimiento"
          valor={`${resumen?.percentWeek ?? 0}%`}
          detalle="esta semana"
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 380px" },
          gap: 2.5,
          alignItems: "start",
        }}
      >
        <Card sx={{ p: { xs: 2, sm: 3 } }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}
          >
            <Box>
              <Typography variant="h4" sx={{ color: "primary.main", fontSize: 21 }}>
                Hoy
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: 12.5, mt: 0.5 }}>
                Marca lo que ya cumpliste. Un clic sobre el círculo.
              </Typography>
            </Box>

            <Chip
              label={`${resumen?.completedToday ?? 0} de ${resumen?.totalHabits ?? 0} hoy`}
              sx={{
                bgcolor: "#F7E7BC",
                color: "secondary.dark",
                fontWeight: 700,
                fontSize: 12.5,
                flexShrink: 0,
              }}
            />
          </Stack>

          {habitos.length === 0 ? (
            <Box sx={{ py: 6, textAlign: "center" }}>
              <Typography sx={{ fontWeight: 700, color: "primary.main" }}>
                Todavía no tienes hábitos
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: 14, mt: 1, mb: 3 }}>
                Crea el primero y empieza a marcar desde hoy.
              </Typography>
              <Button
                component={NextLink}
                href="/habitos/nuevo"
                variant="contained"
                startIcon={<AddRoundedIcon />}
              >
                Crear hábito
              </Button>
            </Box>
          ) : (
            <Stack spacing={2}>
              {habitos.map((habito) => (
                <FilaHabito
                  key={habito.id}
                  habito={habito}
                  ocupado={ocupado === habito.id}
                  alAlternar={alternar}
                />
              ))}
            </Stack>
          )}
        </Card>

        <Stack spacing={2.5}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ color: "primary.main", fontSize: 17 }}>
              Esta semana
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: 12, mt: 0.5, mb: 3 }}>
              Hábitos cumplidos por día
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: "space-between" }}
            >
              {(resumen?.last7Days ?? []).map((dia) => (
                <Box key={dia.date} sx={{ textAlign: "center", flex: 1 }}>
                  <Box
                    sx={{
                      height: 130,
                      borderRadius: 2.5,
                      bgcolor: "background.default",
                      display: "flex",
                      alignItems: "flex-end",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: `${(dia.completed / maximo) * 100}%`,
                        minHeight: dia.completed > 0 ? 8 : 0,
                        borderRadius: 2.5,
                        bgcolor:
                          dia.completed === maximo ? "secondary.main" : "#F7E7BC",
                        transition: "height .3s",
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{ fontSize: 11.5, fontWeight: 500, mt: 1, color: "text.secondary" }}
                  >
                    {inicialDia(dia.date)}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 11, fontWeight: 700, color: "secondary.dark" }}
                  >
                    {dia.completed}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Card>

          <Card sx={{ p: 3, bgcolor: "primary.main", border: 0 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 2 }}>
              <LocalFireDepartmentRoundedIcon
                sx={{ fontSize: 34, color: "secondary.main" }}
              />
              <Box>
                <Typography
                  sx={{ color: "#FCF5E3", fontWeight: 700, fontSize: 30, lineHeight: 1.15 }}
                >
                  {resumen?.currentStreak ?? 0}{" "}
                  {resumen?.currentStreak === 1 ? "día" : "días"}
                </Typography>
                <Typography sx={{ color: "#C2A79E", fontSize: 12.5, mt: 0.5 }}>
                  Racha actual · tu mejor marca es {resumen?.bestStreak ?? 0}
                </Typography>
              </Box>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={
                resumen && resumen.bestStreak > 0
                  ? Math.min((resumen.currentStreak / resumen.bestStreak) * 100, 100)
                  : 0
              }
              sx={{
                height: 8,
                borderRadius: 2,
                bgcolor: "primary.light",
                "& .MuiLinearProgress-bar": {
                  bgcolor: "secondary.main",
                  borderRadius: 2,
                },
              }}
            />
          </Card>

          <Card sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ color: "primary.main", fontSize: 15 }}>
              Cumplimiento del mes
            </Typography>

            <Stack direction="row" spacing={2} sx={{ alignItems: "center", mt: 1.5 }}>
              <Typography
                sx={{
                  fontSize: 38,
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: "secondary.dark",
                }}
              >
                {resumen?.percentMonth ?? 0}%
              </Typography>

              {diferenciaMes !== 0 && (
                <Chip
                  icon={
                    <TrendingUpRoundedIcon
                      sx={{
                        fontSize: 15,
                        transform: diferenciaMes < 0 ? "scaleY(-1)" : "none",
                      }}
                    />
                  }
                  label={`${diferenciaMes > 0 ? "+" : ""}${diferenciaMes}%`}
                  size="small"
                  sx={{
                    bgcolor: "#FCF5E3",
                    color: "secondary.dark",
                    fontWeight: 700,
                    fontSize: 11.5,
                    "& .MuiChip-icon": { color: "secondary.dark" },
                  }}
                />
              )}
            </Stack>

            <Typography
              color="text.secondary"
              sx={{ fontSize: 11.5, lineHeight: 1.45, mt: 2 }}
            >
              {diferenciaMes >= 0
                ? "Vas mejor que el mes pasado. Fallar un día no rompe la tendencia."
                : "Este mes vas más bajo que el anterior. Marcar uno hoy ya cambia el número."}
            </Typography>
          </Card>
        </Stack>
      </Box>
    </LayoutApp>
  );
}
