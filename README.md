# Dice Game (React + Vite)

A simple dice game where **Player 1 (you)** plays against **Player 2 (PC)**.

---

## Live Demo

You can try the project online here: 
- [Vercel live demo](https://dice-game-react-topaz.vercel.app)

---

## How it works

- Press the main button to roll.
- The dice faces animate (change continuously) for ~3 seconds.
- Final dice values are revealed and the round result is shown:
  - **Win**, **Lose**, or **Draw**
- The button updates based on the current state (rolling, ready, match over).

---

## Match rules

- Each round: both players roll a die (1–6).
- Higher value wins the round, equal values are a draw.
- The match ends when a player reaches **First to N wins**.
- When the match ends, a **Match Summary** is shown and the button becomes **Play Again**.

---

## Difficulty

- **Easy**: PC is fully random.
- **Hard**: If the PC is losing, it may attempt **one reroll** (per round), depending on your current hard-mode logic.

---

## Features

- Player 1 name is editable (saved via `localStorage`).
- Scoreboard tracks **Player1 / PC / Draw**.
- Round history shows the **last 10 rounds**.
- Match Summary appears when the match ends.

---

## Getting Started

### Requirements
- Node.js (LTS recommended)
- npm

### Install & Run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

### Build

```bash
npm run build
npm run preview
```

---

## Tech stack

- React
- Vite
- CSS

---

## Project structure

```
src/
  assets/
    dice/
      dice1.png ... dice6.png
  components/
    PlayerCard.jsx
    Scoreboard.jsx
    History.jsx
    Settings.jsx
    MatchSummary.jsx
  hooks/
    useDiceRoller.js
  App.jsx
  App.css
  main.jsx
```

---

## Thanks

This project was created with the support of **Patika.dev Fullstack Java Developer Bootcamp**.  
Special thanks to the instructors and community contributors.

---

## License

This project is currently **unlicensed**.  
You are free to use, modify, and learn from the code.

