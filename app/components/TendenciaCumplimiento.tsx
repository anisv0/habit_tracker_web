"use client";

import { Box, Card, Stack, Tooltip, Typography } from "@mui/material";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";

type Semana = { week: string; percent: number };

type Props = {
  semanas: Semana[];
};

export default function TendenciaCumplimiento({ semanas }: Props) {
  const primera = semanas[0];
  const ultima = semanas[semanas.length - 1];

  let subidas = 0;

  for (let numero = 1; numero < semanas.length; numero++) {
    const anterior = semanas[numero - 1].percent;
    const actual = semanas[numero].percent;

    if (actual > anterior) {
      subidas++;
    }
  }

  const cambio = (ultima?.percent ?? 0) - (primera?.percent ?? 0);

  const Icono =
    cambio > 0
      ? TrendingUpRoundedIcon
      : cambio < 0
        ? TrendingDownRoundedIcon
        : TrendingFlatRoundedIcon;

  const resumen =
    cambio > 0
      ? `Vas subiendo: ${cambio} puntos más que hace seis semanas.`
      : cambio < 0
        ? `Vas bajando: ${Math.abs(cambio)} puntos menos que hace seis semanas.`
        : "Te mantienes igual que hace seis semanas.";

  return (
    <Card sx={{ p: { xs: 2, sm: 3 } }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        sx={{ justifyContent: "space-between", alignItems: { sm: "flex-start" }, mb: 3 }}
      >
        <Box>
          <Typography variant="h5" sx={{ color: "primary.main", fontSize: 17 }}>
            Tendencia de cumplimiento
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: 12, mt: 0.5 }}>
            Últimas 6 semanas
          </Typography>
        </Box>

        <Typography
          sx={{ fontSize: 30, fontWeight: 700, color: "secondary.dark", lineHeight: 1 }}
        >
          {ultima?.percent ?? 0}%
        </Typography>
      </Stack>

      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 2 }}
        sx={{ alignItems: "flex-end", height: 140 }}
      >
        {semanas.map((semana, indice) => {
          const esUltima = indice === semanas.length - 1;

          return (
            <Box key={semana.week} sx={{ flex: 1, textAlign: "center" }}>
              <Tooltip title={`${semana.week}: ${semana.percent}% de cumplimiento`} arrow>
                <Box
                  sx={{
                    height: 110,
                    borderRadius: 2,
                    bgcolor: "background.default",
                    display: "flex",
                    alignItems: "flex-end",
                    overflow: "hidden",
                    cursor: "default",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: `${Math.max(Math.min(semana.percent, 100), 3)}%`,
                      borderRadius: "8px 8px 0 0",
                      bgcolor: esUltima ? "secondary.main" : "#F7E7BC",
                      transition: "height .3s",
                    }}
                  />
                </Box>
              </Tooltip>

              <Typography
                sx={{
                  fontSize: 11.5,
                  fontWeight: esUltima ? 700 : 500,
                  color: esUltima ? "secondary.dark" : "text.secondary",
                  mt: 1,
                }}
              >
                {semana.week}
              </Typography>
              <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
                {semana.percent}%
              </Typography>
            </Box>
          );
        })}
      </Stack>

      <Stack
        direction="row"
        spacing={1.25}
        sx={{
          alignItems: "flex-start",
          bgcolor: "background.default",
          borderRadius: 2.5,
          px: 2,
          py: 1.5,
          mt: 3,
        }}
      >
        <Icono sx={{ fontSize: 19, color: "secondary.dark", flexShrink: 0, mt: 0.2 }} />
        <Typography sx={{ fontSize: 12.5, color: "text.secondary" }}>
          {resumen} Mejoraste en {subidas} de las últimas 5 semanas.
        </Typography>
      </Stack>
    </Card>
  );
}
