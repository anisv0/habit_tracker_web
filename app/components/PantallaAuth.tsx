"use client";

import { Box, Stack, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import PanelMarca from "./PanelMarca";
import EncabezadoMarca from "./EncabezadoMarca";

type Props = {
  titulo: string;
  pie: string;
  lateral: React.ReactNode;
  children: React.ReactNode;
};

export default function PantallaAuth({ titulo, pie, lateral, children }: Props) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <PanelMarca titulo={titulo}>{lateral}</PanelMarca>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: { xs: "flex-start", md: "center" },
        }}
      >
        <EncabezadoMarca titulo={titulo} />

        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: 340, sm: 400 },
            px: { xs: 2, sm: 3 },
            pb: { xs: 4, md: 5 },
            mt: { xs: -3, md: 0 },
            position: "relative",
            zIndex: 1,
          }}
        >
          {children}

          <Typography
            align="center"
            sx={{
              display: { xs: "none", md: "block" },
              fontSize: 13,
              mt: 4,
              color: "#A08663",
            }}
          >
            {pie}
          </Typography>
        </Box>

        <Box
          component="footer"
          sx={{
            display: { xs: "block", md: "none" },
            width: "100%",
            mt: "auto",
            px: 3,
            py: 4,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack spacing={1.5} sx={{ alignItems: "center" }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  bgcolor: "secondary.main",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <CheckRoundedIcon sx={{ fontSize: 13, color: "primary.dark" }} />
              </Box>
              <Typography
                sx={{ fontWeight: 700, fontSize: 13, color: "primary.main" }}
              >
                Habit Tracker
              </Typography>
            </Stack>

            <Typography align="center" sx={{ fontSize: 12, color: "#A08663" }}>
              {pie}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
