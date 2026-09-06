export type Usuario = {
  id: string;
  name: string;
  email: string;
};

export type Habito = {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  color: string;
  icon: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  completedToday: boolean;
  streak: number;
  last7Days: boolean[];
};

export type Registro = {
  id: string;
  date: string;
  createdAt: string;
  habitId: string;
};

export type Resumen = {
  totalHabits: number;
  completedToday: number;
  pendingToday: number;
  percentToday: number;
  currentStreak: number;
  bestStreak: number;
  percentWeek: number;
  percentMonth: number;
  percentPrevMonth: number;
  last7Days: { date: string; completed: number }[];
};

export type RespuestaAuth = {
  user: Usuario;
  access_token: string;
};
