-- Complete recipe catalogue and covering indexes reported by the database advisor.

create index if not exists exercise_progress_user_id_idx on public.exercise_progress(user_id);
create index if not exists recipe_ingredients_recipe_key_idx on public.recipe_ingredients(recipe_key);
create index if not exists training_days_cycle_id_idx on public.training_days(cycle_id);
create index if not exists training_days_video_id_idx on public.training_days(video_id);
create index if not exists workout_feedback_session_id_idx on public.workout_feedback(workout_session_id);

create table public.nutrition_day_recipes (
  day_number smallint not null references public.nutrition_days(day_number) on delete cascade,
  recipe_key text not null references public.recipes(recipe_key) on delete cascade,
  meal_order smallint not null check (meal_order between 1 and 5),
  primary key (day_number, meal_order)
);

alter table public.nutrition_day_recipes enable row level security;
create policy "nutrition_day_recipes_public_read" on public.nutrition_day_recipes for select to anon, authenticated using (true);
grant select on public.nutrition_day_recipes to anon, authenticated;

insert into public.recipes (recipe_key, cycle_day, meal_type, title, kcal, protein, prep_minutes, meal_prep, overnight, prep_hint) values
  ('banana-pb-oats',1,'breakfast','Banana Peanut Protein Overnight Oats',790,45,7,true,true,'Am Vorabend vollständig vorbereiten.'),
  ('tofu-edamame-rice',1,'lunch','Tofu-Edamame-Reis-Bowl',760,46,30,true,false,'Direkt zwei Reisportionen kochen.'),
  ('banana-toast',1,'pre-workout','Banane & Vollkorntoast',330,9,3,false,false,''),
  ('chili-sin-carne',1,'dinner','Chili sin Carne',820,38,35,true,false,'Zwei Portionen kochen – eine für Tag 7.'),
  ('berry-chia-pudding',2,'breakfast','Berry Chia Protein Overnight Pudding',680,42,6,true,true,'Walnüsse morgens ergänzen.'),
  ('lentil-edamame-salad',2,'lunch','Linsen-Edamame-Salat',720,42,15,true,false,''),
  ('soy-berry-snack',2,'snack','Sojajoghurt mit Beeren & Walnüssen',380,23,3,false,false,''),
  ('chickpea-spinach-curry',2,'dinner','Kichererbsen-Spinat-Curry',760,28,30,true,false,''),
  ('choc-banana-oats',3,'breakfast','Chocolate Banana Overnight Oats',760,46,6,true,true,'Am Vorabend mischen und kaltstellen.'),
  ('seitan-wraps',3,'lunch','Seitan Wraps',780,55,20,true,false,''),
  ('banana-rice-cakes',3,'pre-workout','Banane & Reiswaffeln',250,4,2,false,false,''),
  ('lentil-bolognese',3,'dinner','Linsen-Bolognese',790,39,30,true,false,'Sauce direkt doppelt kochen.'),
  ('apple-power-oats',4,'breakfast','Apple Cinnamon Power Overnight Oats',820,48,7,true,true,'Am Vorabend mischen und kaltstellen.'),
  ('tempeh-rice-pan',4,'lunch','Tempeh-Reis-Pfanne',830,45,30,true,false,''),
  ('peanut-tofu-noodles',4,'dinner','Peanut Tofu Noodles',900,48,30,true,false,''),
  ('skyr-muesli-jar',5,'breakfast','Soja-Skyr-Müsli-Jar',670,40,5,true,true,'Abends schichten und kaltstellen.'),
  ('potato-lentil-bowl',5,'lunch','Kartoffel-Linsen-Bowl',760,34,40,true,false,''),
  ('fruit-soy-snack',5,'snack','Sojajoghurt & Obst',300,18,3,false,false,''),
  ('tofu-veg-soup',5,'dinner','Tofu-Gemüse-Suppe',650,39,25,true,false,''),
  ('peanut-berry-oats',6,'breakfast','Peanut Berry Overnight Oats',780,46,6,true,true,'Am Vorabend mischen und kaltstellen.'),
  ('burrito-bowl',6,'lunch','High Protein Burrito Bowl',850,52,30,true,false,''),
  ('tofu-tikka',6,'dinner','Tofu Tikka Masala',830,42,30,true,false,''),
  ('carrot-cake-oats',7,'breakfast','Carrot Cake Overnight Oats',700,43,7,true,true,'Am Vorabend mischen und kaltstellen.'),
  ('quinoa-chickpea-salad',7,'lunch','Quinoa-Kichererbsen-Salat',770,30,25,true,false,''),
  ('skyr-berry-nuts',7,'snack','Soja-Skyr mit Beeren & Nüssen',400,31,3,false,false,''),
  ('apple-pie-oats',8,'breakfast','Apple Pie Protein Overnight Oats',760,45,7,true,true,'Am Vorabend mischen und kaltstellen.'),
  ('couscous-tofu-bowl',8,'lunch','Mediterrane Couscous-Tofu-Bowl',820,43,25,true,false,''),
  ('red-lentil-dal',8,'dinner','Rotes Linsen-Dal',790,35,30,true,false,'Direkt zwei Portionen kochen.')
on conflict (recipe_key) do update set title=excluded.title, kcal=excluded.kcal, protein=excluded.protein, prep_minutes=excluded.prep_minutes, meal_prep=excluded.meal_prep, overnight=excluded.overnight, prep_hint=excluded.prep_hint;

insert into public.nutrition_day_recipes(day_number,recipe_key,meal_order) values
  (1,'banana-pb-oats',1),(1,'tofu-edamame-rice',2),(1,'banana-toast',3),(1,'chili-sin-carne',4),
  (2,'berry-chia-pudding',1),(2,'lentil-edamame-salad',2),(2,'soy-berry-snack',3),(2,'chickpea-spinach-curry',4),
  (3,'choc-banana-oats',1),(3,'seitan-wraps',2),(3,'banana-rice-cakes',3),(3,'lentil-bolognese',4),
  (4,'apple-power-oats',1),(4,'tempeh-rice-pan',2),(4,'banana-toast',3),(4,'peanut-tofu-noodles',4),
  (5,'skyr-muesli-jar',1),(5,'potato-lentil-bowl',2),(5,'fruit-soy-snack',3),(5,'tofu-veg-soup',4),
  (6,'peanut-berry-oats',1),(6,'burrito-bowl',2),(6,'banana-rice-cakes',3),(6,'tofu-tikka',4),
  (7,'carrot-cake-oats',1),(7,'quinoa-chickpea-salad',2),(7,'skyr-berry-nuts',3),(7,'chili-sin-carne',4),
  (8,'apple-pie-oats',1),(8,'couscous-tofu-bowl',2),(8,'fruit-soy-snack',3),(8,'red-lentil-dal',4)
on conflict (day_number,meal_order) do update set recipe_key=excluded.recipe_key;
