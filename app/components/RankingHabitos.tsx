"use client";

import { Box, Card, LinearProgress, Stack, Typography } from "@mui/material";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import type { Habito } from "../lib/types";

type Props = {
  habitos: Habito[];
};

export default function RankingHabitos({ habitos }: Props) {
  const ordenados = [...habitos]
    .map((habito) => {
      const cumplidos = habito.last30Days.filter((dia) => dia === true).length;
      const total = habito.last30Days.length;

      return {
        habito,
        cumplidos,
        total,
        porcentaje: Math.round((cumplidos / total) * 100),
      };
    })
    .sort((a, b) => b.porcentaje - a.porcentaje);

  return (
    <Card sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" sx={{ color: "primary.main", fontSize: 17 }}>
        Constancia por hábito
      </Typography>
      <Typography color="text.secondary" sx={{ fontSize: 12, mt: 0.5, mb: 3 }}>
        Días cumplidos en los últimos 30, de mayor a menor
      </Typography>

      <Stack spacing={2.75}>
        {ordenados.map(({ habito, cumplidos, total, porcentaje }) => (
          <Box key={habito.id}>
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ justifyContent: "space-between", alignItems: "baseline", mb: 1 }}
            >
              <Typography noWrap sx={{ fontSize: 14, fontWeight: 500 }}>
                {habito.name}
              </Typography>

              <Stack
                direction="row"
                spacing={1.25}
                sx={{ alignItems: "center", flexShrink: 0 }}
              >
                <Typography
                  sx={{ fontSize: 14, fontWeight: 700, color: "secondary.dark" }}
                >
                  {porcentaje}%
                </Typography>
                <Stack direction="row" spacing={0.25} sx={{ alignItems: "center" }}>
                  <LocalFireDepartmentRoundedIcon
                    sx={{ fontSize: 15, color: "#A08663" }}
                  />
                  <Typography
                    sx={{ fontSize: 12.5, fontWeight: 700, color: "#A08663" }}
                  >
                    {habito.streak}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={porcentaje}
              sx={{
                height: 12,
                borderRadius: 2,
                bgcolor: "background.default",
                "& .MuiLinearProgress-bar": {
                  bgcolor: habito.color,
                  borderRadius: 2,
                },
              }}
            />

            <Typography sx={{ fontSize: 11.5, color: "text.secondary", mt: 0.75 }}>
              {cumplidos} de {total} días
            </Typography>
          </Box>
        ))}
      </Stack>
    </Card>
  );
}
