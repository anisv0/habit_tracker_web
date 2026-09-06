"use client";

import { Box, Card, Stack, Typography } from "@mui/material";

type Props = {
  etiqueta: string;
  valor: string | number;
  detalle: string;
  destacada?: boolean;
  icono?: React.ReactNode;
};

export default function TarjetaResumen({
  etiqueta,
  valor,
  detalle,
  destacada = false,
  icono,
}: Props) {
  return (
    <Card
      sx={{
        p: { xs: 2, sm: 2.5 },
        height: "100%",
        bgcolor: destacada ? "#FCF5E3" : "background.paper",
        borderColor: destacada ? "#F7E7BC" : "divider",
      }}
    >
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: { xs: 9, sm: 9.5 },
              fontWeight: 700,
              letterSpacing: 1.4,
              lineHeight: 1.3,
              color: destacada ? "secondary.dark" : "#A08663",
            }}
          >
            {etiqueta.toUpperCase()}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 28, sm: 34 },
              fontWeight: 700,
              lineHeight: 1.15,
              mt: { xs: 0.5, sm: 1 },
              color: destacada ? "secondary.dark" : "primary.main",
            }}
          >
            {valor}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 11, sm: 11.5 },
              color: "text.secondary",
              mt: { xs: 0.5, sm: 1.5 },
            }}
          >
            {detalle}
          </Typography>
        </Box>

        {icono}
      </Stack>
    </Card>
  );
}
