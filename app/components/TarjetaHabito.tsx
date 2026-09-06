"use client";

import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import type { Habito } from "../lib/types";

const DIAS = ["L", "M", "M", "J", "V", "S", "D"];

type Props = {
  habito: Habito;
  ocupado: boolean;
  alAlternar: (habito: Habito) => void;
  alBorrar: (habito: Habito) => void;
};

export default function TarjetaHabito({
  habito,
  ocupado,
  alAlternar,
  alBorrar,
}: Props) {
  const cumplido = habito.completedToday;

  return (
    <Card sx={{ p: 2.5, display: "flex", flexDirection: "column", height: "100%" }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
        <IconButton
          onClick={() => alAlternar(habito)}
          disabled={ocupado || !habito.active}
          aria-label={cumplido ? "Desmarcar hábito" : "Marcar hábito como cumplido"}
          sx={{
            width: 40,
            height: 40,
            flexShrink: 0,
            bgcolor: cumplido ? "secondary.main" : "transparent",
            border: cumplido ? "none" : "1.8px solid",
            borderColor: "divider",
            "&:hover": {
              bgcolor: cumplido ? "secondary.dark" : "rgba(198,161,91,0.14)",
            },
          }}
        >
          {ocupado ? (
            <CircularProgress size={18} />
          ) : (
            <CheckRoundedIcon
              sx={{ fontSize: 20, color: cumplido ? "primary.dark" : "divider" }}
            />
          )}
        </IconButton>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography noWrap sx={{ fontWeight: 700, fontSize: 16 }}>
            {habito.name}
          </Typography>
          <Typography noWrap sx={{ fontSize: 12, color: "#A08663" }}>
            {[habito.category, habito.description].filter(Boolean).join(" · ") ||
              "Sin categoría"}
          </Typography>
        </Box>

        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
          <LocalFireDepartmentRoundedIcon
            sx={{ fontSize: 16, color: cumplido ? "secondary.dark" : "#A08663" }}
          />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 15,
              color: cumplido ? "secondary.dark" : "#A08663",
            }}
          >
            {habito.streak}
          </Typography>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", my: 2.5, px: 0.5 }}
      >
        {habito.last7Days.map((hecho, indice) => (
          <Box key={indice} sx={{ textAlign: "center" }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                bgcolor: hecho ? "secondary.main" : "background.default",
                display: "grid",
                placeItems: "center",
                mx: "auto",
              }}
            >
              {hecho && (
                <CheckRoundedIcon sx={{ fontSize: 14, color: "primary.dark" }} />
              )}
            </Box>
            <Typography
              sx={{ fontSize: 10, fontWeight: 500, color: "#A08663", mt: 0.5 }}
            >
              {DIAS[indice]}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Box sx={{ flex: 1 }} />

      <Stack
        direction="row"
        spacing={1}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Chip
          label={habito.active ? "Activo" : "Pausado"}
          size="small"
          sx={{
            fontSize: 11,
            fontWeight: 600,
            bgcolor: habito.active ? "#F7E7BC" : "background.default",
            color: habito.active ? "secondary.dark" : "#A08663",
          }}
        />

        <Stack direction="row" spacing={1}>
          <Button
            component={NextLink}
            href={`/habitos/${habito.id}/editar`}
            size="small"
            variant="outlined"
            startIcon={<EditRoundedIcon sx={{ fontSize: 14 }} />}
            sx={{ fontSize: 12, py: 0.5 }}
          >
            Editar
          </Button>

          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => alBorrar(habito)}
            startIcon={<DeleteOutlineRoundedIcon sx={{ fontSize: 14 }} />}
            sx={{ fontSize: 12, py: 0.5 }}
          >
            Borrar
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
