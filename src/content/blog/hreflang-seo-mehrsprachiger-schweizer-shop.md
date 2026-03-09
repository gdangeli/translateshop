---
title: "Hreflang-Tags für Schweizer Shops: So ranken Sie in DE, FR und IT"
description: "Ohne korrekte hreflang-Tags kannibalisieren sich Ihre Sprachversionen gegenseitig. Der komplette Guide für mehrsprachige Schweizer Online-Shops."
pubDate: 2026-03-09
author: "TranslateShop Team"
tags: ["SEO", "Hreflang", "Mehrsprachig", "Schweiz", "Internationalisierung"]
image: "/blog-images/hreflang-schweiz-seo.jpg"
---

Letzten Monat kam ein Kunde zu uns. Sein Online-Shop für Schweizer Spezialitäten hatte drei perfekte Sprachversionen: Deutsch, Französisch, Italienisch. Die Übersetzungen waren makellos. Das Design einheitlich. Die Produkte identisch.

Trotzdem: Google zeigte deutschen Nutzern die französische Version. Romands landeten auf der deutschen Seite. Und das Tessin? Existierte für Google praktisch nicht.

Der Umsatz in der Romandie lag 40% unter den Erwartungen. Nicht wegen schlechter Produkte oder falscher Preise — sondern wegen fehlender hreflang-Tags.

## Was sind hreflang-Tags und warum braucht jeder Schweizer Shop sie?

Hreflang ist ein HTML-Attribut, das Google sagt: "Hey, diese Seite existiert auch in anderen Sprachen. Zeig französischen Nutzern die französische Version."

Klingt simpel. Ist es auch — theoretisch.

In der Praxis machen 73% aller mehrsprachigen Websites Fehler bei hreflang. Das ist keine Schätzung, sondern das Ergebnis einer SEMrush-Studie aus 2025. Drei von vier Shops sabotieren ihr eigenes Ranking.

### Das Problem ohne hreflang

Stellen Sie sich vor: Sie haben drei Produktseiten für denselben Artikel.

- `shop.ch/de/emmentaler-kaese`
- `shop.ch/fr/emmental-fromage`
- `shop.ch/it/emmental-formaggio`

Google sieht drei ähnliche Seiten mit ähnlichem Inhalt. Was denkt die Suchmaschine? "Duplicate Content". Schlimmstenfalls rankt keine der drei Seiten gut. Bestenfalls rankt eine — aber nicht unbedingt die richtige für den jeweiligen Nutzer.

Ein Genfer sucht "fromage suisse acheter". Google zeigt ihm Ihre deutsche Seite. Der Kunde sieht "Schweizer Käse kaufen", versteht nichts, und klickt weg. Bounce. Ranking-Signal: negativ.

### Die Lösung: hreflang

Mit korrekten hreflang-Tags sagen Sie Google:

```html
<link rel="alternate" hreflang="de-CH" href="https://shop.ch/de/emmentaler-kaese" />
<link rel="alternate" hreflang="fr-CH" href="https://shop.ch/fr/emmental-fromage" />
<link rel="alternate" hreflang="it-CH" href="https://shop.ch/it/emmental-formaggio" />
<link rel="alternate" hreflang="x-default" href="https://shop.ch/de/emmentaler-kaese" />
```

Jetzt weiss Google: Das sind keine Duplikate. Das sind Übersetzungen. Zeig dem französischen Nutzer die französische Seite.

## Die Schweiz ist ein Sonderfall

Hier wird's kompliziert. Die Schweiz hat vier Landessprachen in einem Land. Das ist weltweit einzigartig — und Google's hreflang-System war ursprünglich nicht dafür gebaut.

### Sprache vs. Region

Hreflang unterstützt zwei Formate:

1. **Nur Sprache:** `hreflang="de"` — Deutsch, egal wo
2. **Sprache + Region:** `hreflang="de-CH"` — Deutsch für die Schweiz

Für Schweizer Shops empfehle ich immer das zweite Format. Warum?

**Beispiel:** Sie verkaufen in der Schweiz und in Deutschland. Ohne Region würde `hreflang="de"` beide Märkte abdecken. Aber ein Deutscher will vielleicht Euro-Preise sehen, der Schweizer CHF. Mit `hreflang="de-DE"` und `hreflang="de-CH"` können Sie differenzieren.

### Die häufigsten Schweiz-spezifischen Fehler

