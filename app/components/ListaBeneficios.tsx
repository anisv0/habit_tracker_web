"use client";

import { Box, Stack, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

const beneficios = [
  {
    titulo: "Creas tu cuenta con tres datos",
    detalle: "nombre, correo y contraseña",
  },
  {
    titulo: "Añades tu primer hábito en un minuto",
    detalle: "sin categorías obligatorias",
  },
  {
    titulo: "Marcas lo de hoy con un clic",
    detalle: "y ves tu racha desde el primer día",
  },
];

export default function ListaBeneficios() {
  return (
    <Box>
      <Stack spacing={3}>
        {beneficios.map((beneficio) => (
          <Stack
            key={beneficio.titulo}
            direction="row"
            spacing={2}
            sx={{ alignItems: "flex-start" }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                bgcolor: "secondary.main",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <CheckRoundedIcon sx={{ fontSize: 18, color: "primary.dark" }} />
            </Box>
            <Box>
              <Typography
                sx={{ color: "background.paper", fontWeight: 700, fontSize: 16.5 }}
              >
                {beneficio.titulo}
              </Typography>
              <Typography sx={{ color: "#C2A79E", fontSize: 13 }}>
                {beneficio.detalle}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>

      <Typography
        sx={{ color: "secondary.light", fontSize: 13, fontWeight: 500, mt: 6 }}
      >
        Sin tarjeta, sin límite de hábitos.
      </Typography>
    </Box>
  );
}
