"use client";

import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";

type Props = {
  compacto?: boolean;
};

export default function ResumenDemo({ compacto = false }: Props) {
  return (
    <Box>
      {!compacto && (
        <Typography
          sx={{ color: "#C2A79E", fontSize: 16, lineHeight: 1.55, mb: 5 }}
        >
          Un clic para registrar, tres indicadores para saber cómo vas. Lo mismo en el
          celular y en la computadora.
        </Typography>
      )}

      <Stack
        direction="row"
        spacing={compacto ? 1.5 : 2}
        sx={{
          alignItems: "center",
          bgcolor: "background.paper",
          borderRadius: compacto ? 3 : 4.5,
          p: compacto ? 1.5 : 2.5,
          mb: compacto ? 3 : 4.5,
        }}
      >
        <Box
          sx={{
            width: compacto ? 34 : 44,
            height: compacto ? 34 : 44,
            borderRadius: "50%",
            bgcolor: "secondary.main",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <CheckRoundedIcon
            sx={{ fontSize: compacto ? 18 : 22, color: "primary.dark" }}
          />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700, fontSize: compacto ? 14 : 16 }}>
            Ir al gimnasio
          </Typography>
          <Typography
            sx={{ color: "secondary.dark", fontSize: compacto ? 11 : 12.5 }}
          >
            Cumplido hoy · Salud
          </Typography>
        </Box>

        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
          <LocalFireDepartmentRoundedIcon
            sx={{ fontSize: compacto ? 15 : 18, color: "secondary.dark" }}
          />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: compacto ? 14 : 16,
              color: "secondary.dark",
            }}
          >
            12
          </Typography>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center", mb: 1 }}
      >
        <Typography
          sx={{ color: "#C2A79E", fontSize: compacto ? 11.5 : 13, fontWeight: 500 }}
        >
          Esta semana
        </Typography>
        <Typography
          sx={{
            color: "secondary.light",
            fontSize: compacto ? 11.5 : 13,
            fontWeight: 700,
          }}
        >
          60%
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={60}
        sx={{
          height: compacto ? 7 : 10,
          borderRadius: 3,
          bgcolor: "primary.light",
          "& .MuiLinearProgress-bar": { bgcolor: "secondary.main", borderRadius: 3 },
        }}
      />

      <Typography
        sx={{ color: "#C2A79E", fontSize: compacto ? 11 : 12.5, mt: 1.5 }}
      >
        3 de 5 hábitos completados
      </Typography>
    </Box>
  );
}
