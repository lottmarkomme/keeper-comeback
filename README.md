# Keeper Comeback

**Live-App:** https://lottmarkomme.github.io/keeper-comeback/

Eine installierbare, mobile Fitness-PWA für einen sicheren Wiedereinstieg mit täglicher Anpassung, Torwart-Fokus, Grundlagenausdauer, Kraft und Mobilität. Die ersten Wochen bleiben bewusst bei maximal 45 Minuten.

## Was die App kann

- sieben unterschiedliche Einheiten pro Woche
- Tages-Check für Energie, Schlaf, Muskelkater, Rücken und Nacken
- automatische Reduktion bei schlechter Erholung oder höheren Beschwerden
- aktive Erholung statt Training bei Schmerzangaben ab 7/10
- Torwart-Fußarbeit, Reaktion, Landetechnik und Athletik
- lokaler Offline-Modus plus optionale Supabase-Synchronisierung
- Fortschritt, Trainingsminuten und Wochenübersicht
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

Der Plan steigert Cardio nur nach ausreichender Konstanz und nie über das anfängliche 45-Minuten-Limit. Der Tages-Check kann Umfang und Intensität reduzieren. Ein hoher Schmerzwert schaltet auf aktive Erholung. Das ist eine vorsichtige Software-Regel und keine Diagnose.

Bei neuem starken Schmerz, Taubheit oder Schwäche, Blasen- oder Darmproblemen, Fieber oder Beschwerden nach einem Unfall soll nicht trainiert, sondern medizinische Hilfe eingeholt werden. Siehe [Mayo Clinic: Back pain – when to seek care](https://www.mayoclinic.org/diseases-conditions/back-pain/symptoms-causes/syc-20369906).