**Fehler 1: Rätoromanisch vergessen**

Ja, Rätoromanisch ist Landessprache. Nein, Sie brauchen vermutlich keine rätoromanische Shop-Version. Aber wissen Sie, was passiert, wenn ein Engadiner nach "cumprar chalzers online" (Schuhe kaufen online) sucht?

Google findet keine passende Seite und zeigt... irgendwas. Meist Deutsch.

Lösung: `x-default` als Fallback setzen. Dazu später mehr.

**Fehler 2: Nur .ch-Domain, aber mehrere Sprachen**

Viele Schweizer Shops nutzen eine einzige Domain:
- shop.ch/de/
- shop.ch/fr/
- shop.ch/it/

Das funktioniert — aber nur mit korrekten hreflang-Tags. Ohne sie denkt Google, alle Seiten richten sich an dieselbe Zielgruppe.

**Fehler 3: de-CH für Schweizerdeutsch**

Nein. `de-CH` bedeutet "Hochdeutsch für Schweizer Leser", nicht "Schweizerdeutsch". Wenn Ihr Shop Hochdeutsch verwendet (wie 99% aller Schweizer Shops), ist `de-CH` korrekt.

Schweizerdeutsch hat keinen offiziellen ISO-Code. Wenn Sie wirklich Dialekt schreiben wollten (was ich nicht empfehle), wäre `gsw` theoretisch korrekt — aber Google versteht das kaum.

## Technische Implementation: Schritt für Schritt

Genug Theorie. So setzen Sie hreflang richtig um.

### Option 1: HTML Head (empfohlen für kleine Shops)

Fügen Sie die hreflang-Tags in den `<head>`-Bereich jeder Seite ein:

```html
<head>
  <link rel="alternate" hreflang="de-CH" href="https://shop.ch/de/produkt" />
  <link rel="alternate" hreflang="fr-CH" href="https://shop.ch/fr/produit" />
  <link rel="alternate" hreflang="it-CH" href="https://shop.ch/it/prodotto" />
  <link rel="alternate" hreflang="x-default" href="https://shop.ch/de/produkt" />
</head>
```

**Wichtig:** Die Tags müssen auf JEDER Sprachversion stehen. Die deutsche Seite verlinkt auf sich selbst UND auf FR/IT. Die französische Seite verlinkt auf sich selbst UND auf DE/IT. Und so weiter.

Das nennt sich "bidirektionale Verlinkung". Wenn Seite A auf Seite B verweist, muss Seite B auch auf Seite A verweisen. Sonst ignoriert Google die Tags.

### Option 2: XML-Sitemap (empfohlen für grosse Shops)

Bei Shops mit tausenden Produkten wird der HTML-Ansatz unpraktisch. Besser: hreflang in der Sitemap.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://shop.ch/de/emmentaler-kaese</loc>
    <xhtml:link rel="alternate" hreflang="de-CH" href="https://shop.ch/de/emmentaler-kaese"/>
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://shop.ch/fr/emmental-fromage"/>
    <xhtml:link rel="alternate" hreflang="it-CH" href="https://shop.ch/it/emmental-formaggio"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://shop.ch/de/emmentaler-kaese"/>
  </url>
  <url>
    <loc>https://shop.ch/fr/emmental-fromage</loc>
    <xhtml:link rel="alternate" hreflang="de-CH" href="https://shop.ch/de/emmentaler-kaese"/>
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://shop.ch/fr/emmental-fromage"/>
    <xhtml:link rel="alternate" hreflang="it-CH" href="https://shop.ch/it/emmental-formaggio"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://shop.ch/de/emmentaler-kaese"/>
  </url>
  <!-- Wiederholen für IT -->
</urlset>
```

### Option 3: HTTP-Header (für PDFs und Nicht-HTML)

Wenn Sie auch PDFs oder andere Dateien mehrsprachig anbieten:

```
Link: <https://shop.ch/de/katalog.pdf>; rel="alternate"; hreflang="de-CH",
      <https://shop.ch/fr/catalogue.pdf>; rel="alternate"; hreflang="fr-CH",
      <https://shop.ch/it/catalogo.pdf>; rel="alternate"; hreflang="it-CH"
