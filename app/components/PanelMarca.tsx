"use client";

import { Box, Stack, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

type Props = {
  titulo: string;
  children: React.ReactNode;
};

export default function PanelMarca({ titulo, children }: Props) {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        width: { md: 420, lg: 540, xl: 620 },
        flexShrink: 0,
        bgcolor: "primary.main",
        px: { md: 4, lg: 7, xl: 9 },
        py: { md: 5, lg: 7, xl: 8.5 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 460,
          height: 460,
          borderRadius: "50%",
          bgcolor: "primary.light",
          opacity: 0.55,
          top: -170,
          left: 330,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          bgcolor: "primary.light",
          opacity: 0.35,
          top: 690,
          left: -110,
        }}
      />

      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "center", position: "relative" }}
      >
        <Box
          sx={{
            width: 62,
            height: 62,
            borderRadius: 5,
            bgcolor: "secondary.main",
            display: "grid",
            placeItems: "center",
          }}
        >
          <CheckRoundedIcon sx={{ fontSize: 32, color: "primary.dark" }} />
        </Box>
        <Box>
          <Typography sx={{ color: "background.paper", fontWeight: 700, fontSize: 21 }}>
            Habit Tracker
          </Typography>
          <Typography sx={{ color: "#C2A79E", fontSize: 13 }}>
            Tus hábitos, en un toque
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ position: "relative" }}>
        <Typography
          sx={{
            color: "background.paper",
            fontWeight: 700,
            fontSize: { md: 34, lg: 42, xl: 50 },
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
          }}
        >
          {titulo}
        </Typography>
      </Box>

      <Box sx={{ position: "relative", width: "100%", maxWidth: 420 }}>
        {children}
      </Box>
    </Box>
  );
}
