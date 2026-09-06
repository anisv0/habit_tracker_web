"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { useAuth } from "../lib/auth";

export const ANCHO_BARRA = 260;

const enlaces = [
  { href: "/dashboard", texto: "Dashboard", Icono: SpaceDashboardRoundedIcon },
  { href: "/habitos", texto: "Hábitos", Icono: ChecklistRoundedIcon },
];

function Contenido({ alNavegar }: { alNavegar?: () => void }) {
  const pathname = usePathname();
  const { usuario, logout } = useAuth();

  const iniciales = (usuario?.name ?? "")
    .split(" ")
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "primary.main",
        px: 2,
        py: 3.5,
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", px: 1.5 }}>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 3.5,
            bgcolor: "secondary.main",
            display: "grid",
            placeItems: "center",
          }}
        >
          <CheckRoundedIcon sx={{ fontSize: 22, color: "primary.dark" }} />
        </Box>
        <Typography sx={{ color: "background.paper", fontWeight: 700, fontSize: 16 }}>
          Habit Tracker
        </Typography>
      </Stack>

      <Typography
        sx={{
          color: "#8E5F5F",
          fontSize: 9.5,
          fontWeight: 700,
          letterSpacing: 2,
          mt: 4,
          mb: 1,
          px: 1.5,
        }}
      >
        MENÚ
      </Typography>

      <List sx={{ p: 0 }}>
        {enlaces.map(({ href, texto, Icono }) => {
          const activo = pathname === href;

          return (
            <ListItemButton
              key={href}
              component={NextLink}
              href={href}
              onClick={alNavegar}
              sx={{
                borderRadius: 2.5,
                mb: 0.5,
                py: 1.25,
                position: "relative",
                bgcolor: activo ? "primary.light" : "transparent",
                "&:hover": { bgcolor: activo ? "primary.light" : "rgba(255,255,255,0.06)" },
                "&::before": activo
                  ? {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: 9,
                      width: 3,
                      height: 24,
                      borderRadius: 1,
                      bgcolor: "secondary.main",
                    }
                  : undefined,
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Icono
                  sx={{
                    fontSize: 19,
                    color: activo ? "background.paper" : "#C2A79E",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={texto}
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: 13.5,
                      fontWeight: activo ? 700 : 400,
                      color: activo ? "background.paper" : "#C2A79E",
                    },
                  },
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ flex: 1 }} />

      <Divider sx={{ borderColor: "primary.light", mb: 2.5 }} />

      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", px: 1 }}>
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            bgcolor: "secondary.main",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <Typography sx={{ color: "primary.main", fontWeight: 700, fontSize: 13 }}>
            {iniciales}
          </Typography>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            noWrap
            sx={{ color: "background.paper", fontWeight: 700, fontSize: 13 }}
          >
            {usuario?.name}
          </Typography>
          <Typography noWrap sx={{ color: "#C2A79E", fontSize: 10.5 }}>
            {usuario?.email}
          </Typography>
        </Box>

        <Tooltip title="Cerrar sesión">
          <IconButton onClick={logout} size="small" aria-label="Cerrar sesión">
            <LogoutRoundedIcon sx={{ fontSize: 18, color: "#C2A79E" }} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
}

type Props = {
  abierto: boolean;
  alCerrar: () => void;
};

export default function BarraLateral({ abierto, alCerrar }: Props) {
  return (
    <Box component="nav" sx={{ width: { md: ANCHO_BARRA }, flexShrink: { md: 0 } }}>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: ANCHO_BARRA,
            boxSizing: "border-box",
            border: 0,
          },
        }}
      >
        <Contenido />
      </Drawer>

      <Drawer
        variant="temporary"
        open={abierto}
        onClose={alCerrar}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: ANCHO_BARRA,
            boxSizing: "border-box",
            border: 0,
          },
        }}
      >
        <Contenido alNavegar={alCerrar} />
      </Drawer>
    </Box>
  );
}
