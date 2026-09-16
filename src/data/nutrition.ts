import type { Ingredient, NutritionDay, Recipe, ShoppingCategory, ShoppingItem } from '../types'

const I = (name: string, amount: number, unit: string, category: ShoppingCategory): Ingredient => ({ name, amount, unit, category })
const R = (
  id: string, title: string, meal: Recipe['meal'], kcal: number, protein: number, minutes: number, mealPrep: boolean,
  ingredients: Ingredient[], steps: string[], extras: Partial<Recipe> = {}
): Recipe => ({
  id, title, meal, kcal, protein, minutes, mealPrep, ingredients, steps,
  alternatives: extras.alternatives ?? ['Sojaprodukte lassen sich durch eine vergleichbare pflanzliche Proteinquelle ersetzen.'],
  storage: extras.storage ?? (mealPrep ? 'Gekühlt in einem geschlossenen Behälter 2–3 Tage haltbar.' : 'Am besten frisch essen.'),
  ...extras
})

const oatsSteps = ['Alle Zutaten in einem verschließbaren Glas gründlich vermischen.', 'Über Nacht in den Kühlschrank stellen.', 'Morgens umrühren und direkt kalt essen.']
const bananaPbOats = R('banana-pb-oats', 'Banana Peanut Protein Overnight Oats', 'Frühstück', 790, 45, 7, true,
  [I('Haferflocken',80,'g','carbs'),I('Sojadrink',300,'ml','soy'),I('Soja-Skyr',200,'g','soy'),I('Pflanzliches Proteinpulver',25,'g','protein'),I('Banane',1,'Stk.','produce'),I('Erdnussmus',20,'g','nuts'),I('Zimt',1,'TL','other')],
  ['Banane mit einer Gabel zerdrücken.', 'Haferflocken, Sojadrink, Soja-Skyr und Proteinpulver einrühren.', 'Erdnussmus und Zimt ergänzen.', 'Verschließen, kaltstellen und morgens umrühren.'],
  { overnight:true, prepHint:'Am Abend vollständig vorbereiten; morgens ist kein Kochen nötig.', alternatives:['Erdnussmus durch Mandelmus ersetzen.', 'Banane durch 150 g Beeren ersetzen.'] })

const tofuRice = R('tofu-edamame-rice', 'Tofu-Edamame-Reis-Bowl', 'Mittagessen', 760, 46, 30, true,
  [I('Reis, trocken',90,'g','carbs'),I('Tofu',180,'g','protein'),I('Edamame',100,'g','legumes'),I('Gemüsemix',280,'g','produce'),I('Öl',10,'g','other'),I('Sojasauce',15,'ml','other'),I('Knoblauch',1,'Zehe','produce')],
  ['Reis nach Packungsanweisung kochen.', 'Tofu trocken tupfen, würfeln und in Öl 7–10 Minuten knusprig braten.', 'Gemüse fünf Minuten mitbraten.', 'Edamame ergänzen, würzen und mit Reis servieren.'],
  { prepHint:'Direkt zwei Reisportionen kochen; eine davon kann für den nächsten Bowltag gekühlt werden.' })

const preToast = R('banana-toast', 'Banane & Vollkorntoast', 'Pre-Workout', 330, 9, 3, false,
  [I('Banane',1,'Stk.','produce'),I('Vollkorntoast',2,'Scheiben','carbs'),I('Marmelade',20,'g','other')],
  ['Toast mit wenig Marmelade bestreichen.', 'Mit der Banane 60–90 Minuten vor dem Training essen.'])

const chili = R('chili-sin-carne', 'Chili sin Carne', 'Abendessen', 820, 38, 35, true,
  [I('Kidneybohnen, gekocht',150,'g','legumes'),I('Schwarze Bohnen, gekocht',150,'g','legumes'),I('Reis, trocken',70,'g','carbs'),I('Mais',150,'g','legumes'),I('Gehackte Tomaten',250,'g','produce'),I('Paprika',1,'Stk.','produce'),I('Zwiebel',1,'Stk.','produce'),I('Knoblauch',1,'Zehe','produce')],
  ['Reis kochen.', 'Zwiebel und Paprika schneiden und anbraten.', 'Tomaten, Bohnen und Mais hinzufügen.', 'Mit Kreuzkümmel und Paprikapulver würzen und 15 Minuten köcheln.', 'Mit Reis servieren.'],
  { prepHint:'Zwei Portionen kochen – eine Portion ist für den Rest Day vorgesehen.', storage:'Gekühlt 3 Tage haltbar oder portionsweise einfrieren.' })

