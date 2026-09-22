"use client";

import { useState } from "react";
import { z } from "zod";
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import VistaPreviaHabito from "./VistaPreviaHabito";

export type ValoresHabito = {
  name: string;
  description: string;
  category: string;
  color: string;
};

type Props = {
  titulo: string;
  subtitulo: string;
  textoBoton: string;
  valorInicial?: Partial<ValoresHabito>;
  mostrarSugerencias?: boolean;
  alEnviar: (valores: ValoresHabito) => Promise<void>;
  alCancelar: () => void;
};

const sugerencias = [
  "Ir al gimnasio",
  "Leer 20 páginas",
  "Tomar agua",
  "Dormir temprano",
];

const categorias = ["Salud", "Estudio", "Personal"];

const colores = ["#4A0D18", "#6E1A22", "#C6A15B", "#A8863F", "#6B5744"];

const esquema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede pasar de 50 caracteres"),
  description: z.string().trim().max(200, "La descripción es muy larga"),
  category: z.string().trim().max(30, "La categoría es muy larga"),
  color: z.string(),
});

export default function FormularioHabito({
  titulo,
  subtitulo,
  textoBoton,
  valorInicial,
  mostrarSugerencias = false,
  alEnviar,
  alCancelar,
}: Props) {
  const [name, setName] = useState(valorInicial?.name ?? "");
  const [description, setDescription] = useState(valorInicial?.description ?? "");
  const [category, setCategory] = useState(valorInicial?.category ?? "");
  const [color, setColor] = useState(valorInicial?.color ?? colores[0]);

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    setErrorGeneral("");

    const resultado = esquema.safeParse({ name, description, category, color });

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
      await alEnviar(resultado.data);
    } catch (e) {
      setErrorGeneral(
        e instanceof Error ? e.message : "No se pudo guardar el hábito",
      );
      setEnviando(false);
    }
  }

  return (
    <Card
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 400px" },
        overflow: "hidden",
        maxWidth: 980,
        mx: "auto",
      }}
    >
      <Box component="form" onSubmit={enviar} noValidate sx={{ p: { xs: 3, sm: 5 } }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
        >
          <Box>
            <Typography variant="h2" sx={{ color: "primary.main", fontSize: 27 }}>
              {titulo}
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: 13, mt: 1 }}>
              {subtitulo}
            </Typography>
          </Box>

          <Tooltip title="Cancelar">
            <IconButton
              onClick={alCancelar}
              aria-label="Cancelar"
              sx={{ bgcolor: "background.default" }}
            >
              <CloseRoundedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack spacing={3.5} sx={{ mt: 4 }}>
          {errorGeneral && <Alert severity="error">{errorGeneral}</Alert>}

          <Box>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1.8,
                color: "#A08663",
                mb: 1.5,
              }}
            >
              ¿QUÉ QUIERES HACER?
            </Typography>

            <TextField
              placeholder="Ir al gimnasio"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={Boolean(errores.name)}
              helperText={errores.name}
              disabled={enviando}
              autoFocus
              slotProps={{ htmlInput: { style: { fontSize: 17, fontWeight: 700 } } }}
            />

            {mostrarSugerencias && (
              <>
                <Typography sx={{ fontSize: 11, color: "#A08663", mt: 2, mb: 1 }}>
                  O elige una de estas
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
                  {sugerencias.map((texto) => (
                    <Chip
                      key={texto}
                      label={texto}
                      onClick={() => setName(texto)}
                      variant={name === texto ? "filled" : "outlined"}
                      sx={{
                        fontSize: 11.5,
                        bgcolor: name === texto ? "#F7E7BC" : "background.paper",
                        color: name === texto ? "secondary.dark" : "text.secondary",
                        borderColor: name === texto ? "secondary.main" : "divider",
                      }}
                    />
                  ))}
                </Stack>
              </>
            )}
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1.8,
                color: "#A08663",
                mb: 1.5,
              }}
            >
              DESCRIPCIÓN · OPCIONAL
            </Typography>

            <TextField
              placeholder="Tres veces por semana"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={Boolean(errores.description)}
              helperText={errores.description}
              disabled={enviando}
              multiline
              minRows={2}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1.8,
                color: "#A08663",
                mb: 1.5,
              }}
            >
              CATEGORÍA · OPCIONAL
            </Typography>

            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1, mb: 2 }}>
              {categorias.map((texto) => (
                <Chip
                  key={texto}
                  label={texto}
                  onClick={() => setCategory(category === texto ? "" : texto)}
                  sx={{
                    fontSize: 12,
                    fontWeight: category === texto ? 700 : 500,
                    bgcolor: category === texto ? "#EBD1D2" : "background.paper",
                    color: category === texto ? "primary.main" : "text.secondary",
                    border: "1.3px solid",
                    borderColor: category === texto ? "#EBD1D2" : "divider",
                  }}
                />
              ))}
            </Stack>

            <TextField
              placeholder="O escribe una categoría propia"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              error={Boolean(errores.category)}
              helperText={errores.category}
              disabled={enviando}
              size="small"
            />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1.8,
                color: "#A08663",
                mb: 1.5,
              }}
            >
              COLOR
            </Typography>

            <Stack direction="row" spacing={1.5}>
              {colores.map((valor) => (
                <Box
                  key={valor}
                  role="button"
                  tabIndex={0}
                  aria-label={`Color ${valor}`}
                  onClick={() => setColor(valor)}
                  onKeyDown={(e) => e.key === "Enter" && setColor(valor)}
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    bgcolor: valor,
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                    outline: color === valor ? "2.5px solid" : "none",
                    outlineColor: "secondary.main",
                    outlineOffset: 2,
                  }}
                >
                  {color === valor && (
                    <CheckRoundedIcon sx={{ fontSize: 18, color: "#FFFCF7" }} />
                  )}
                </Box>
              ))}
            </Stack>
          </Box>

          <Divider />

          <Stack direction={{ xs: "column-reverse", sm: "row" }} spacing={2}>
            <Button
              variant="outlined"
              onClick={alCancelar}
              disabled={enviando}
              sx={{ height: 48, minWidth: 120 }}
            >
              Cancelar
            </Button>

            <Box sx={{ flex: 1 }} />

            <Button
              type="submit"
              variant="contained"
              disabled={enviando}
              startIcon={!enviando && <CheckRoundedIcon />}
              sx={{ height: 48, minWidth: 220 }}
            >
              {enviando ? (
                <CircularProgress size={22} sx={{ color: "background.paper" }} />
              ) : (
                textoBoton
              )}
            </Button>
          </Stack>
        </Stack>
      </Box>

      <VistaPreviaHabito
        name={name}
        description={description}
        category={category}
        color={color}
      />
    </Card>
  );
}
