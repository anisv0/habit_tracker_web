"use client";

import { Box, Card, Stack, Typography } from "@mui/material";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";

type Dia = { date: string; completed: number };

type Props = {
  dias: Dia[];
  totalHabitos: number;
};

const nombres = [
  "domingos",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábados",
];

const iniciales = ["D", "L", "M", "M", "J", "V", "S"];

export default function SemanaTipica({ dias, totalHabitos }: Props) {
  const acumulado = iniciales.map(() => ({ suma: 0, cantidad: 0 }));

  for (const dia of dias) {
    const indice = new Date(`${dia.date}T12:00:00.000Z`).getUTCDay();
    acumulado[indice].suma += dia.completed;
    acumulado[indice].cantidad += 1;
  }

  const porcentajes = acumulado.map(({ suma, cantidad }) => {
    if (cantidad === 0 || totalHabitos === 0) return 0;
    return Math.round((suma / cantidad / totalHabitos) * 100);
  });

  let mejor = 0;
  let peor = 0;

  for (let i = 1; i < porcentajes.length; i++) {
    if (porcentajes[i] > porcentajes[mejor]) {
      mejor = i;
    }

    if (porcentajes[i] < porcentajes[peor]) {
      peor = i;
    }
  }

  const maximo = porcentajes[mejor];
  const minimo = porcentajes[peor];

  const hayDatos = maximo > 0;

  return (
    <Card sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" sx={{ color: "primary.main", fontSize: 17 }}>
        Tu semana típica
      </Typography>
      <Typography color="text.secondary" sx={{ fontSize: 12, mt: 0.5, mb: 3 }}>
        Promedio de cumplimiento por día, últimos 30 días
      </Typography>

      <Stack direction="row" spacing={1} sx={{ alignItems: "flex-end" }}>
        {porcentajes.map((valor, indice) => (
          <Box key={indice} sx={{ flex: 1, textAlign: "center" }}>
            <Box
              sx={{
                height: 120,
                borderRadius: 2,
                bgcolor: "background.default",
                display: "flex",
                alignItems: "flex-end",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: `${Math.max(valor, 2)}%`,
                  borderRadius: 2,
                  bgcolor:
                    hayDatos && indice === mejor ? "secondary.main" : "#F7E7BC",
                  transition: "height .3s",
                }}
              />
            </Box>

            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                mt: 1,
                color: hayDatos && indice === mejor ? "secondary.dark" : "text.secondary",
              }}
            >
              {iniciales[indice]}
            </Typography>
            <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
              {valor}%
            </Typography>
          </Box>
        ))}
      </Stack>

      {hayDatos && (
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
          <InsightsRoundedIcon
            sx={{ fontSize: 19, color: "secondary.dark", flexShrink: 0, mt: 0.2 }}
          />
          <Typography sx={{ fontSize: 12.5, color: "text.secondary" }}>
            Los <strong>{nombres[mejor]}</strong> son tu mejor día ({maximo}%).
            {mejor !== peor && (
              <> Los {nombres[peor]} son los que más te cuestan ({minimo}%).</>
            )}
          </Typography>
        </Stack>
      )}
    </Card>
  );
}