const berryChia = R('berry-chia-pudding', 'Berry Chia Protein Overnight Pudding', 'Frühstück', 680, 42, 6, true,
  [I('Haferflocken',50,'g','carbs'),I('Chiasamen',20,'g','nuts'),I('Sojadrink',250,'ml','soy'),I('Sojajoghurt',250,'g','soy'),I('Proteinpulver',20,'g','protein'),I('Beeren',150,'g','produce'),I('Walnüsse',15,'g','nuts')],
  ['Abends alles außer den Walnüssen vermischen.', 'Über Nacht kaltstellen.', 'Walnüsse morgens darübergeben.'],
  { overnight:true, alternatives:['Walnüsse durch Kürbiskerne ersetzen.', 'Tiefgekühlte Beeren direkt abends unterrühren.'] })

const lentilSalad = R('lentil-edamame-salad', 'Linsen-Edamame-Salat', 'Mittagessen', 720, 42, 15, true,
  [I('Linsen, gekocht',250,'g','legumes'),I('Edamame',120,'g','legumes'),I('Gurke',0.5,'Stk.','produce'),I('Tomaten',150,'g','produce'),I('Paprika',1,'Stk.','produce'),I('Rucola',50,'g','produce'),I('Vollkornbrot',2,'Scheiben','carbs'),I('Olivenöl',10,'g','other'),I('Zitrone',0.5,'Stk.','produce'),I('Senf',1,'TL','other')],
  ['Gemüse schneiden.', 'Mit Linsen, Edamame und Rucola vermischen.', 'Dressing aus Öl, Zitrone, Senf und Pfeffer anrühren.', 'Mit Vollkornbrot servieren.'])

const soySnack = R('soy-berry-snack', 'Sojajoghurt mit Beeren & Walnüssen', 'Snack', 380, 23, 3, false,
  [I('Sojajoghurt',300,'g','soy'),I('Beeren',150,'g','produce'),I('Walnüsse',15,'g','nuts')], ['Alles in einer Schale kombinieren.'])

const chickpeaCurry = R('chickpea-spinach-curry', 'Kichererbsen-Spinat-Curry', 'Abendessen', 760, 28, 30, true,
  [I('Kichererbsen, gekocht',200,'g','legumes'),I('Reis, trocken',75,'g','carbs'),I('Gehackte Tomaten',200,'g','produce'),I('Leichte Kokosmilch',100,'ml','other'),I('Spinat',150,'g','produce'),I('Zwiebel',1,'Stk.','produce'),I('Knoblauch',1,'Zehe','produce')],
  ['Reis kochen.', 'Zwiebel und Knoblauch anbraten, Curry kurz mitrösten.', 'Tomaten, Kokosmilch und Kichererbsen 10–15 Minuten köcheln.', 'Spinat zum Schluss unterheben.'])

const chocOats = R('choc-banana-oats', 'Chocolate Banana Overnight Oats', 'Frühstück', 760, 46, 6, true,
  [I('Haferflocken',80,'g','carbs'),I('Sojadrink',300,'ml','soy'),I('Soja-Skyr',200,'g','soy'),I('Schoko-Proteinpulver',25,'g','protein'),I('Banane',1,'Stk.','produce'),I('Backkakao',8,'g','other'),I('Erdnussmus',12,'g','nuts')], oatsSteps,
  { overnight:true, alternatives:['Schoko-Proteinpulver durch neutrales Proteinpulver plus zusätzlichen Kakao ersetzen.'] })

const seitanWraps = R('seitan-wraps', 'Seitan Wraps', 'Mittagessen', 780, 55, 20, true,
  [I('Seitan',180,'g','protein'),I('Vollkornwraps',2,'Stk.','carbs'),I('Hummus',50,'g','legumes'),I('Blattsalat',60,'g','produce'),I('Tomaten',120,'g','produce'),I('Gurke',0.5,'Stk.','produce'),I('Paprika',1,'Stk.','produce')],
  ['Seitan in Streifen schneiden und 5–7 Minuten anbraten.', 'Wraps kurz erwärmen und mit Hummus bestreichen.', 'Gemüse und Seitan einfüllen und fest einrollen.'])

const riceCakePre = R('banana-rice-cakes', 'Banane & Reiswaffeln', 'Pre-Workout', 250, 4, 2, false,
  [I('Banane',1,'Stk.','produce'),I('Reiswaffeln',3,'Stk.','carbs')], ['60–90 Minuten vor dem Training essen und dazu Wasser trinken.'])

