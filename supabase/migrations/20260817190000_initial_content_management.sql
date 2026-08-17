create schema if not exists private;

create table public.admin_users (
  email text primary key check (email = lower(email)),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null
    and exists (
      select 1
      from public.admin_users
      where email = lower(coalesce((select auth.jwt()) ->> 'email', ''))
        and active
    );
$$;

revoke all on function private.is_admin() from public;
grant usage on schema private to authenticated;
grant execute on function private.is_admin() to authenticated;

create table public.activities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null check (category in ('book_club', 'recollection', 'cinedebate', 'other')),
  type_label text not null,
  title text not null,
  starts_at timestamptz,
  date_text text,
  location_name text not null default '',
  location_address text,
  city text not null default 'Caruaru',
  state text not null default 'PE',
  theme text,
  description text not null default '',
  detail_url text not null default '/',
  featured boolean not null default false,
  status text not null default 'scheduled' check (status in ('draft', 'scheduled', 'completed', 'cancelled')),
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.movies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  session_order integer not null unique check (session_order > 0),
  title text not null,
  release_year integer check (release_year between 1888 and 2200),
  theme text not null default '',
  status_label text not null default 'Já assistido',
  favorite boolean not null default false,
  cover_url text,
  cover_format text not null default 'cover' check (cover_format in ('cover', 'post')),
  cover_alt text not null default '',
  instagram_url text,
  description text not null default '',
  discussion text not null default '',
  watched_on date,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.books (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  author text not null,
  status_label text not null,
  reading_stage text not null check (reading_stage in ('read', 'current', 'upcoming')),
  meeting_at timestamptz,
  meeting_label text not null default 'Data a confirmar',
  cover_url text,
  cover_format text not null default 'cover' check (cover_format in ('cover', 'post')),
  cover_alt text not null default '',
  instagram_url text,
  description text not null default '',
  discussion text not null default '',
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger activities_set_updated_at before update on public.activities
for each row execute function private.set_updated_at();
create trigger movies_set_updated_at before update on public.movies
for each row execute function private.set_updated_at();
create trigger books_set_updated_at before update on public.books
for each row execute function private.set_updated_at();
create trigger site_settings_set_updated_at before update on public.site_settings
for each row execute function private.set_updated_at();

create index activities_public_schedule_idx on public.activities (published, status, starts_at, sort_order);
create index movies_public_order_idx on public.movies (published, session_order);
create index books_public_stage_order_idx on public.books (published, reading_stage, sort_order);

alter table public.admin_users enable row level security;
alter table public.activities enable row level security;
alter table public.movies enable row level security;
alter table public.books enable row level security;
alter table public.site_settings enable row level security;

create policy "Admins can read their access record" on public.admin_users
for select to authenticated
using (email = lower(coalesce((select auth.jwt()) ->> 'email', '')));

create policy "Published activities are public" on public.activities
for select to anon, authenticated using (published);
create policy "Admins manage activities" on public.activities
for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

create policy "Published movies are public" on public.movies
for select to anon, authenticated using (published);
create policy "Admins manage movies" on public.movies
for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

create policy "Published books are public" on public.books
for select to anon, authenticated using (published);
create policy "Admins manage books" on public.books
for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

create policy "Site settings are public" on public.site_settings
for select to anon, authenticated using (true);
create policy "Admins manage site settings" on public.site_settings
for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

grant select on public.activities, public.movies, public.books, public.site_settings to anon, authenticated;
grant select on public.admin_users to authenticated;
grant insert, update, delete on public.activities, public.movies, public.books, public.site_settings to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('covers', 'covers', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Cover images are public" on storage.objects
for select to anon, authenticated using (bucket_id = 'covers');
create policy "Admins upload cover images" on storage.objects
for insert to authenticated with check (bucket_id = 'covers' and (select private.is_admin()));
create policy "Admins update cover images" on storage.objects
for update to authenticated using (bucket_id = 'covers' and (select private.is_admin()))
with check (bucket_id = 'covers' and (select private.is_admin()));
create policy "Admins delete cover images" on storage.objects
for delete to authenticated using (bucket_id = 'covers' and (select private.is_admin()));

insert into public.admin_users (email) values ('gustavolucena12@gmail.com');

insert into public.activities
  (slug, category, type_label, title, starts_at, date_text, location_name, location_address, theme, description, detail_url, featured, status, published, sort_order)
values
  ('sociedade-do-anel-2026', 'book_club', 'Clube do Livro', 'O Senhor dos Anéis: A Sociedade do Anel', '2026-08-22 09:00:00-03', null, 'Pan Nossa', 'Av. Maj. Manoel de Freitas, 31', null, 'Encontro para conversar sobre a primeira parte da jornada, a amizade entre os personagens e as escolhas feitas diante do perigo.', '/clube-do-livro', true, 'scheduled', true, 10),
  ('recolhimento-agosto-2026', 'recollection', 'Recolhimento mensal', 'Recolhimento Mensal com Padre Paulo Sérgio', '2026-08-24 19:00:00-03', null, 'Catedral', null, 'Atraídos pelo amor de Deus no nosso cotidiano', 'Tempo de oração, formação e silêncio para renovar a vida interior.', '/#recolhimento', false, 'scheduled', true, 20),
  ('proxima-sessao-cinedebate', 'cinedebate', 'Cinedebate', 'Sessão e conversa sobre cinema', null, 'Nova sessão em breve', 'Espaço Agrestis', null, null, 'Um filme escolhido em comunidade, seguido de conversa sobre personagens, virtudes e escolhas concretas.', '/cinedebate', false, 'scheduled', true, 30);

insert into public.movies
  (slug, session_order, title, release_year, theme, favorite, cover_url, cover_format, cover_alt, instagram_url, description, discussion, published)
values
  ('genio-indomavel', 1, 'Gênio Indomável', 1997, 'Talento e escolhas', false, '/covers/genio-indomavel.jpg', 'post', 'Arte da sessão de Gênio Indomável', 'https://www.instagram.com/p/DNyCuMUWqRy/', 'Um jovem de inteligência extraordinária precisa decidir se continuará protegido por suas defesas ou aceitará ajuda para construir o próprio caminho.', 'Amizade verdadeira, medo de mudar, responsabilidade pelos próprios dons e abertura para receber ajuda.', true),
  ('whiplash', 2, 'Whiplash', 2014, 'Ambição e limites', false, '/covers/whiplash.jpg', 'post', 'Arte da sessão de Whiplash', 'https://www.instagram.com/p/DPd-mobDa4S/', 'A busca obsessiva pela excelência coloca um jovem músico diante dos limites entre disciplina, talento, abuso e sucesso.', 'O preço da excelência, autoridade, obsessão por resultados e o equilíbrio entre vocação e vida pessoal.', true),
  ('felicidade-nao-se-compra', 3, 'Felicidade Não Se Compra', 1946, 'Esperança e comunidade', true, '/covers/felicidade.jpg', 'post', 'Arte da sessão de Felicidade Não Se Compra', 'https://www.instagram.com/p/DRz5IznETiq/', 'Ao atravessar sua noite mais difícil, um homem descobre o valor que sua presença, seus sacrifícios e suas amizades tiveram na vida de toda uma cidade.', 'O valor de uma vida comum, esperança nas crises, serviço aos outros e a riqueza construída pelas amizades.', true),
  ('onde-os-fracos-nao-tem-vez', 4, 'Onde os Fracos Não Têm Vez', 2007, 'Escolhas e consequências', false, '/covers/onde-fracos.jpg', 'post', 'Arte da sessão de Onde os Fracos Não Têm Vez', 'https://www.instagram.com/p/DTfhdKmDeM0/', 'Uma decisão tomada diante de uma fortuna abandonada desencadeia uma perseguição marcada pela violência e pelas consequências do acaso.', 'Responsabilidade moral, ganância, presença do mal e as consequências imprevisíveis de uma escolha.', true),
  ('o-preco-de-um-resgate', 5, 'O Preço de um Resgate', 1996, 'Família e coragem', false, '/covers/preco-resgate.webp', 'post', 'Arte da sessão de O Preço de um Resgate', 'https://www.instagram.com/p/DU0urzPDVdf/', 'O sequestro de uma criança leva seu pai a uma decisão extrema, colocando em tensão prudência, coragem e amor pela família.', 'Decisões sob pressão, limites da negociação, proteção da família e diferença entre coragem e imprudência.', true),
  ('gladiador', 6, 'Gladiador', 2000, 'Honra e dever', false, '/covers/gladiador.jpg', 'post', 'Arte da sessão de Gladiador', 'https://www.instagram.com/p/DXcIa51DU80/', 'Um general traído transforma sua busca por justiça em uma luta por fidelidade, honra e liberdade diante do poder corrompido.', 'Liderança, lealdade, justiça, desejo de vingança e permanência dos valores em situações extremas.', true),
  ('cidadao-kane', 7, 'Cidadão Kane', 1941, 'Poder e vazio', false, '/covers/cidadao-kane.jpg', 'post', 'Arte da sessão de Cidadão Kane', 'https://www.instagram.com/p/DYhpPWatYxI/', 'A vida de um magnata da imprensa é reconstruída a partir de lembranças que revelam suas conquistas, perdas e contradições.', 'Ambição, poder, solidão, memória e aquilo que realmente permanece quando o sucesso exterior termina.', true),
  ('encontraras-dragoes', 8, 'Encontrarás Dragões', 2011, 'Perdão e vocação', false, '/covers/encontraras-dragoes.jpg', 'post', 'Arte da sessão de Encontrarás Dragões', 'https://www.instagram.com/espacoagrestis/p/DaSgI7hxbEq/', 'Duas trajetórias atravessadas pela guerra e por escolhas opostas conduzem a uma reflexão sobre fé, ressentimento, perdão e santidade no cotidiano.', 'Liberdade interior, vocação, reconciliação, fé em tempos difíceis e as pequenas escolhas que formam uma vida.', true),
  ('rocky-balboa', 9, 'Rocky Balboa', 2006, 'Perseverança e recomeço', false, '/covers/rocky-balboa.jpg', 'post', 'Arte da sessão de Rocky Balboa', 'https://www.instagram.com/espacoagrestis/p/DbUPwv2NvJW/', 'Anos depois de deixar os ringues, Rocky encontra uma última oportunidade de enfrentar seus limites e dar sentido ao que ainda carrega por dentro.', 'Maturidade, luto, perseverança, dignidade diante da derrota e coragem para recomeçar.', true);

insert into public.books
  (slug, title, author, status_label, reading_stage, meeting_at, meeting_label, cover_url, cover_format, cover_alt, instagram_url, description, discussion, sort_order, published)
values
  ('o-hobbit', 'O Hobbit', 'J. R. R. Tolkien', 'Já lido', 'read', null, 'Leitura concluída', '/covers/o-hobbit.webp', 'post', 'Capa do livro O Hobbit', 'https://www.instagram.com/espacoagrestis/p/DZwvjmsxLYg/', 'A inesperada jornada de Bilbo Bolseiro para além do conforto do Condado, marcada por amizade, coragem e crescimento.', 'Coragem adquirida no caminho, apego ao conforto, amizade e transformação pessoal diante das dificuldades.', 10, true),
  ('a-sociedade-do-anel', 'O Senhor dos Anéis: A Sociedade do Anel', 'J. R. R. Tolkien', 'Em leitura', 'current', '2026-08-22 09:00:00-03', 'Próximo encontro: 22 de agosto de 2026, às 9h', '/covers/sociedade-do-anel.webp', 'post', 'Capa do livro O Senhor dos Anéis: A Sociedade do Anel', 'https://www.instagram.com/espacoagrestis/p/DawbiSbtQtA/', 'O início da grande jornada para destruir o Anel, reunindo personagens diferentes em torno de uma missão maior do que cada um deles.', 'Amizade, responsabilidade, tentação do poder, esperança e fidelidade à missão mesmo sem conhecer todo o caminho.', 20, true),
  ('as-duas-torres', 'O Senhor dos Anéis: As Duas Torres', 'J. R. R. Tolkien', 'Próxima leitura', 'upcoming', null, 'Data a confirmar', '/covers/as-duas-torres.jpg', 'cover', 'Capa do livro O Senhor dos Anéis: As Duas Torres', null, 'A Sociedade segue dividida, enquanto cada grupo precisa permanecer fiel à missão diante de novos perigos e alianças.', 'Fidelidade na distância, liderança, esperança em cenários adversos e responsabilidade quando os planos mudam.', 30, true),
  ('o-retorno-do-rei', 'O Senhor dos Anéis: O Retorno do Rei', 'J. R. R. Tolkien', 'Próxima leitura', 'upcoming', null, 'Data a confirmar', '/covers/o-retorno-do-rei.jpg', 'cover', 'Capa do livro O Senhor dos Anéis: O Retorno do Rei', null, 'A etapa final da jornada reúne sacrifício, esperança e perseverança quando a missão parece mais difícil de cumprir.', 'Serviço, realeza, sacrifício, amizade perseverante e a força das pequenas ações diante de grandes desafios.', 40, true);

insert into public.site_settings (key, value) values
  ('contact', '{"instagram_url":"https://www.instagram.com/espacoagrestis/","participation_url":"https://docs.google.com/forms/d/e/1FAIpQLSeRJ_FYKKayqfgkFrP_eLBgZi7YRhzSajehfOA8e4BTA36Myg/viewform"}'::jsonb);
