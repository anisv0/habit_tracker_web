"use client";

import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";

type Props = {
  name: string;
  description: string;
  category: string;
  color: string;
};

const recordatorios = [
  "Puedes cambiar todo esto después.",
  "Si un día fallas, lo repones al siguiente.",
  "Pausarlo no borra su historial.",
];

export default function VistaPreviaHabito({
  name,
  description,
  category,
  color,
}: Props) {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "block" },
        position: "relative",
        overflow: "hidden",
        bgcolor: "primary.main",
        p: 4,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          bgcolor: "primary.light",
          opacity: 0.5,
          top: -110,
          left: 220,
        }}
      />

      <Box sx={{ position: "relative" }}>
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 2.2,
            color: "secondary.light",
            mb: 2,
          }}
        >
          ASÍ SE VERÁ
        </Typography>

        <Card sx={{ p: 2.5, border: 0 }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                border: "2px solid",
                borderColor: "divider",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <CheckRoundedIcon sx={{ fontSize: 22, color: "divider" }} />
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography noWrap sx={{ fontWeight: 700, fontSize: 16 }}>
                {name.trim() || "Tu hábito"}
              </Typography>
              <Typography noWrap sx={{ fontSize: 11.5, color: "#A08663" }}>
                {[category.trim(), description.trim()].filter(Boolean).join(" · ") ||
                  "Sin categoría"}
              </Typography>
            </Box>

            <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
              <LocalFireDepartmentRoundedIcon
                sx={{ fontSize: 17, color: "#A08663" }}
              />
              <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#A08663" }}>
                0
              </Typography>
            </Stack>
          </Stack>

          <Box sx={{ height: 6, borderRadius: 3, bgcolor: color, mt: 2.5 }} />
        </Card>

        <Typography
          sx={{ color: "background.paper", fontWeight: 700, fontSize: 17, mt: 4 }}
        >
          Tu racha empieza en 0.
        </Typography>
        <Typography sx={{ color: "#C2A79E", fontSize: 12.5, lineHeight: 1.55, mt: 1 }}>
          Marca hoy y mañana ya llevas 2. Nadie empieza con una racha larga.
        </Typography>

        <Divider sx={{ borderColor: "primary.light", my: 3.5 }} />

        <Stack spacing={2.5}>
          {recordatorios.map((texto) => (
            <Stack
              key={texto}
              direction="row"
              spacing={2}
              sx={{ alignItems: "center" }}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: 2,
                  bgcolor: "secondary.main",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                <CheckRoundedIcon sx={{ fontSize: 14, color: "primary.dark" }} />
              </Box>
              <Typography sx={{ color: "background.paper", fontSize: 12.5 }}>
                {texto}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Typography
          sx={{ color: "secondary.light", fontWeight: 700, fontSize: 12, mt: 5 }}
        >
          Sin límite de hábitos.
        </Typography>
      </Box>
    </Box>
  );
}