const lentilBolo = R('lentil-bolognese', 'Linsen-Bolognese', 'Abendessen', 790, 39, 30, true,
  [I('Vollkornpasta, trocken',100,'g','carbs'),I('Linsen, gekocht',200,'g','legumes'),I('Passierte Tomaten',300,'g','produce'),I('Karotte',1,'Stk.','produce'),I('Zwiebel',1,'Stk.','produce'),I('Knoblauch',1,'Zehe','produce')],
  ['Pasta kochen.', 'Zwiebel, Knoblauch und geraspelte Karotte anbraten.', 'Linsen und Tomaten hinzufügen und 15 Minuten köcheln.', 'Mit Pasta servieren.'],
  { prepHint:'Die Sauce direkt doppelt kochen; sie hält sich 3 Tage gekühlt oder kann eingefroren werden.' })

const applePower = R('apple-power-oats', 'Apple Cinnamon Power Overnight Oats', 'Frühstück', 820, 48, 7, true,
  [I('Haferflocken',90,'g','carbs'),I('Sojadrink',300,'ml','soy'),I('Soja-Skyr',200,'g','soy'),I('Proteinpulver',25,'g','protein'),I('Apfel',1,'Stk.','produce'),I('Mandelmus',15,'g','nuts'),I('Zimt',1,'TL','other'),I('Rosinen',10,'g','produce')], oatsSteps,
  { overnight:true, alternatives:['Rosinen weglassen oder durch gehackte Datteln ersetzen.'] })

const tempehRice = R('tempeh-rice-pan', 'Tempeh-Reis-Pfanne', 'Mittagessen', 830, 45, 30, true,
  [I('Reis, trocken',100,'g','carbs'),I('Tempeh',180,'g','protein'),I('Gemüsemix',300,'g','produce'),I('Öl',10,'g','other'),I('Sojasauce',15,'ml','other')],
  ['Reis kochen.', 'Tempeh schneiden und sieben Minuten in Öl anbraten.', 'Gemüse hinzufügen und 5–7 Minuten weiterbraten.', 'Mit Sojasauce abschmecken und mit Reis kombinieren.'])

const peanutNoodles = R('peanut-tofu-noodles', 'Peanut Tofu Noodles', 'Abendessen', 900, 48, 30, true,
  [I('Nudeln, trocken',100,'g','carbs'),I('Tofu',200,'g','protein'),I('Gemüsemix',250,'g','produce'),I('Erdnussmus',20,'g','nuts'),I('Sojasauce',15,'ml','other'),I('Limette',0.5,'Stk.','produce')],
  ['Tofu knusprig braten und Nudeln kochen.', 'Gemüse anbraten.', 'Erdnussmus, Sojasauce, Limettensaft und etwas Wasser verrühren.', 'Alles kombinieren und kurz erhitzen.'])

const skyrJar = R('skyr-muesli-jar', 'Soja-Skyr-Müsli-Jar', 'Frühstück', 670, 40, 5, true,
  [I('Soja-Skyr',350,'g','soy'),I('Haferflocken',60,'g','carbs'),I('Beeren',150,'g','produce'),I('Chiasamen',15,'g','nuts'),I('Walnüsse',15,'g','nuts'),I('Sojadrink',50,'ml','soy')],
  ['Alle Zutaten abends schichtweise in ein Glas geben.', 'Verschließen und kaltstellen.', 'Morgens direkt essen.'], { overnight:true })

const potatoLentil = R('potato-lentil-bowl', 'Kartoffel-Linsen-Bowl', 'Mittagessen', 760, 34, 40, true,
  [I('Kartoffeln',400,'g','carbs'),I('Linsen, gekocht',250,'g','legumes'),I('Brokkoli',250,'g','produce'),I('Tahini',20,'g','nuts'),I('Zitrone',0.5,'Stk.','produce')],
  ['Kartoffeln würfeln und 30–35 Minuten bei 200 °C backen.', 'Brokkoli garen und Linsen erwärmen.', 'Tahini mit Wasser und Zitronensaft cremig rühren.', 'Alles als Bowl anrichten.'])

const fruitSoy = R('fruit-soy-snack', 'Sojajoghurt & Obst', 'Snack', 300, 18, 3, false,
  [I('Sojajoghurt',300,'g','soy'),I('Obst nach Wahl',1,'Portion','produce')], ['Obst schneiden und mit Sojajoghurt servieren.'])

