drop policy "Published activities are public" on public.activities;
drop policy "Admins manage activities" on public.activities;
create policy "Published activities are public" on public.activities
for select to anon using (published);
create policy "Authenticated users read published or admin content" on public.activities
for select to authenticated using (published or (select private.is_admin()));
create policy "Admins insert activities" on public.activities
for insert to authenticated with check ((select private.is_admin()));
create policy "Admins update activities" on public.activities
for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins delete activities" on public.activities
for delete to authenticated using ((select private.is_admin()));

drop policy "Published movies are public" on public.movies;
drop policy "Admins manage movies" on public.movies;
create policy "Published movies are public" on public.movies
for select to anon using (published);
create policy "Authenticated users read published or admin movies" on public.movies
for select to authenticated using (published or (select private.is_admin()));
create policy "Admins insert movies" on public.movies
for insert to authenticated with check ((select private.is_admin()));
create policy "Admins update movies" on public.movies
for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins delete movies" on public.movies
for delete to authenticated using ((select private.is_admin()));

drop policy "Published books are public" on public.books;
drop policy "Admins manage books" on public.books;
create policy "Published books are public" on public.books
for select to anon using (published);
create policy "Authenticated users read published or admin books" on public.books
for select to authenticated using (published or (select private.is_admin()));
create policy "Admins insert books" on public.books
for insert to authenticated with check ((select private.is_admin()));
create policy "Admins update books" on public.books
for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins delete books" on public.books
for delete to authenticated using ((select private.is_admin()));

drop policy "Admins manage site settings" on public.site_settings;
create policy "Admins insert site settings" on public.site_settings
for insert to authenticated with check ((select private.is_admin()));
create policy "Admins update site settings" on public.site_settings
for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins delete site settings" on public.site_settings
for delete to authenticated using ((select private.is_admin()));
