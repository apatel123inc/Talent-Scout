create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (auth_user_id, display_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'name', new.email, 'Talent Scout User'),
    new.email
  )
  on conflict (auth_user_id) do update
  set display_name = coalesce(excluded.display_name, public.users.display_name),
      email = coalesce(excluded.email, public.users.email),
      updated_at = now();
  return new;
end;
$$;

revoke all on function public.handle_new_auth_user() from public;
revoke all on function public.handle_new_auth_user() from authenticated;
revoke all on function public.handle_new_auth_user() from anon;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();