const tofuSoup = R('tofu-veg-soup', 'Tofu-Gemüse-Suppe', 'Abendessen', 650, 39, 25, true,
  [I('Tofu',200,'g','protein'),I('Gemüsebrühe',500,'ml','other'),I('Karotten',2,'Stk.','produce'),I('Lauch',1,'Stange','produce'),I('Pilze',150,'g','produce'),I('Spinat',100,'g','produce'),I('Vollkornbrot',3,'Scheiben','carbs')],
  ['Gemüse schneiden und etwa zehn Minuten in Brühe garen.', 'Tofu würfeln und weitere fünf Minuten mitkochen.', 'Mit Vollkornbrot servieren.'])

const peanutBerry = R('peanut-berry-oats', 'Peanut Berry Overnight Oats', 'Frühstück', 780, 46, 6, true,
  [I('Haferflocken',80,'g','carbs'),I('Sojadrink',300,'ml','soy'),I('Soja-Skyr',200,'g','soy'),I('Proteinpulver',25,'g','protein'),I('Beeren',150,'g','produce'),I('Erdnussmus',20,'g','nuts')], oatsSteps, { overnight:true })

const burrito = R('burrito-bowl', 'High Protein Burrito Bowl', 'Mittagessen', 850, 52, 30, true,
  [I('Reis, trocken',90,'g','carbs'),I('Schwarze Bohnen, gekocht',150,'g','legumes'),I('Sojagranulat, trocken',60,'g','protein'),I('Mais',100,'g','legumes'),I('Tomaten',150,'g','produce'),I('Paprika',1,'Stk.','produce'),I('Blattsalat',60,'g','produce'),I('Salsa',50,'g','other')],
  ['Sojagranulat einweichen, ausdrücken und mit Paprika und Kreuzkümmel anbraten.', 'Reis kochen.', 'Gemüse schneiden.', 'Alle Komponenten als Bowl anrichten.'])

const tikka = R('tofu-tikka', 'Tofu Tikka Masala', 'Abendessen', 830, 42, 30, true,
  [I('Tofu',200,'g','protein'),I('Reis, trocken',80,'g','carbs'),I('Passierte Tomaten',300,'g','produce'),I('Leichte Kokosmilch',100,'ml','other'),I('Zwiebel',1,'Stk.','produce'),I('Knoblauch',1,'Zehe','produce')],
  ['Tofu anbraten und herausnehmen.', 'Zwiebel, Knoblauch und Tikka-Gewürze anrösten.', 'Tomaten und Kokosmilch zehn Minuten köcheln.', 'Tofu wieder hinzufügen und mit Reis servieren.'])

const carrotCake = R('carrot-cake-oats', 'Carrot Cake Overnight Oats', 'Frühstück', 700, 43, 7, true,
  [I('Haferflocken',70,'g','carbs'),I('Sojadrink',250,'ml','soy'),I('Sojajoghurt',250,'g','soy'),I('Proteinpulver',25,'g','protein'),I('Karotte',100,'g','produce'),I('Walnüsse',15,'g','nuts'),I('Zimt',1,'TL','other'),I('Vanille',1,'Prise','other')], oatsSteps,
  { overnight:true, alternatives:['Walnüsse durch Pekannüsse ersetzen.', 'Optional 10 g Rosinen ergänzen.'] })

const quinoaSalad = R('quinoa-chickpea-salad', 'Quinoa-Kichererbsen-Salat', 'Mittagessen', 770, 30, 25, true,
  [I('Quinoa, trocken',80,'g','carbs'),I('Kichererbsen, gekocht',180,'g','legumes'),I('Gurke',0.5,'Stk.','produce'),I('Tomaten',150,'g','produce'),I('Paprika',1,'Stk.','produce'),I('Petersilie',15,'g','produce'),I('Kürbiskerne',15,'g','nuts'),I('Zitrone',0.5,'Stk.','produce'),I('Olivenöl',10,'g','other')],
  ['Quinoa kochen und abkühlen lassen.', 'Gemüse schneiden.', 'Mit Kichererbsen, Petersilie und Kürbiskernen vermischen.', 'Zitrone und wenig Öl darübergeben.'])

const skyrSnack = R('skyr-berry-nuts', 'Soja-Skyr mit Beeren & Nüssen', 'Snack', 400, 31, 3, false,
  [I('Soja-Skyr',300,'g','soy'),I('Beeren',150,'g','produce'),I('Nüsse',15,'g','nuts')], ['Alles in einer Schale kombinieren.'])

const applePie = R('apple-pie-oats', 'Apple Pie Protein Overnight Oats', 'Frühstück', 760, 45, 7, true,
  [I('Haferflocken',75,'g','carbs'),I('Sojadrink',300,'ml','soy'),I('Soja-Skyr',200,'g','soy'),I('Proteinpulver',25,'g','protein'),I('Apfel',1,'Stk.','produce'),I('Mandelmus',15,'g','nuts'),I('Zimt',1,'TL','other'),I('Vanille',1,'Prise','other')], oatsSteps, { overnight:true })

