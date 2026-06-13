# Liquid Glass Component Library — Agent Context

## Project overview

- React + Vite + Tailwind CSS v4 + TypeScript project.
- Component library focused on iOS 26-style "Liquid Glass" UI primitives.
- Glass surfaces are driven by CSS custom properties controlled by `LiquidGlassControls`:
  - `--lg-blur`
  - `--lg-transparency`
  - `--lg-reflection`
  - `--lg-fluidity`
- All glass components must respond to those four sliders in real time.

## iOS 26 toggle behavior spec (`LiquidGlassToggle`)

Reference: `record2.mp4` in the repo root.

### Idle / rest state

- The thumb is a **lozenge/stadium** shape: noticeably wider than it is tall, with semicircular ends (`widthRatio ~1.22–1.40`).
- The thumb stays inside the track boundary at rest.
- The thumb should **not** look like a solid white marble. It must read as a translucent glass lens:
  - Use low-opacity white tints driven by `--lg-transparency`.
  - Keep subtle specular highlight and soft inner shadow, but avoid opaque white fills.
  - Border should be faint (`rgba(255,255,255,0.20–0.30)`).
  - The `glass-reflection` layer and `--lg-reflection` slider should be the primary highlight source.

### Non-idle state (pressed or mid-transition)

- The thumb **expands** into a wider, taller **stadium/lozenge** shape that breaks the track boundary both horizontally and vertically.
- Do **not** squash the thumb vertically into an ellipse.
- Targets (relative to idle lozenge width):
  - `ios26` / `fluid` pressed: width `1.65×`, `scaleY 1.18`; moving: width `1.45×`, `scaleY 1.12`
  - `default` pressed: width `1.32×`, `scaleY 1.08`; moving: width `1.18×`, `scaleY 1.04`
- The press and the state-change animation should be one continuous motion with no gap.
- Return to idle exactly when the animation completes (`onAnimationComplete`), not after a fixed timeout delay.
- All shape/slide springs use the same very snappy spring (`mass 0.45`, high stiffness) so the thumb returns to idle immediately when the state change finishes.

### Fluidity / motion

- Higher `--lg-fluidity` = looser, wobblier spring.
- Lower `--lg-fluidity` = snappier, stiffer spring.
- Avoid the whole track shrinking on press; only the thumb should morph.
- The press/stretch transition should feel continuous and liquid, not abrupt.
- The active track tint should stay subtle so the translucent thumb reads as glass rather than a colored marble.

### Variants

- `default`: classic iOS toggle with blue active track and white thumb.
- `ios26`: slender track, system-green active tint, glass thumb with the stretch behavior above.
- `fluid`: larger liquid-filled switch; same thumb behavior as `ios26` but bigger.

### Implementation notes

- The thumb is rendered as a sibling to the track (not inside it) so it can `overflow-visible` and break the track edges during stretch.
- Thumb position is controlled via `left` + `x` transform; stretch via `scaleX`/`scaleY` with `transform-origin: center center`.
- `isPressed` and `isMoving` should be handled separately for more dynamic squash/stretch.
- Track height should remain slender to match iOS 26.

## Build verification

After any change run:

```bash
pnpm run build
pnpm exec tsc --noEmit
```

Both must pass.
