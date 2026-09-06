"use client";

import { Box, Stack, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

type Props = {
  titulo: string;
};

export default function EncabezadoMarca({ titulo }: Props) {
  return (
    <Box
      sx={{
        display: { xs: "block", md: "none" },
        width: "100%",
        position: "relative",
        overflow: "hidden",
        bgcolor: "primary.main",
        px: { xs: 3, sm: 5 },
        pt: 6,
        pb: { xs: 14, sm: 16 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          bgcolor: "primary.light",
          opacity: 0.45,
          top: -130,
          right: -90,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 180,
          height: 180,
          borderRadius: "50%",
          bgcolor: "primary.light",
          opacity: 0.25,
          bottom: -90,
          left: -60,
        }}
      />

      <Box sx={{ position: "relative" }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 4 }}>
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: 3.5,
              bgcolor: "secondary.main",
              display: "grid",
              placeItems: "center",
            }}
          >
            <CheckRoundedIcon sx={{ fontSize: 24, color: "primary.dark" }} />
          </Box>
          <Box>
            <Typography
              sx={{ color: "background.paper", fontWeight: 700, fontSize: 17 }}
            >
              Habit Tracker
            </Typography>
            <Typography sx={{ color: "#C2A79E", fontSize: 12 }}>
              Tus hábitos, en un toque
            </Typography>
          </Box>
        </Stack>

        <Typography
          sx={{
            color: "background.paper",
            fontWeight: 700,
            fontSize: { xs: 27, sm: 32 },
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          {titulo}
        </Typography>
      </Box>
    </Box>
  );
}