const couscousBowl = R('couscous-tofu-bowl', 'Mediterrane Couscous-Tofu-Bowl', 'Mittagessen', 820, 43, 25, true,
  [I('Couscous, trocken',90,'g','carbs'),I('Tofu',180,'g','protein'),I('Kichererbsen, gekocht',150,'g','legumes'),I('Gurke',0.5,'Stk.','produce'),I('Tomaten',150,'g','produce'),I('Paprika',1,'Stk.','produce'),I('Zitrone',0.5,'Stk.','produce')],
  ['Couscous mit heißem Wasser übergießen und fünf Minuten ziehen lassen.', 'Tofu knusprig braten.', 'Gemüse schneiden und alles mit Zitronensaft kombinieren.'])

const dal = R('red-lentil-dal', 'Rotes Linsen-Dal', 'Abendessen', 790, 35, 30, true,
  [I('Rote Linsen, trocken',100,'g','legumes'),I('Reis, trocken',70,'g','carbs'),I('Gehackte Tomaten',250,'g','produce'),I('Leichte Kokosmilch',100,'ml','other'),I('Spinat',100,'g','produce'),I('Zwiebel',1,'Stk.','produce'),I('Knoblauch',1,'Zehe','produce')],
  ['Zwiebel und Knoblauch anbraten, Curry und Kreuzkümmel kurz rösten.', 'Linsen, Tomaten und 250 ml Wasser hinzufügen und 15–20 Minuten köcheln.', 'Kokosmilch und Spinat ergänzen.', 'Mit Reis servieren.'],
  { prepHint:'Direkt zwei Portionen kochen; Dal lässt sich sehr gut aufwärmen und einfrieren.' })

export const nutritionDays: NutritionDay[] = [
  { day:1, title:'HIIT', kcalRange:'2.600–2.700 kcal', proteinRange:'135–150 g Protein', meals:[bananaPbOats,tofuRice,preToast,chili] },
  { day:2, title:'Recovery', kcalRange:'2.350–2.450 kcal', proteinRange:'130–150 g Protein', meals:[berryChia,lentilSalad,soySnack,chickpeaCurry] },
  { day:3, title:'Upper Body', kcalRange:'2.500–2.700 kcal', proteinRange:'135–150 g Protein', meals:[chocOats,seitanWraps,riceCakePre,lentilBolo] },
  { day:4, title:'Legs + Core', kcalRange:'2.650–2.750 kcal', proteinRange:'135–150 g Protein', meals:[applePower,tempehRice,preToast,peanutNoodles] },
  { day:5, title:'Recovery', kcalRange:'2.300–2.500 kcal', proteinRange:'130–145 g Protein', meals:[skyrJar,potatoLentil,fruitSoy,tofuSoup] },
  { day:6, title:'Full Body', kcalRange:'2.500–2.700 kcal', proteinRange:'135–150 g Protein', meals:[peanutBerry,burrito,riceCakePre,tikka] },
  { day:7, title:'Rest', kcalRange:'2.300–2.500 kcal', proteinRange:'130–145 g Protein', meals:[carrotCake,quinoaSalad,skyrSnack,chili] },
  { day:8, title:'Mobility + Cardio', kcalRange:'2.300–2.500 kcal', proteinRange:'130–145 g Protein', meals:[applePie,couscousBowl,fruitSoy,dal] }
]

export const allRecipes = Array.from(new Map(nutritionDays.flatMap(day => day.meals).map(recipe => [recipe.id, recipe])).values())

export function nutritionForCycleDay(day: number) {
  return nutritionDays[(day - 1 + 8) % 8]
}

export function breakfastForCycleDay(day: number) {
  return nutritionForCycleDay(day).meals.find(meal => meal.meal === 'Frühstück')!
}

export function aggregateShoppingList(days: number[], checked: Record<string, boolean> = {}): ShoppingItem[] {
  const map = new Map<string, ShoppingItem>()
  days.flatMap(day => nutritionForCycleDay(day).meals).forEach(recipe => recipe.ingredients.forEach(ingredient => {
    const key = `${ingredient.name}|${ingredient.unit}`
    const current = map.get(key)
    if (current) current.amount = Math.round((current.amount + ingredient.amount) * 100) / 100
    else map.set(key, { ...ingredient, id: key, checked: Boolean(checked[key]) })
  }))
  return Array.from(map.values()).sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name))
}