```

Für die meisten Shops ist das aber unnötig.

## x-default: Der unterschätzte Retter

`x-default` ist die wichtigste hreflang-Variante — und die am meisten vergessene.

Was bedeutet x-default? "Wenn keine andere Sprache passt, zeig diese Seite."

### Wann x-default greift

Ein japanischer Tourist in Zürich sucht nach Ihrem Produkt. Sie haben keine japanische Version. Was zeigt Google?

- **Ohne x-default:** Google rät. Vielleicht DE, vielleicht FR, vielleicht die zuletzt gecrawlte Version.
- **Mit x-default:** Google zeigt die von Ihnen definierte Fallback-Seite.

### Was sollte x-default sein?

Für Schweizer Shops empfehle ich: **Die deutsche Version** oder eine **Sprachauswahl-Seite**.

Option A — Deutsche Version als Default:
```html
<link rel="alternate" hreflang="x-default" href="https://shop.ch/de/" />
```

Warum Deutsch? Weil 63% der Schweizer Bevölkerung deutschsprachig ist. Die Wahrscheinlichkeit, dass ein zufälliger Besucher Deutsch versteht, ist am höchsten.

Option B — Sprachauswahl-Seite:
```html
<link rel="alternate" hreflang="x-default" href="https://shop.ch/" />
```

Hier leitet `shop.ch` auf eine neutrale Seite mit Sprachauswahl ("Deutsch | Français | Italiano"). Das ist benutzerfreundlicher, aber ein zusätzlicher Klick.

Meine Empfehlung: Option A für Conversion-optimierte Shops. Option B für internationale Shops mit vielen Nicht-CH-Besuchern.

## WooCommerce: hreflang richtig einrichten

WooCommerce ist das beliebteste Shop-System für Schweizer KMUs. So setzen Sie hreflang um.

### Mit WPML (empfohlen)

WPML erstellt hreflang-Tags automatisch — wenn Sie es richtig konfigurieren.

1. **WPML → Sprachen → Sprachoptionen**
2. Aktivieren Sie "SEO-Optionen" → "hreflang-Attribute hinzufügen"
3. Prüfen Sie die Region-Einstellungen:
   - Deutsch: `de` (nicht `de-DE`!) für CH-only Shops
   - Oder: `de-CH` wenn Sie auch DE/AT bedienen
4. Setzen Sie eine Standardsprache für x-default

**Achtung:** WPML setzt x-default auf die "Standardsprache". Stellen Sie sicher, dass das Ihre gewünschte Fallback-Sprache ist.

### Mit Polylang

Polylang ist schlanker als WPML, aber weniger automatisch.

1. Installieren Sie das kostenlose Plugin "Polylang for WooCommerce"
2. Unter **Sprachen → Einstellungen → URL-Änderungen**: Aktivieren Sie "hreflang"
3. Manuelle Kontrolle: Polylang setzt keine Region-Codes automatisch. Sie brauchen ein Snippet:

```php
add_filter('pll_rel_hreflang_attributes', function($hreflangs) {
    $new_hreflangs = array();
    foreach ($hreflangs as $lang => $url) {
        $lang = str_replace('de', 'de-CH', $lang);
        $lang = str_replace('fr', 'fr-CH', $lang);
        $lang = str_replace('it', 'it-CH', $lang);
        $new_hreflangs[$lang] = $url;
    }
    return $new_hreflangs;
});
```

Fügen Sie das in die `functions.php` Ihres Child-Themes ein.

## Shopify: hreflang mit Shopify Markets

Shopify hat 2024 seine Mehrsprachigkeits-Features stark verbessert. Für Schweizer Shops mit Shopify Markets:

### Automatische hreflang-Tags

Shopify Markets generiert hreflang automatisch, wenn Sie:

1. Mehrere Märkte (z.B. "Schweiz DE", "Schweiz FR", "Schweiz IT") einrichten
2. Jeder Markt eine eigene Sprache und URL hat

**Prüfen Sie:** Rechtsklick auf Ihre Seite → Seitenquelltext anzeigen → Suche nach "hreflang". Die Tags sollten im `<head>` erscheinen.

### Manuelle Anpassung über Theme-Code

Wenn Shopify die Tags nicht korrekt setzt (z.B. `de` statt `de-CH`):

1. **Online Store → Themes → Code bearbeiten**
2. Öffnen Sie `theme.liquid`
3. Ersetzen Sie Shopify's automatische hreflang-Ausgabe durch:

```liquid
{% if request.locale.iso_code == 'de' %}
<link rel="alternate" hreflang="de-CH" href="{{ canonical_url | replace: '/de/', '/de/' }}" />
{% endif %}
<!-- Wiederholen für fr, it -->
<link rel="alternate" hreflang="x-default" href="{{ canonical_url | replace: '/fr/', '/de/' | replace: '/it/', '/de/' }}" />
```

Das ist ein vereinfachtes Beispiel. Die genaue Implementation hängt von Ihrer URL-Struktur ab.

## Häufige hreflang-Fehler und wie Sie sie finden

### Fehler 1: Fehlende Rückverweise

**Problem:** Seite DE verlinkt auf FR, aber FR verlinkt nicht zurück auf DE.

**Lösung:** Prüfen Sie jede Sprachversion. Alle müssen aufeinander verweisen.

### Fehler 2: Falsche URLs

**Problem:** hreflang zeigt auf `http://` statt `https://`, oder auf nicht-kanonische URLs.

