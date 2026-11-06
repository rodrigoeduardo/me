---
name: Rodrigo Eduardo
description: A software engineer's career rendered as a dense, factual player profile page.
colors:
  background: "#e4e8ec"
  surface: "#ffffff"
  surface-head: "#f6f7f9"
  rule: "#dde2e7"
  foreground: "#353535"
  muted: "#5d6974"
  link: "#2d6da3"
  link-fill: "#2d6da3"
  gold: "#dea905"
  on-gold: "#2b2100"
  win: "#267a3d"
  idle: "#8a96a1"
  panel: "#1d2830"
  track: "#e3e8ee"
typography:
  display:
    fontFamily: "Open Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Open Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Open Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "Open Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "tnum"
  body-small:
    fontFamily: "Open Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.33
    fontFeature: "tnum"
  label:
    fontFamily: "Open Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    letterSpacing: "0.06em"
  reading:
    fontFamily: "Open Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.625
rounded:
  none: "0px"
  full: "9999px"
spacing:
  "1": "4px"
  "1.5": "6px"
  "2": "8px"
  "2.5": "10px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
components:
  box:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.none}"
  box-header:
    backgroundColor: "{colors.surface-head}"
    textColor: "{colors.foreground}"
    typography: "{typography.title}"
    padding: "8px 12px"
  button-primary:
    backgroundColor: "{colors.link-fill}"
    textColor: "#ffffff"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.link}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
  button-outline-hover:
    backgroundColor: "{colors.surface-head}"
  badge-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
    typography: "{typography.body-small}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  badge-blue:
    backgroundColor: "{colors.link-fill}"
    textColor: "#ffffff"
    typography: "{typography.body-small}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  count-pill:
    backgroundColor: "{colors.link-fill}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    height: "16px"
    padding: "0 4px"
  tab:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    typography: "{typography.body}"
    height: "44px"
    padding: "0 16px"
  tab-active:
    textColor: "{colors.foreground}"
  icon-button-social:
    backgroundColor: "{colors.panel}"
    textColor: "#ffffff"
    rounded: "{rounded.none}"
    size: "36px"
  icon-button-social-hover:
    backgroundColor: "{colors.link-fill}"
  nav-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    height: "48px"
---

# Design System: Rodrigo Eduardo

## Overview

**Creative North Star: "The Ficha de Jogador"**

The site is a pro player profile page, translated to a developer career: an identity table, team history, achievement badges, stats bars and a ledger of recent "matches" (projects). It is dense and factual. Information sits in white boxes with pale header strips on a gray-blue ground, set in small Open Sans with tabular numerals, the way a stats site reads rather than the way a marketing page sells. The reader skims rows, not hero copy.

Personality lives in the details (the trophy-shelf milestone row, the gold highlight badges, status edges on project rows, a flag on the photo panel), never in effects. Depth is structural: borders, header strips and a dark panel behind imagery; there are no shadows, no glows, no gradients. Light and dark are the same structure: the dark theme swaps the ground and boxes to slate while the filled blue and gold stay constant. The confirmed anti-reference is the generic dark-neon developer portfolio (glow, particles, card grid).

**Key Characteristics:**
- Boxes, not cards: square, 1px ruled, header strip on top, flat.
- Small and dense: 13px body, 15px box titles, 11px uppercase rail headings.
- Tabular numerals everywhere (set on `body`).
- One blue doing two jobs: link text, and filled primary actions and markers.
- Gold marks achievements only.
- Status is a colored edge plus a colored word, never a colored card.

## Colors

A cool, low-chroma gray-blue neutral field with one working blue, one gold for honors, and a green for live status.

### Primary
- **Ledger Blue** (link / link-fill): link text, active-tab underline, stat-bar fill, current-stack squares, the "Dev" role tag, the open-source badge, milestone year pills, the brand monogram, and every filled primary action. In dark mode the text role (`link`) lightens to #6fa8dc for contrast on slate; the fill role (`link-fill`) has no dark override and stays the same blue under white text in both themes.

### Secondary
- **Trophy Gold** (gold, with on-gold ink): the production achievement badge, the selected screenshot ring, and the square bullets of the featured project's facts. Theme-invariant. Text on gold is always the dark on-gold ink, never white.

