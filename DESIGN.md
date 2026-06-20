---
name: Precision Engineering System
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1c1c'
  surface-container: '#1f2020'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e4e2e1'
  on-surface-variant: '#c5c4db'
  inverse-surface: '#e4e2e1'
  inverse-on-surface: '#303030'
  outline: '#8f8fa4'
  outline-variant: '#454558'
  surface-tint: '#bec2ff'
  primary: '#bec2ff'
  on-primary: '#0001ac'
  primary-container: '#0000ff'
  on-primary-container: '#b3b7ff'
  inverse-primary: '#343dff'
  secondary: '#bfc2ff'
  on-secondary: '#181d8c'
  secondary-container: '#3239a3'
  on-secondary-container: '#a9afff'
  tertiary: '#69d5ee'
  on-tertiary: '#003640'
  tertiary-container: '#005462'
  on-tertiary-container: '#5ecbe4'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e0e0ff'
  primary-fixed-dim: '#bec2ff'
  on-primary-fixed: '#00006e'
  on-primary-fixed-variant: '#0000ef'
  secondary-fixed: '#e0e0ff'
  secondary-fixed-dim: '#bfc2ff'
  on-secondary-fixed: '#00006e'
  on-secondary-fixed-variant: '#3239a3'
  tertiary-fixed: '#aaedff'
  tertiary-fixed-dim: '#69d5ee'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#131313'
  on-background: '#e4e2e1'
  surface-variant: '#353535'
  grid-cyan: rgba(100, 220, 240, 0.7)
  selection-green: rgb(98, 137, 95)
  highlight-blue: rgba(0, 0, 255, 0.5)
  surface-dark: '#333333'
  text-primary: '#FFFFFF'
  text-secondary: rgba(255, 255, 255, 0.7)
typography:
  display-lg:
    fontFamily: Rajdhani
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: 0.02em
  display-md:
    fontFamily: Rajdhani
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  headline-sm:
    fontFamily: Rajdhani
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '500'
    lineHeight: '1.5'
  body-md:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Rajdhani
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Rajdhani
    fontSize: 10px
    fontWeight: '500'
    lineHeight: '1.0'
spacing:
  grid-base: 60px
  sub-grid: 12px
  gutter: 24px
  margin-sm: 8px
  margin-md: 16px
  stroke-thin: 1px
  stroke-heavy: 2px
---

## Brand & Style

This design system is engineered for high-fidelity technical environments, drawing heavily from **Industrial Minimalism** and **CAD-inspired schematics**. The brand personality is rooted in precision, analytical rigor, and technical authority, targeting engineers, architects, and data scientists.

The visual style utilizes a "Glass-Graph" approach:
- **Technical Precision:** High-contrast lines and grid-based alignments.
- **Schematic Layering:** Use of transparency and overlays rather than shadows to establish hierarchy.
- **Functional Minimalism:** Every element serves a structural purpose, avoiding decorative flourishes in favor of information density.
- **Industrial HUD:** The interface should evoke the feeling of a sophisticated Head-Up Display or a modern blueprinting tool.

## Colors

The palette is anchored by a **Deep Navy to Blue gradient**, symbolizing depth and digital precision. 

- **Primary Brand:** A high-energy gradient transitioning from `#000080` (Navy) to `#0000FF` (Pure Blue). This is used for primary actions, active paths, and brand identity.
- **Functional Accents:** Cyan (`#0394AC`) is used for structural scaffolding, grid lines, and background indicators to maintain a technical "blueprint" feel.
- **Color Strategy:** Depth is achieved through **Alpha-channel modulation** rather than hue shifting. 
    - Secondary elements use 50% opacity.
    - Tertiary/Grid elements use 10% - 30% opacity.
- **Dark Mode:** The default state is Dark. Surface backgrounds utilize `#333333`. Interactive selections use a muted green (`#62895F`) to provide a distinct visual break from the monochromatic blue/cyan core.

## Typography

The typography system pairs two distinctive typefaces to balance technical character with readability:

- **Rajdhani (Headlines & Labels):** A squared-off, condensed geometric sans-serif used for all data points, headings, and labels. It evokes engineering precision and digital displays. Use semi-bold or bold weights for maximum impact.
- **Montserrat (Body & Metadata):** A clean, modern sans-serif used for instructional text and paragraphs to ensure legibility across high-density layouts.

**Rules:**
- All labels should use **Rajdhani** with slight letter-spacing (uppercase) to mimic technical drawings.
- Large display text may include a 2px stroke weight to emphasize its structural nature.
- Use `white-space: pre` for data-heavy labels to preserve technical alignment.

## Layout & Spacing

The layout is governed by a strict **60px major grid** and a **12px minor grid**, mimicking CAD software. 

- **Grid Alignment:** All primary UI containers must snap to the 60px increments. Sub-elements and internal padding follow the 12px rhythm.
- **Fluidity:** While the canvas is infinite and fluid, the "Inspector" panels and sidebars are fixed-width (typically 300px) to allow the workspace to remain the focus.
- **Stroke Weights:** Use `1px` for background grids and non-essential borders. Use `2px` for active UI elements and primary paths. Apply `non-scaling-stroke` to ensure these weights remain constant during zoom interactions.
- **Breakpoints:**
    - Desktop: 12-column 60px grid.
    - Tablet: 8-column fluid grid with 24px margins.
    - Mobile: 4-column fluid grid with 16px margins.

## Elevation & Depth

This system rejects traditional ambient shadows in favor of **Tonal Layering** and **Luminance:**

- **Tiers of Depth:**
    - **Base Layer (Level 0):** The `#333333` canvas background.
    - **Grid Layer (Level 1):** Cyan lines at 10-30% opacity.
    - **Container Layer (Level 2):** Semi-transparent surfaces (`rgba(255, 255, 255, 0.05)`) with `1px` solid borders.
    - **Active Layer (Level 3):** High-luminance blue elements or high-opacity cyan headers.
- **Backdrop Blur:** Use subtle backdrop filters (8px-12px) on floating panels to maintain legibility without using heavy shadows.
- **Interaction Feedback:** Instead of "lifting" an element, increase its border stroke weight or the luminosity of its primary color.

## Shapes

The shape language is **Sharp (0px)**. 

To maintain the industrial and technical narrative, all corners must remain at 90 degrees. This reinforces the "engineered" feel and allows for seamless alignment within the 60px grid. 

- **Exceptions:** Icons and specific path joins (`stroke-linejoin: round`) may use rounded connections to soften the vector data, but the containing UI elements (buttons, inputs, cards) must always remain sharp.

## Components

- **Buttons:** Sharp 0px corners. Primary buttons use the Navy-to-Blue gradient. Secondary buttons use a `1px` Cyan stroke with no fill. Text is always uppercase Rajdhani.
- **Input Fields:** Sharp borders. Active state is indicated by a `2px` Blue glow/stroke. Backgrounds should be slightly darker than the surface.
- **Cards/Panels:** Defined by `1px` borders (`rgba(172, 232, 242, 0.2)`). Headers should be separated by a horizontal rule of the same weight.
- **Chips/Labels:** Small, rectangular boxes with `1px` borders. Use `label-sm` typography.
- **Marquee/Selection:** Use a dashed border (`stroke-dasharray: 4`) in `selection-green` with a low-opacity fill (`rgba(234, 255, 231, 0.1)`).
- **Data Lists:** Use alternating row opacities for legibility. Monospaced numbers (font-variant-numeric: tabular-nums) are preferred for technical data.
- **Checkboxes/Radios:** Square (0px roundedness). Selection is indicated by a centered Blue square or X-mark rather than a checkmark for a more technical appearance.