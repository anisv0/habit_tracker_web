"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LayoutApp from "../components/LayoutApp";
import TarjetaHabito from "../components/TarjetaHabito";
import { api, ApiError } from "../lib/api";
import { claveHoy } from "../lib/fechas";
import type { Habito } from "../lib/types";

function Contenido() {
  const parametros = useSearchParams();

  const [habitos, setHabitos] = useState<Habito[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [ocupado, setOcupado] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [porBorrar, setPorBorrar] = useState<Habito | null>(null);
  const [borrando, setBorrando] = useState(false);
  const [aviso, setAviso] = useState("");

  const cargar = useCallback(async () => {
    try {
      setHabitos(await api.get<Habito[]>("/habits"));
      setError("");
    } catch (e) {
      setError(
        e instanceof ApiError ? e.message : "No se pudieron cargar tus hábitos",
      );
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  useEffect(() => {
    if (parametros.get("creado")) setAviso("Hábito creado");
    if (parametros.get("editado")) setAviso("Cambios guardados");
  }, [parametros]);

  const categorias = useMemo(() => {
    const encontradas = habitos
      .map((h) => h.category)
      .filter((c): c is string => Boolean(c));

    return ["Todos", ...Array.from(new Set(encontradas))];
  }, [habitos]);

  const visibles = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return habitos.filter((h) => {
      const coincideTexto = !texto || h.name.toLowerCase().includes(texto);
      const coincideFiltro = filtro === "Todos" || h.category === filtro;
      return coincideTexto && coincideFiltro;
    });
  }, [habitos, busqueda, filtro]);

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

  async function confirmarBorrado() {
    if (!porBorrar) return;

    setBorrando(true);
    setError("");

    try {
      await api.del(`/habits/${porBorrar.id}`);
      setPorBorrar(null);
      setAviso("Hábito eliminado");
      await cargar();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "No se pudo eliminar el hábito");
    } finally {
      setBorrando(false);
    }
  }

  if (cargando) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", minHeight: "60vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
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
            Mis hábitos
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: 14, mt: 0.5 }}>
            Toca el círculo para marcar el de hoy. Nada más.
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

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ alignItems: { sm: "center" }, mb: 3 }}
      >
        <TextField
          placeholder="Buscar"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          size="small"
          sx={{ maxWidth: { sm: 300 } }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{ fontSize: 18, color: "#A08663" }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
          {categorias.map((categoria) => (
            <Chip
              key={categoria}
              label={categoria}
              onClick={() => setFiltro(categoria)}
              sx={{
                fontSize: 12.5,
                fontWeight: filtro === categoria ? 700 : 500,
                bgcolor: filtro === categoria ? "primary.main" : "background.paper",
                color:
                  filtro === categoria ? "background.paper" : "text.secondary",
                border: "1.3px solid",
                borderColor: filtro === categoria ? "primary.main" : "divider",
                "&:hover": {
                  bgcolor: filtro === categoria ? "primary.dark" : "#FBF6EA",
                },
              }}
            />
          ))}
        </Stack>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
          },
          gap: 2.5,
        }}
      >
        {visibles.map((habito) => (
          <TarjetaHabito
            key={habito.id}
            habito={habito}
            ocupado={ocupado === habito.id}
            alAlternar={alternar}
            alBorrar={setPorBorrar}
          />
        ))}

        <Card
          component={NextLink}
          href="/habitos/nuevo"
          sx={{
            p: 4,
            minHeight: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            border: "1.5px dashed",
            borderColor: "divider",
            bgcolor: "transparent",
            boxShadow: "none",
            textDecoration: "none",
            "&:hover": { bgcolor: "#FBF6EA" },
          }}
        >
          <AddRoundedIcon sx={{ fontSize: 26, color: "#A08663", mb: 1.5 }} />
          <Typography sx={{ fontWeight: 700, color: "primary.main" }}>
            Crear otro hábito
          </Typography>
          <Typography sx={{ fontSize: 12, color: "#A08663", mt: 0.5 }}>
            Sin límite. Puedes pausarlo cuando quieras.
          </Typography>
        </Card>
      </Box>

      {habitos.length > 0 && visibles.length === 0 && (
        <Typography color="text.secondary" sx={{ mt: 3 }}>
          Ningún hábito coincide con esa búsqueda.
        </Typography>
      )}

      <Dialog open={Boolean(porBorrar)} onClose={() => setPorBorrar(null)}>
        <DialogTitle sx={{ color: "primary.main", fontWeight: 700 }}>
          ¿Eliminar este hábito?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "text.secondary" }}>
            Vas a eliminar <b>{porBorrar?.name}</b> y todo su historial de días
            cumplidos. Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setPorBorrar(null)} disabled={borrando}>
            Cancelar
          </Button>
          <Button
            onClick={confirmarBorrado}
            variant="contained"
            color="error"
            disabled={borrando}
          >
            {borrando ? (
              <CircularProgress size={22} sx={{ color: "background.paper" }} />
            ) : (
              "Sí, eliminar"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(aviso)}
        autoHideDuration={4000}
        onClose={() => setAviso("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setAviso("")}>
          {aviso}
        </Alert>
      </Snackbar>
    </>
  );
}

export default function HabitosPage() {
  return (
    <LayoutApp>
      <Suspense
        fallback={
          <Box sx={{ display: "grid", placeItems: "center", minHeight: "60vh" }}>
            <CircularProgress />
          </Box>
        }
      >
        <Contenido />
      </Suspense>
    </LayoutApp>
  );
}
