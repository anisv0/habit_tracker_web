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
        p: 2.5,
        height: "100%",
        bgcolor: destacada ? "#FCF5E3" : "background.paper",
        borderColor: destacada ? "#F7E7BC" : "divider",
      }}
    >
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Box>
          <Typography
            sx={{
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: 1.6,
              color: destacada ? "secondary.dark" : "#A08663",
            }}
          >
            {etiqueta.toUpperCase()}
          </Typography>

          <Typography
            sx={{
              fontSize: 34,
              fontWeight: 700,
              lineHeight: 1.15,
              mt: 1,
              color: destacada ? "secondary.dark" : "primary.main",
            }}
          >
            {valor}
          </Typography>

          <Typography sx={{ fontSize: 11.5, color: "text.secondary", mt: 1.5 }}>
            {detalle}
          </Typography>
        </Box>

        {icono}
      </Stack>
    </Card>
  );
}
