"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Box,
  CircularProgress,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import BarraLateral from "./BarraLateral";
import { useAuth } from "../lib/auth";

export default function LayoutApp({ children }: { children: React.ReactNode }) {
  const { usuario, cargando } = useAuth();
  const router = useRouter();
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    if (!cargando && !usuario) {
      router.replace("/login");
    }
  }, [cargando, usuario, router]);

  if (cargando || !usuario) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <BarraLateral abierto={menuAbierto} alCerrar={() => setMenuAbierto(false)} />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <AppBar
          position="sticky"
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              onClick={() => setMenuAbierto(true)}
              aria-label="Abrir menú"
              sx={{ color: "background.paper", mr: 1.5 }}
            >
              <MenuRoundedIcon />
            </IconButton>
            <Typography sx={{ fontWeight: 700, color: "background.paper" }}>
              Habit Tracker
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{ px: { xs: 2, sm: 3, md: 5 }, py: { xs: 3, md: 5 } }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
