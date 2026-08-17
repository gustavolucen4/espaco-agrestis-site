create or replace function public.get_public_content()
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  select jsonb_build_object(
    'activities', coalesce((
      select jsonb_agg(to_jsonb(activity) order by activity.starts_at nulls last, activity.sort_order)
      from (
        select type_label, title, starts_at, date_text, location_name, city, state,
          theme, description, detail_url, featured, sort_order
        from public.activities
        where published
          and status = 'scheduled'
          and (starts_at is null or starts_at >= now())
      ) activity
    ), '[]'::jsonb),
    'movies', coalesce((
      select jsonb_agg(to_jsonb(movie) order by movie.session_order)
      from (
        select session_order, title, release_year, theme, status_label, favorite,
          cover_url, cover_format, cover_alt, instagram_url, description, discussion
        from public.movies
        where published
      ) movie
    ), '[]'::jsonb),
    'books', coalesce((
      select jsonb_agg(to_jsonb(book) order by book.sort_order)
      from (
        select title, author, status_label, reading_stage, meeting_label, cover_url,
          cover_format, cover_alt, instagram_url, description, discussion, sort_order
        from public.books
        where published
      ) book
    ), '[]'::jsonb)
  );
$$;

revoke all on function public.get_public_content() from public;
grant execute on function public.get_public_content() to anon, authenticated;
