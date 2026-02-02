# Credit System Update

## ⚡ Quick Start - So geht's

### Schritt 1: .new Dateien umbenennen
```bash
cd /pfad/zu/translateshop

# Bestehende Dateien mit neuen ersetzen
mv src/app/dashboard/page.tsx.new src/app/dashboard/page.tsx
mv src/app/api/translate2/route.ts.new src/app/api/translate2/route.ts
mv src/app/api/stripe/webhook/route.ts.new src/app/api/stripe/webhook/route.ts
```

### Schritt 2: Supabase SQL ausführen (falls noch nicht)
Geh zu Supabase Dashboard → SQL Editor → New Query:

```sql
-- user_credits Tabelle
CREATE TABLE IF NOT EXISTS user_credits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT UNIQUE NOT NULL,
  credits INTEGER DEFAULT 50,
  is_unlimited BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- credit_purchases Tabelle (History)
CREATE TABLE IF NOT EXISTS credit_purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  credits_added INTEGER NOT NULL,
  amount_paid INTEGER,
  stripe_session_id TEXT,
  package_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own credits" ON user_credits
  FOR SELECT USING (auth.jwt() ->> 'email' = user_email);

CREATE POLICY "Users can view own purchases" ON credit_purchases
  FOR SELECT USING (auth.jwt() ->> 'email' = user_email);
```

### Schritt 3: Vercel Env Variable hinzufügen
In Vercel Dashboard → Settings → Environment Variables:
```
SUPABASE_SERVICE_KEY = dein-service-role-key-aus-supabase
```
(Brauchst du für Server-seitige Credit-Operationen die RLS bypassen)

### Schritt 4: Commit & Push
```bash
git add -A
git commit -m "feat: credit system"
git push
```

---

## 📁 Neue Dateien (bereits erstellt)

| Datei | Beschreibung |
|-------|--------------|
| `src/lib/credits.ts` | Credit-Funktionen (get, deduct, add, setUnlimited) |
| `src/components/CreditsDisplay.tsx` | UI: Credits-Badge + Kaufen-Modal |
| `src/app/api/credits/route.ts` | API: Credits abrufen |

## 📝 Geänderte Dateien (.new)

| Datei | Änderungen |
|-------|------------|
| `src/app/dashboard/page.tsx.new` | + CreditsDisplay Komponente, + Error handling, + "Alle übersetzen" Button |
| `src/app/api/translate2/route.ts.new` | + Credit-Check vor Übersetzung, + Credit-Abzug nach Erfolg |
| `src/app/api/stripe/webhook/route.ts.new` | Komplett neu: Credits gutschreiben statt Plan ändern |

## 💳 Payment Links

| Paket | Preis | Credits | Link |
|-------|-------|---------|------|
| Starter | CHF 9 | 500 | https://buy.stripe.com/6oU5kFaWJeHJ7CL2Td7Vm01 |
| Pro | CHF 29 | 2'000 | https://buy.stripe.com/cNi6oJaWJ1UX9KT1P97Vm02 |
| Business | CHF 79 | 6'000 | https://buy.stripe.com/aFacN73uhbvx2ir0L57Vm03 |
| Unlimited | CHF 49/Mt | ∞ | https://buy.stripe.com/fZu00l4yl6bd4qzfFZ7Vm04 |

## 🔄 Flow

1. User registriert sich → bekommt automatisch 50 Credits (gratis)
2. User übersetzt → 1 Credit pro Sprache pro Produkt wird abgezogen
3. User kauft Credits → Payment Link → Stripe Webhook → Credits werden gutgeschrieben
4. Unlimited Abo → `is_unlimited = true` → keine Credits werden abgezogen
