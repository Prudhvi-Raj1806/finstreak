# Finella Phone Emulator — Reference Design Direction

## Ground-Truth Reference

The supplied Finella screens are the visual and interaction reference for this project. The browser experience must present a believable in-phone emulator, rather than a conventional desktop dashboard. Its interface should retain the reference’s **warm-white canvas, emerald-led financial hierarchy, soft card elevation, compact data density, rounded-but-not-bubbly controls, and reassuring coaching tone**.

## Chosen Approach: Calm Financial Companion

### Design Movement

Contemporary **mobile fintech editorialism**, combining operational clarity with a gentle wellness-app warmth. The composition favors surfaces that feel printed, tactile, and safe over a generic SaaS dashboard.

### Core Principles

1. Let **emerald signal momentum and confidence**, while neutral canvas space makes financial data breathable.
2. Keep every screen dense enough to feel useful, yet carefully grouped into calm, scannable bands.
3. Use rounded rectangles and quiet shadows as organization cues, not decoration.
4. Preserve the feeling of a real mobile OS: safe areas, a tactile bottom bar, compact headers, and reachable actions.

### Color Philosophy

The signature green is not used as a blanket accent. Deep forest is reserved for confidence moments, Fin AI, and active navigation; leaf green measures progress; pale mint conveys assistance; warm parchment and near-black copy keep the experience human rather than clinical. Coral appears only for overspending and missed-consistency signals.

### Layout Paradigm

The complete prototype is staged as a **single physical handset** inside a dark studio environment. The handoff between the marketing-like shell and the app itself occurs at the device bezel; all functional navigation stays inside the phone. Within the phone, content flows as a vertical mobile editorial with frequent, intentional changes in card scale and grouping.

### Signature Elements

- A full-size emerald **Fin AI key** rising through the bottom dock.
- Thin, undulating **wealth-line charts** and segmented score rings.
- Small soft-green **utility tiles** carrying outline icons.

### Interaction Philosophy

Navigation should feel direct and familiar: dock controls replace the active screen without leaving the device, contextual cards open relevant screens, toggle switches change state, and brief toast feedback confirms prototype-only actions. Tap responses use a small scale-down and fast color transition.

### Animation

Screen changes slide horizontally with 220ms cubic-bezier(0.23, 1, 0.32, 1) transitions. Cards fade/raise on entry in a short stagger. Score rings and small progress bars animate only once when a screen appears. All non-essential movement respects reduced-motion settings.

### Typography System

**DM Sans** is used for clean mobile body copy and controls, with **Manrope** for bolder numeric moments and screen titles. Large figures use weight and spacing instead of oversized type; labels are letter-spaced and compact. No generic Inter styling is used.

### Brand Essence

**Finella turns personal-finance maintenance into a calm daily practice for people who want clarity without the spreadsheet stress.**

Personality: **steady, optimistic, practical**.

### Brand Voice

Headlines are concise, encouraging, and evidence-led. CTAs are concrete and verb-forward; microcopy explains what happens next without hype.

> “You’re building momentum.”

> “Reconcile today’s accounts.”

### Wordmark & Logo

A four-spark geometric compass in a deep forest green represents multiple financial signals coming into alignment. The wordmark is text-forward but paired with the distinctive, scalable spark mark; the in-app dock uses the symbol alone.

### Signature Brand Color

**Finella Forest — `#075C2A`**