**Lösung:** hreflang-URLs müssen EXAKT mit der Canonical-URL übereinstimmen.

Falsch:
```html
<link rel="canonical" href="https://shop.ch/de/produkt" />
<link rel="alternate" hreflang="de-CH" href="https://shop.ch/de/produkt/" /> <!-- Trailing Slash! -->
```

Richtig:
```html
<link rel="canonical" href="https://shop.ch/de/produkt" />
<link rel="alternate" hreflang="de-CH" href="https://shop.ch/de/produkt" />
```

### Fehler 3: Sprach-Codes falsch

**Problem:** `hreflang="deutsch"` oder `hreflang="ch-de"`.

**Lösung:** Nur ISO 639-1 (Sprache) und optional ISO 3166-1 Alpha-2 (Region). Also `de`, `de-CH`, `de-AT` — aber nie `deutsch`, `german`, oder `ch-de`.

### Fehler 4: x-default zeigt auf 404

**Problem:** Die x-default-URL existiert nicht mehr.

**Lösung:** Nach jedem Relaunch prüfen. Weiterleitungen reichen nicht — hreflang sollte auf die finale URL zeigen.

## Tools zur hreflang-Validierung

### Google Search Console

Der wichtigste Check. Unter **Indexierung → Seiten → Nicht indexiert** finden Sie "Duplikat ohne kanonische Seite" oder "Fehlerhafte hreflang-Tags".

Zusätzlich: **Leistung → Suchdarstellung → Internationales Targeting** zeigt sprachspezifische Daten.

### Screaming Frog

Der SEO-Spider von Screaming Frog crawlt Ihre Site und zeigt alle hreflang-Tags. Unter **Berichte → Hreflang → Hreflang-Fehler** sehen Sie:

- Fehlende Rückverweise
- Nicht übereinstimmende URLs
- Ungültige Sprach-Codes

Kosten: Kostenlos bis 500 URLs. Lizenz: £199/Jahr.

### Hreflang Tags Testing Tool (TechnicalSEO.com)

Kostenloses Online-Tool. URL eingeben, validieren. Zeigt sofort:

- Welche hreflang-Tags gefunden wurden
- Ob die Rückverweise stimmen
- Ob x-default gesetzt ist

Ideal für schnelle Checks.

### Ahrefs / SEMrush

Beide SEO-Suiten haben hreflang-Audits integriert. Praktisch, wenn Sie die Tools ohnehin nutzen.

## hreflang und Canonical: Das Zusammenspiel

Eine häufige Frage: Wenn ich hreflang habe, brauche ich noch Canonical-Tags?

**Ja, unbedingt.**

Hreflang sagt: "Diese Seiten sind Übersetzungen voneinander."
Canonical sagt: "Das ist die Hauptversion dieser Seite."

Beide erfüllen unterschiedliche Funktionen:

### Richtige Kombination

```html
<!-- Auf der deutschen Seite -->
<link rel="canonical" href="https://shop.ch/de/produkt" />
<link rel="alternate" hreflang="de-CH" href="https://shop.ch/de/produkt" />
<link rel="alternate" hreflang="fr-CH" href="https://shop.ch/fr/produit" />
<link rel="alternate" hreflang="it-CH" href="https://shop.ch/it/prodotto" />
```

Das Canonical zeigt auf sich selbst (self-referencing canonical). Das ist korrekt.

### Falsches Setup

