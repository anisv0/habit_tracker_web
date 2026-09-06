"use client";

import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import type { Habito } from "../lib/types";

type Props = {
  habito: Habito;
  ocupado: boolean;
  alAlternar: (habito: Habito) => void;
};

export default function FilaHabito({ habito, ocupado, alAlternar }: Props) {
  const cumplido = habito.completedToday;

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        alignItems: "center",
        p: 1.75,
        borderRadius: 4,
        border: "1.3px solid",
        borderColor: cumplido ? "#F7E7BC" : "divider",
        bgcolor: cumplido ? "#FCF5E3" : "background.paper",
        transition: "background-color .2s, border-color .2s",
      }}
    >
      <IconButton
        onClick={() => alAlternar(habito)}
        disabled={ocupado}
        aria-label={cumplido ? "Desmarcar hábito" : "Marcar hábito como cumplido"}
        sx={{
          width: 38,
          height: 38,
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
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center", flexWrap: "wrap" }}
        >
          <Typography noWrap sx={{ fontWeight: 700, fontSize: 15 }}>
            {habito.name}
          </Typography>

          {habito.category && (
            <Chip
              label={habito.category}
              size="small"
              sx={{
                height: 22,
                fontSize: 10,
                fontWeight: 500,
                bgcolor: "#EBD1D2",
                color: "primary.main",
              }}
            />
          )}
        </Stack>

        <Typography
          sx={{
            fontSize: 12,
            mt: 0.25,
            color: cumplido ? "secondary.dark" : "text.secondary",
          }}
        >
          {cumplido ? "Cumplido hoy" : "Pendiente"}
        </Typography>
      </Box>

      <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
        <LocalFireDepartmentRoundedIcon
          sx={{ fontSize: 17, color: cumplido ? "secondary.dark" : "#A08663" }}
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
  );
}
