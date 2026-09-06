"use client";

import { useState } from "react";
import NextLink from "next/link";
import { z } from "zod";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import PantallaAuth from "../components/PantallaAuth";
import ResumenDemo from "../components/ResumenDemo";
import { useAuth } from "../lib/auth";
import { ApiError } from "../lib/api";

const esquema = z.object({
  email: z.email("Escribe un correo válido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export default function LoginPage() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verClave, setVerClave] = useState(false);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    setErrorGeneral("");

    const resultado = esquema.safeParse({ email, password });

    if (!resultado.success) {
      const nuevos: Record<string, string> = {};
      for (const problema of resultado.error.issues) {
        nuevos[String(problema.path[0])] = problema.message;
      }
      setErrores(nuevos);
      return;
    }

    setErrores({});
    setEnviando(true);

    try {
      await login(email, password);
    } catch (error) {
      setErrorGeneral(
        error instanceof ApiError ? error.message : "Ocurrió un error inesperado",
      );
      setEnviando(false);
    }
  }

  return (
    <PantallaAuth
      titulo="Marca lo de hoy y sigue avanzando."
      pie="Solo correo y contraseña. Nada más para empezar."
      lateral={<ResumenDemo />}
    >
      <Card sx={{ width: "100%", p: { xs: 2.5, sm: 4 } }}>
        <Typography
          variant="h2"
          sx={{ color: "primary.main", fontSize: { xs: 24, sm: 32 } }}
        >
          Hola de nuevo
        </Typography>

        <Typography color="text.secondary" sx={{ fontSize: { xs: 13.5, sm: 15 }, mt: 1 }}>
          Entra y marca lo de hoy en segundos.
        </Typography>

        <Box component="form" onSubmit={enviar} noValidate sx={{ mt: { xs: 2.5, sm: 3.5 } }}>
          <Stack spacing={{ xs: 2, sm: 2.5 }}>
            {errorGeneral && <Alert severity="error">{errorGeneral}</Alert>}

            <TextField
              label="Correo"
              type="email"
              placeholder="tucorreo@uni.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(errores.email)}
              helperText={errores.email}
              disabled={enviando}
              autoComplete="email"
            />

            <TextField
              label="Contraseña"
              type={verClave ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(errores.password)}
              helperText={errores.password}
              disabled={enviando}
              autoComplete="current-password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setVerClave((v) => !v)}
                        edge="end"
                        aria-label={
                          verClave ? "Ocultar contraseña" : "Mostrar contraseña"
                        }
                      >
                        {verClave ? (
                          <VisibilityOffRoundedIcon />
                        ) : (
                          <VisibilityRoundedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={enviando}
              endIcon={!enviando && <ArrowForwardRoundedIcon />}
              sx={{ height: { xs: 50, sm: 56 }, fontSize: { xs: 15.5, sm: 17 } }}
            >
              {enviando ? (
                <CircularProgress size={24} sx={{ color: "background.paper" }} />
              ) : (
                "Entrar"
              )}
            </Button>
          </Stack>
        </Box>

        <Typography color="text.secondary" align="center" sx={{ fontSize: { xs: 14, sm: 15 }, mt: { xs: 2.5, sm: 3.5 } }}>
          ¿No tienes cuenta?{" "}
          <Link
            component={NextLink}
            href="/registro"
            underline="hover"
            sx={{ color: "secondary.dark", fontWeight: 700 }}
          >
            Crear cuenta
          </Link>
        </Typography>
      </Card>
    </PantallaAuth>
  );
}
