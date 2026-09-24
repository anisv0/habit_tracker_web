"use client";

import { Box, Card, Stack, Tooltip, Typography } from "@mui/material";
import { fechaCorta } from "../lib/fechas";

type Dia = { date: string; completed: number };

type Props = {
  dias: Dia[];
};

export default function GraficaMes({ dias }: Props) {
  let maximo = 1;
  let total = 0;

  for (const dia of dias) {
    total += dia.completed;

    if (dia.completed > maximo) {
      maximo = dia.completed;
    }
  }

  const activos = dias.filter((dia) => dia.completed > 0).length;
  const mejor = dias.find((dia) => dia.completed === maximo);

  const primero = dias[0];
  const ultimo = dias[dias.length - 1];

  const destacados = [
    { valor: total, etiqueta: total === 1 ? "marca en total" : "marcas en total" },
    { valor: activos, etiqueta: activos === 1 ? "día con actividad" : "días con actividad" },
    { valor: maximo, etiqueta: "en tu mejor día" },
  ];

  return (
    <Card sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" sx={{ color: "primary.main", fontSize: 17 }}>
        Últimos 30 días
      </Typography>
      <Typography color="text.secondary" sx={{ fontSize: 12, mt: 0.5, mb: 3 }}>
        Cuántos hábitos cumpliste cada día
      </Typography>

      <Stack
        direction="row"
        spacing={{ xs: 3, sm: 5 }}
        sx={{ flexWrap: "wrap", gap: 2, mb: 3 }}
      >
        {destacados.map((dato) => (
          <Box key={dato.etiqueta}>
            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 700,
                lineHeight: 1.1,
                color: "primary.main",
              }}
            >
              {dato.valor}
            </Typography>
            <Typography sx={{ fontSize: 11.5, color: "text.secondary", mt: 0.25 }}>
              {dato.etiqueta}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Stack
        direction="row"
        spacing={0.6}
        sx={{ alignItems: "flex-end", height: { xs: 100, sm: 140 } }}
      >
        {dias.map((dia) => (
          <Tooltip
            key={dia.date}
            title={`${fechaCorta(dia.date)}: ${dia.completed} ${
              dia.completed === 1 ? "hábito" : "hábitos"
            }`}
            arrow
          >
            <Box
              sx={{
                flex: 1,
                height: "100%",
                display: "flex",
                alignItems: "flex-end",
                cursor: "default",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: `${Math.max((dia.completed / maximo) * 100, 3)}%`,
                  borderRadius: "4px 4px 0 0",
                  bgcolor:
                    dia.completed === 0
                      ? "background.default"
                      : dia.completed === maximo
                        ? "secondary.main"
                        : "#F7E7BC",
                  transition: "height .3s",
                }}
              />
            </Box>
          </Tooltip>
        ))}
      </Stack>

      {primero && ultimo && (
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", mt: 1.5 }}
        >
          <Typography sx={{ fontSize: 11.5, color: "text.secondary" }}>
            {fechaCorta(primero.date)}
          </Typography>

          {mejor && maximo > 0 && (
            <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: "secondary.dark" }}>
              mejor día: {fechaCorta(mejor.date)}
            </Typography>
          )}

          <Typography sx={{ fontSize: 11.5, color: "text.secondary" }}>
            hoy
          </Typography>
        </Stack>
      )}
    </Card>
  );
}
