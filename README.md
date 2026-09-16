# Keeper Comeback

**Live-App:** https://lottmarkomme.github.io/keeper-comeback/

Eine installierbare, mobile Fitness-PWA für ein persönliches Fitness-Comeback mit Calisthenics, HIIT, Mobility, Regeneration und pflanzenbasierter Ernährung.

## Was die App kann

- fortlaufender, verschiebbarer 8-Tage-Zyklus statt starrer Kalenderwoche
- feste Workout-Videos für jeden Trainingstag und Equipment-Alternative
- Tages-Check mit transparenter grüner, gelber oder roter Empfehlung
- vollständiger 8-Tage-Ernährungsplan mit vorbereitbaren Frühstücken
- Meal Prep, automatische Einkaufsliste, Supplements und Skills-Progression
- lokaler Offline-Modus plus optionale Supabase-Synchronisierung
- HIIT-, Calisthenics-, Mobility- und Ernährungsfortschritt
- installierbare PWA mit iPhone-App-Icon

## Lokal starten

```bash
npm install
cp .env.example .env.local
npm run dev
```

Für die verbundene Instanz werden die Variablen `VITE_SUPABASE_URL` und `VITE_SUPABASE_PUBLISHABLE_KEY` verwendet. Niemals einen Secret- oder Service-Role-Key in den Browser geben.

## Prüfen

```bash
npm test
npm run build
```

## Auf dem iPhone installieren

1. Die veröffentlichte URL in Safari öffnen.
2. Auf **Teilen** tippen.
3. **Zum Home-Bildschirm** auswählen.
4. **Hinzufügen** tippen.

## Supabase

Das Schema liegt unter `supabase/migrations/`. Alle nutzerbezogenen Tabellen haben RLS und Policies mit `auth.uid()`. Der Client verwendet ausschließlich den Publishable Key.

Für Magic-Link-Anmeldung muss die veröffentlichte URL zusätzlich in Supabase unter **Authentication → URL Configuration → Redirect URLs** eingetragen werden.

## Trainingslogik

Der erste Zyklus beginnt am 15.09.2026 mit dem absolvierten HIIT-Benchmark. Nach Tag 8 startet Tag 1 automatisch erneut. Wird eine Einheit verschoben, rückt die Reihenfolge mit, sodass keine Einheit verloren geht und Recovery/Rest erhalten bleiben. Der Tages-Check reduziert bei Bedarf Varianten und Intensität oder empfiehlt transparent Regeneration. Das ist eine vorsichtige Software-Regel und keine Diagnose.

Bei neuem starken Schmerz, Taubheit oder Schwäche, Blasen- oder Darmproblemen, Fieber oder Beschwerden nach einem Unfall soll nicht trainiert, sondern medizinische Hilfe eingeholt werden. Siehe [Mayo Clinic: Back pain – when to seek care](https://www.mayoclinic.org/diseases-conditions/back-pain/symptoms-causes/syc-20369906).