### Tertiary
- **Live Green** (win; #4caf65 in dark): the live status word, the live status dot, live project row edges, and the availability line.

### Neutral
- **Gray-Blue Ground** (background; #171c21 in dark): the page field and scrollbar track.
- **Box White** (surface; #232a31 in dark): every box, rail list, nav bar and tab strip.
- **Header Strip** (surface-head; #2a323a in dark): box header strips, the hover fill for rows and outlined actions, inline code and blockquote ground.
- **Hairline** (rule; #343d47 in dark): every 1px border and row divider.
- **Ink** (foreground; #e4e8eb in dark): body text and titles.
- **Slate Muted** (muted; #a1abb5 in dark): secondary lines, column headers, rail headings, inactive tabs, dates.
- **Idle Gray** (idle; #7d8994 in dark): archived/shipped row edges, the hollow past-stack square, scrollbar thumb. Borders and markers only, never body text.
- **Night Panel** (panel; #10161b in dark): the photo panel, the screenshot stage, social icon buttons, cover-image placeholders, code blocks and the footer.
- **Bar Track** (track; #333c46 in dark): unfilled stat-bar track and loading skeletons.

### Named Rules
**The Two-Blues Rule.** Blue text uses `link`, which lightens in dark mode; blue fills use `link-fill`, which never changes. Never put white text on `link`.

**The Gold-Is-Earned Rule.** Gold marks an achievement or the current selection of an achievement-adjacent element. It is never a generic accent or a button.

**The Status-Edge Rule.** Project status is a 3px edge on the row plus a colored status word: green live, blue open source, gray shipped/archived. The direction contract named red for a status edge; the build ships blue for open source and no red, and the build is authoritative.

## Typography

**Body Font:** Open Sans (with Helvetica Neue, Arial, sans-serif), loaded via next/font at 400, 600, 700 and 800.

**Character:** One humanist sans at small sizes, carried by weight rather than size: bold for labels and names, semibold for values and secondary actions, regular for prose. Tabular numerals are global so years, periods and counts align down columns.

### Hierarchy
- **Display** (700, 26px mobile / 28px from sm, line-height 1, -0.01em): the profile handle. One per page.
- **Headline** (700, 28px mobile / 32px from sm, line-height 1.25, -0.01em, balanced wrap): the article title on a post page.
- **Title** (700, 15px, line-height 1.25): box header titles and experience company names.
- **Body** (400/600/700, 13px): the working size for rows, tables, lists, tabs, nav and buttons.
- **Body small** (12px): dates, context lines, column headers, badges, header asides.
- **Label** (700, 11px, 0.06em, uppercase, muted): rail section headings and the featured project's stack sub-heading. These are the heading of their list, not a line above another heading.
- **Reading** (400, 15px, line-height 1.625, max 68ch): post body copy.
- **Brand mark** (800, 15px name / 13px monogram): header only.

### Named Rules
**The Weight-Not-Size Rule.** Hierarchy inside a box comes from weight (700 label vs 400 value) and color (ink vs muted), not from new sizes. Stay on the 11 / 12 / 13 / 15 px steps inside boxes.

**The Tabular Rule.** Numerals are tabular everywhere; do not switch to proportional figures for "nicer" prose numbers.

## Layout

The home page is a three-column grid at lg (1024px+): a 190px left rail, a flexible main column (`minmax(0, 1fr)`), and a 210px right rail, inside a 1240px container with 12px side padding (16px from sm) and a 16px column gap. Below lg it collapses to a single column in reading order main, left rail, right rail. Boxes in the main column stack with a 12px gap; the profile box and milestone row join with no gap and a shared border. Tab panels lay out two boxes side by side from md (768px).

Reading pages (posts list, article) use an 860px container with the same side padding.

Inside boxes the rhythm is tight: header strips at 8px x 12px, rows at 6-10px vertical by 10-12px horizontal, each row closed by a 1px rule. The header bar is 48px and sticky; anchor targets use a 64px scroll offset.

**The Rail Rule.** Rails are bare stacks: an 11px uppercase muted heading, then a single ruled list box. No header strip on rail lists.

## Elevation & Depth

Flat. There are no shadows anywhere in the system. Depth and grouping come from three devices only: the 1px hairline border around each box, the pale header strip that caps it, and the Night Panel used behind imagery and in the footer. Hover raises nothing; it fills the row with the header-strip tone or brightens a filled action.

**The No-Lift Rule.** Never add a box-shadow, glow or gradient to separate content. If something needs separation, it gets a rule, a strip, or the panel.

## Shapes

Square. Boxes, buttons, badges, tabs, thumbnails, icon buttons, stat bars and list markers all have 0 radius. The only round shapes are functional dots and counts: the 8px live-status dot and the milestone year count pill (16px tall, fully rounded), both native to the profile-page world. List bullets are 6px squares; legend markers are 10px squares, filled for current and hollow (1px idle border) for past.

## Components

### Buttons
Blunt and functional; color states hierarchy.
- **Shape:** square (0px).
- **Primary (filled):** Ledger Blue fill, white bold 13px text, 8px vertical padding. Reserved for the page's primary actions: Download CV, Open the demo, All repositories. Hover brightens the fill (brightness 110%).
- **Secondary (outlined):** surface ground, link-blue text, 1px hairline border, centered. Used for box-closing actions (Full stack by area, All projects, All posts) and secondary project links (Product site, Source on GitHub). Hover fills with the header-strip tone.
- **Icon buttons:** 32px outlined squares with link-blue icons in tables; 36px Night Panel squares with white icons for social links on the profile, turning Ledger Blue on hover.
- **Toolbar toggles (theme, language):** 36px tall, muted text, no border; hover to ink plus header-strip fill.
- **Focus:** 2px solid link outline, 2px offset, global.

### Chips
- **Highlight badges:** square, 12px semibold, 2px x 8px. Gold with on-gold ink for production achievements; Ledger Blue with white for open source. The "Dev" role tag on the photo is the same blue badge at 11px bold.
- **Count pill:** 16px fully rounded Ledger Blue pill, 10px bold white numerals, pinned to the top-right corner of a milestone cell.

### Cards / Containers
- **Corner Style:** square (0px).
- **Background:** Box White body; Header Strip header.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 1px hairline around the box and under the header strip.
- **Internal Padding:** 8px x 12px header; rows 10px x 12px; prose blocks 16px.

### Navigation
- **Header bar:** sticky, 48px, Box White with a bottom hairline. Monogram square plus name at 800, then 13px nav links in ink at 85% that turn link blue on hover, then theme toggle, language toggle and the filled CV button.
- **Profile tabs:** a full-width ruled strip of 13px bold tabs, 44px tall, muted when inactive, ink when active, with a 3px Ledger Blue underline inset 12px from each side. Tabs switch in place, deep-link through the URL hash, and support arrow, Home and End keys. The posts category filter reuses the pattern.
- **Footer:** Night Panel band, 13px white at 75%, links brighten to white and underline on hover.

### Project Row
A ledger row: bold name and muted context on the left, bold period and colored status word on the right, a 3px status edge on the right side of the row. The same edge carries into the full projects table.

### Stat Bar
Area name bold left, bold year count plus muted unit right, a 6px track below filled with Ledger Blue proportional to the largest value. Bars fill once on load from the left (900ms, cubic-bezier(0.16, 1, 0.3, 1), staggered 70ms per row) and render static under reduced motion.

### Milestone Row
The trophy shelf under the profile: a ruled strip of equal cells (5 columns mobile, 9 from sm), each 68px tall with a 24px outline icon at 1.6 stroke, an 11px semibold short label, and a year count pill. Hover fills the cell with the header strip and turns the icon link blue.

## Do's and Don'ts

### Do:
- **Do** put every content group in a square Box: 1px hairline border, Header Strip title bar at 15px bold.
- **Do** keep body copy at 13px with weight and muted color carrying hierarchy.
- **Do** reserve filled Ledger Blue buttons for primary actions (Download CV, Open the demo, All repositories) and use outlined buttons for everything else.
- **Do** use `link` for blue text and `link-fill` for blue fills so both themes stay legible.
- **Do** mark project status with a 3px row edge plus a colored word: green live, blue open source, gray shipped.
- **Do** use gold only for achievements, with on-gold ink.
- **Do** design every surface in both light and dark, and in both en and pt-BR.
- **Do** honor reduced motion: one-shot fills and color transitions only, with animation removed under `prefers-reduced-motion`.

### Don't:
- **Don't** add shadows, glows, gradients or particle effects; the dark-neon developer portfolio is the anti-reference.
- **Don't** round box, button, badge or tab corners; full rounding is only for status dots and count pills.
- **Don't** put white text on gold or on the text-role `link` blue.
- **Don't** use a filled blue button for a secondary action.
- **Don't** use Idle Gray for running text; it is for edges and markers.
