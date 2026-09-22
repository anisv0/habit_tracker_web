# Habit Tracker Web

Interfaz web para crear hábitos, marcar los días cumplidos y ver el avance en un panel de seguimiento.

Este repositorio contiene únicamente el frontend. Necesita la API para funcionar: [habit_tracker_api](https://github.com/anisv0/habit_tracker_api).

## Tecnologías

| Herramienta | Uso |
| --- | --- |
| Next.js | Framework de React y manejo de rutas |
| React | Construcción de la interfaz |
| Material UI | Componentes y sistema de diseño |
| zod | Validación de formularios |
| TypeScript | Tipado de datos |

## Requisitos

- Node.js 20 o superior
- pnpm
- La API corriendo en `http://localhost:3001`

## Instalación

```bash
pnpm install
```

## Variables de entorno

Crear un archivo `.env.local` en la raíz:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Es la dirección donde responde la API. El archivo está excluido del repositorio; en `.env.example` está el nombre de la variable sin valor.

## Ejecución

```bash
pnpm dev
```

La aplicación queda en `http://localhost:3000`.

## Pantallas

| Ruta | Descripción | Sesión |
| --- | --- | --- |
| `/registro` | Crear una cuenta | No |
| `/login` | Iniciar sesión | No |
| `/dashboard` | Panel con el resumen del día, las rachas y el avance diario, semanal y mensual | Sí |
| `/habitos` | Lista completa de hábitos, con búsqueda y filtros | Sí |
| `/estadisticas` | Constancia por hábito y gráfica del último mes | Sí |
| `/habitos/nuevo` | Formulario para crear un hábito | Sí |
| `/habitos/[id]/editar` | Formulario para editar un hábito | Sí |

Las pantallas con sesión redirigen al login si no hay un token guardado.

## Arquitectura

```
Navegador
    │
    ▼
Next.js  ·  App Router
    │
    │   ┌─ app/<ruta>/page.tsx    la pantalla
    │   ├─ app/components/        piezas de interfaz reutilizables
    │   ├─ app/lib/auth.tsx       sesión del usuario, compartida por Context
    │   └─ app/lib/api.ts         arma la petición y agrega el token
    │
    │  HTTP con Authorization: Bearer <token>
    ▼
API  ·  NestJS                    habit_tracker_api
    ▼
MongoDB
```

Las pantallas no hablan con la API directamente: siempre pasan por `lib/api.ts`, que centraliza la dirección del servidor, el token y la traducción de errores. Por eso un cambio en cómo se autentica la app se hace en un solo archivo.

### Estructura del código

```
app/
├── login/ registro/ dashboard/ habitos/   una carpeta por pantalla
├── components/                            piezas reutilizables de interfaz
├── lib/                                   lógica sin interfaz
│   ├── api.ts      peticiones a la API y manejo de errores
│   ├── auth.tsx    sesión del usuario y token
│   ├── fechas.ts   formato de fechas
│   └── types.ts    forma de los datos que devuelve la API
├── theme.ts                               colores y tipografía
└── layout.tsx                             estructura común a toda la app
```

## Sesión

Al iniciar sesión, la API devuelve un token que se guarda en `sessionStorage`. A partir de ahí, `lib/api.ts` lo agrega en el encabezado `Authorization` de cada petición. Al abrir la aplicación se consulta `/auth/me` para confirmar que el token sigue siendo válido; si no lo es, se borra y se vuelve al login.

Se usa `sessionStorage` y no `localStorage` para que el token se borre al cerrar la pestaña. De esa forma la sesión no queda guardada en el equipo después de usar la aplicación.

## Validación

Los formularios de registro, inicio de sesión y creación de hábitos validan los datos con zod antes de enviarlos. Los errores se muestran debajo de cada campo. La API vuelve a validar todo por su cuenta.