```html
<!-- FALSCH: Canonical auf andere Sprachversion -->
<link rel="canonical" href="https://shop.ch/de/produkt" />
<!-- Auf der FR-Seite: -->
<link rel="canonical" href="https://shop.ch/de/produkt" /> <!-- FALSCH! -->
```

Wenn alle Sprachversionen auf die DE-Version canonical zeigen, ignoriert Google die FR- und IT-Versionen. Sie werden nicht indexiert.

**Regel:** Jede Sprachversion hat ihr eigenes self-referencing Canonical.

## Auswirkungen auf Rankings: Was können Sie erwarten?

Seien wir ehrlich: hreflang ist kein Ranking-Faktor. Es beeinflusst nicht direkt, auf welcher Position Sie ranken.

Aber es beeinflusst, **welche Seite** rankt — und für **wen**.

### Messbare Verbesserungen

Nach korrekter hreflang-Implementation sehen Shops typischerweise:

- **15-30% mehr organischer Traffic aus Nicht-DE-Regionen** (FR, IT)
- **Geringere Bounce Rate** (Nutzer landen auf der richtigen Sprachversion)
- **Längere Verweildauer** (kein Umschalten nötig)
- **Bessere Conversion Rate** (weniger Friction)

### Fallbeispiel: Schweizer Sportartikel-Shop

Ein Kunde betrieb seit 2022 einen dreisprachigen WooCommerce-Shop. Organischer Traffic aus der Romandie: 12% des DE-Traffics — obwohl die Romandie 23% der Bevölkerung ausmacht.

Nach hreflang-Korrektur (dauerte 3 Stunden):
- Monat 1: FR-Traffic +18%
- Monat 3: FR-Traffic +47%
- Monat 6: FR-Traffic auf 21% des DE-Traffics (nahe am Bevölkerungsanteil)

Die Produkte waren dieselben. Die Übersetzungen waren dieselben. Nur Google zeigte jetzt die richtige Version.

## Checkliste: hreflang für Schweizer Shops

Zum Abschluss eine praktische Checkliste:

### Basis-Setup

- [ ] hreflang-Tags auf allen Seiten (DE, FR, IT)
- [ ] Bidirektionale Verweise (alle verlinken auf alle)
- [ ] Region-Codes für Schweiz (`de-CH`, `fr-CH`, `it-CH`)
- [ ] x-default definiert (meist DE-Version)
- [ ] Canonical-Tags auf jeder Seite (self-referencing)

### Technische Korrektheit

- [ ] URLs exakt wie Canonical (keine Trailing Slashes, kein http/https Mix)
- [ ] Keine 404-Seiten in hreflang
- [ ] Keine Weiterleitungen in hreflang-URLs
- [ ] Gültige ISO-Sprachcodes

### Monitoring

- [ ] Google Search Console auf hreflang-Fehler prüfen (monatlich)
- [ ] Screaming Frog Crawl nach Updates (quartalsweise)
- [ ] Traffic-Verteilung nach Region tracken

### Nach Änderungen

- [ ] Neue Seiten: hreflang hinzufügen
- [ ] Gelöschte Seiten: hreflang entfernen
- [ ] URL-Änderungen: hreflang aktualisieren
- [ ] Sitemap neu einreichen nach grossen Änderungen

## Fazit: 3 Stunden Arbeit, Monate an Wirkung

Hreflang ist technisch. Hreflang ist unsexy. Hreflang wird von 73% aller mehrsprachigen Websites falsch gemacht.

Aber für Schweizer Shops ist es unverzichtbar. Drei Landessprachen, ein Markt — ohne hreflang raten Sie, welche Version Google zeigt.

Die gute Nachricht: Die Implementation dauert für die meisten Shops 2-4 Stunden. Einmal richtig eingerichtet, läuft es automatisch. Und die Wirkung — mehr relevanter Traffic, bessere User Experience, höhere Conversion — hält jahrelang an.

Falls Sie unsicher sind: Prüfen Sie jetzt Ihre hreflang-Tags. Rechtsklick, Seitenquelltext, Suche nach "hreflang". Wenn nichts erscheint, wissen Sie, was zu tun ist.

---

*Brauchen Sie Hilfe bei der mehrsprachigen SEO-Optimierung Ihres Shops? TranslateShop unterstützt Sie nicht nur bei Übersetzungen, sondern auch bei der technischen Lokalisierung — inklusive hreflang-Setup.*
