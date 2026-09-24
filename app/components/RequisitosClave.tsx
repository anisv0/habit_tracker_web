"use client";

import { Box, Stack, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

type Props = {
  password: string;
};

export const reglasClave = [
  { texto: "Al menos 8 caracteres", prueba: /.{8,}/ },
  { texto: "Una letra mayúscula", prueba: /[A-Z]/ },
  { texto: "Una letra minúscula", prueba: /[a-z]/ },
  { texto: "Un número", prueba: /[0-9]/ },
];

export default function RequisitosClave({ password }: Props) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        gap: 1,
        bgcolor: "background.default",
        borderRadius: 2.5,
        px: 2,
        py: 1.5,
      }}
    >
      {reglasClave.map((regla) => {
        const cumple = regla.prueba.test(password);

        return (
          <Stack
            key={regla.texto}
            direction="row"
            spacing={1}
            sx={{ alignItems: "center" }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                flexShrink: 0,
                display: "grid",
                placeItems: "center",
                bgcolor: cumple ? "secondary.main" : "transparent",
                border: cumple ? "none" : "1.5px solid",
                borderColor: "divider",
              }}
            >
              {cumple && (
                <CheckRoundedIcon sx={{ fontSize: 11, color: "primary.dark" }} />
              )}
            </Box>

            <Typography
              sx={{
                fontSize: 12,
                color: cumple ? "secondary.dark" : "text.secondary",
                fontWeight: cumple ? 700 : 400,
              }}
            >
              {regla.texto}
            </Typography>
          </Stack>
        );
      })}
    </Box>
  );
}
