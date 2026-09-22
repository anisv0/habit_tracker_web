"use client";

import { Box, Card, LinearProgress, Stack, Typography } from "@mui/material";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";

type Props = {
  percentToday: number;
  percentWeek: number;
  percentMonth: number;
  percentPrevMonth: number;
};

function Periodo({ etiqueta, valor }: { etiqueta: string; valor: number }) {
  return (
    <Box>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "baseline", mb: 1 }}
      >
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 1.4,
            color: "#A08663",
          }}
        >
          {etiqueta}
        </Typography>
        <Typography
          sx={{ fontSize: 18, fontWeight: 700, color: "primary.main" }}
        >
          {valor}%
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={Math.min(valor, 100)}
        sx={{
          height: 8,
          borderRadius: 2,
          bgcolor: "background.default",
          "& .MuiLinearProgress-bar": {
            bgcolor: "secondary.main",
            borderRadius: 2,
          },
        }}
      />
    </Box>
  );
}

export default function TarjetaAvance({
  percentToday,
  percentWeek,
  percentMonth,
  percentPrevMonth,
}: Props) {
  const diferencia = percentMonth - percentPrevMonth;

  const Icono =
    diferencia > 0
      ? TrendingUpRoundedIcon
      : diferencia < 0
        ? TrendingDownRoundedIcon
        : TrendingFlatRoundedIcon;

  const comparacion =
    diferencia === 0
      ? `Igual que el mes pasado (${percentPrevMonth}%)`
      : `${Math.abs(diferencia)} puntos ${
          diferencia > 0 ? "más" : "menos"
        } que el mes pasado (${percentPrevMonth}%)`;

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ color: "primary.main", fontSize: 17 }}>
        Tu avance
      </Typography>
      <Typography color="text.secondary" sx={{ fontSize: 12, mt: 0.5, mb: 3 }}>
        Hábitos cumplidos sobre los posibles
      </Typography>

      <Stack spacing={2.5}>
        <Periodo etiqueta="HOY" valor={percentToday} />
        <Periodo etiqueta="ESTA SEMANA" valor={percentWeek} />
        <Periodo etiqueta="ESTE MES" valor={percentMonth} />
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
          bgcolor: "background.default",
          borderRadius: 2.5,
          px: 2,
          py: 1.5,
          mt: 3,
        }}
      >
        <Icono sx={{ fontSize: 19, color: "secondary.dark", flexShrink: 0 }} />
        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
          {comparacion}
        </Typography>
      </Stack>
    </Card>
  );
}
