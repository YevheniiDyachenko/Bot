# Web Tamagotchi

Tamagotchi-style browser game built with **PixiJS v8 + TypeScript + Vite**.

## Features

- Client-side only gameplay
- Pet stats: hunger, energy, happiness, health, age
- Real-time decay/game loop
- Actions: Feed, Play, Sleep, Heal, Status
- Procedural Pixi rendering (no binary asset dependency)
- Save/load with `localStorage`
- Offline aging via `lastUpdate`
- Optional mechanics:
  - Evolution (`egg -> baby -> adult`)
  - Inventory (`food`, `toys`, `medicine`)
  - Mini-game (`catch food`) with clickable target and rewards
- GitHub Pages deployment workflow

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Build output is generated in `dist/`.
