-- ================================================================
--  Rodo's 3.0 — Schema Supabase
--  Pegar en: Supabase → SQL Editor → New query → Run
-- ================================================================


-- ─── 1. ACTIVIDAD (tracker de visitas y eventos) ─────────────────

create table if not exists actividad (
  id          uuid primary key default gen_random_uuid(),
  tipo        text not null
              check (tipo in ('pageview', 'click_whatsapp', 'descarga_herramienta', 'seccion_vista')),
  page        text,
  session_id  text,
  payload     jsonb,
  created_at  timestamptz default now()
);

create index if not exists actividad_tipo_idx       on actividad (tipo);
create index if not exists actividad_created_at_idx on actividad (created_at desc);
create index if not exists actividad_session_idx    on actividad (session_id);

alter table actividad enable row level security;

-- Cualquier visitante puede insertar (anon key), nadie puede leer desde el browser
create policy "insertar_actividad" on actividad
  for insert to anon with check (true);


-- ─── 2. CONSULTAS (formulario de contacto) ───────────────────────

create table if not exists consultas (
  id          uuid primary key default gen_random_uuid(),
  nombre      text not null,
  email       text not null,
  telefono    text,
  servicio    text,       -- servicio de interés (opcional)
  mensaje     text,
  estado      text not null default 'nuevo'
              check (estado in ('nuevo', 'respondido', 'cerrado')),
  created_at  timestamptz default now()
);

create index if not exists consultas_estado_idx     on consultas (estado);
create index if not exists consultas_created_at_idx on consultas (created_at desc);

alter table consultas enable row level security;

-- El formulario público puede insertar, no leer
create policy "insertar_consulta" on consultas
  for insert to anon with check (true);


-- ─── 3. LEADS (captura de email antes de descarga) ──────────────

create table if not exists leads (
  id          uuid primary key default gen_random_uuid(),
  nombre      text,
  email       text not null,
  herramienta text not null,
  created_at  timestamptz default now()
);

create index if not exists leads_email_idx      on leads (email);
create index if not exists leads_created_at_idx on leads (created_at desc);

alter table leads enable row level security;

-- El modal público puede insertar (service role desde API), nadie puede leer desde el browser
create policy "insertar_lead" on leads
  for insert to anon with check (true);


-- ─── 4. USERS (solo admin: Rodrigo) ──────────────────────────────

create table if not exists users (
  id            uuid primary key default gen_random_uuid(),
  email         text not null unique,
  password_hash text not null,
  nombre        text not null,
  rol           text not null default 'admin'
                check (rol in ('admin')),
  activo        boolean not null default true,
  created_at    timestamptz default now()
);

alter table users enable row level security;
-- Sin políticas anon = nadie desde el browser puede leer usuarios


-- ─── INSERT usuario admin ─────────────────────────────────────────
-- Reemplazar el password_hash con el hash bcrypt de la contraseña real de Rodrigo.
-- Para generar: node -e "const b=require('bcryptjs'); b.hash('TU_PASSWORD',12).then(console.log)"
-- Contraseña actual: rodos2025 (CAMBIAR en producción)

insert into users (email, password_hash, nombre, rol)
values (
  'admin@rodos.com',
  '$2b$12$placeholder_reemplazar_con_hash_real',
  'Rodrigo',
  'admin'
)
on conflict (email) do nothing;
