create table "public"."channels" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "avatar_url" text,
    "website" text,
    "created_by" uuid not null,
    "members" uuid[] not null,
    "created_at" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone
);


alter table "public"."channels" enable row level security;

CREATE UNIQUE INDEX channels_pkey ON public.channels USING btree (id);

alter table "public"."channels" add constraint "channels_pkey" PRIMARY KEY using index "channels_pkey";

alter table "public"."channels" add constraint "channels_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."channels" validate constraint "channels_created_by_fkey";

grant delete on table "public"."channels" to "anon";

grant insert on table "public"."channels" to "anon";

grant references on table "public"."channels" to "anon";

grant select on table "public"."channels" to "anon";

grant trigger on table "public"."channels" to "anon";

grant truncate on table "public"."channels" to "anon";

grant update on table "public"."channels" to "anon";

grant delete on table "public"."channels" to "authenticated";

grant insert on table "public"."channels" to "authenticated";

grant references on table "public"."channels" to "authenticated";

grant select on table "public"."channels" to "authenticated";

grant trigger on table "public"."channels" to "authenticated";

grant truncate on table "public"."channels" to "authenticated";

grant update on table "public"."channels" to "authenticated";

grant delete on table "public"."channels" to "service_role";

grant insert on table "public"."channels" to "service_role";

grant references on table "public"."channels" to "service_role";

grant select on table "public"."channels" to "service_role";

grant trigger on table "public"."channels" to "service_role";

grant truncate on table "public"."channels" to "service_role";

grant update on table "public"."channels" to "service_role";

create policy "All users can view channels"
on "public"."channels"
as permissive
for select
to public
using (true);


create policy "Users can create their own channels"
on "public"."channels"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = created_by));


create policy "Users can update their own channels"
on "public"."channels"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = created_by));



