import { useEffect, useMemo, useState } from "react";
import "./App.css";

import dice1 from "./assets/dice/dice1.png";
import dice2 from "./assets/dice/dice2.png";
import dice3 from "./assets/dice/dice3.png";
import dice4 from "./assets/dice/dice4.png";
import dice5 from "./assets/dice/dice5.png";
import dice6 from "./assets/dice/dice6.png";

import PlayerCard from "./components/PlayerCard";
import Scoreboard from "./components/Scoreboard";
import History from "./components/History";
import Settings from "./components/Settings";
import MatchSummary from "./components/MatchSummary";
import { useDiceRoller } from "./hooks/useDiceRoller";

const TARGET_WINS = 5;
const rand1to6 = () => Math.floor(Math.random() * 6) + 1;

function nowTime() {
  const d = new Date();
  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function App() {
  const diceImages = useMemo(() => [dice1, dice2, dice3, dice4, dice5, dice6], []);

  // Preload dice images (smooth rolling)
  useEffect(() => {
    diceImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [diceImages]);

  // Player 1 name
  const [name, setName] = useState(() => localStorage.getItem("p1name") || "");
  useEffect(() => localStorage.setItem("p1name", name), [name]);
  const p1Label = name.trim() ? name.trim() : "Player 1";

  // Difficulty
  const [difficulty, setDifficulty] = useState(
    () => localStorage.getItem("difficulty") || "easy"
  );
  useEffect(() => localStorage.setItem("difficulty", difficulty), [difficulty]);

  // Dice roller (3s rolling)
  const { status, dice, roll, resetToIdle, setDice } = useDiceRoller({
    durationMs: 3000,
    tickMs: 100,
  });
  const [d1, d2] = dice;

  // UI text
  const [ui, setUi] = useState({ title: "Draw! 🤝", text: "", last: "" });

  // Score + history
  const [score, setScore] = useState({ p1: 0, pc: 0, draw: 0 });
  const [history, setHistory] = useState([]); // newest first

  // Match meta
  const [matchOver, setMatchOver] = useState(false);
  const [matchSummary, setMatchSummary] = useState(null);
  const [pcRerolls, setPcRerolls] = useState(0);

  const buttonText = matchOver
    ? "Play Again"
    : status === "rolling"
      ? "Rolling..."
      : status === "result"
        ? "Roll Again"
        : "Roll Dice";

  const resetMatch = () => {
    setScore({ p1: 0, pc: 0, draw: 0 });
    setHistory([]);
    setUi({ title: "Draw! 🤝", text: "", last: "" });
    setMatchOver(false);
    setMatchSummary(null);
    setPcRerolls(0);
    resetToIdle();
  };

  const onRoll = async () => {
    if (matchOver) return;
    if (status === "rolling") return;

    setUi({ title: "Rolling... 🎲", text: "", last: "" });

    const final = await roll();
    if (!final) return;

    let [p1, pc] = final;

    // ----------------------------
    // HARD: Smart PC reroll
    // Rule: Only reroll if PC is losing AND Player1 rolled <= 4 (win chance >= 2/6 = 33%)
    // ----------------------------
    let pcRerolled = false;
    let pcBefore = pc;

    const shouldSmartReroll =
      difficulty === "hard" &&
      pc < p1 &&
      p1 <= 4;

    if (shouldSmartReroll) {
      pc = rand1to6();
      pcRerolled = true;
      setPcRerolls((n) => n + 1);
      setDice([p1, pc]); // reflect immediately
    }

    // Decide outcome
    let title = "Draw! 🤝";
    let text = "It's a draw!";
    let outcomeKey = "draw";

    if (p1 > pc) {
      title = "You Win! 🏆";
      text = `${p1Label} wins!`;
      outcomeKey = "p1";
    } else if (pc > p1) {
      title = "You Lose! 😄";
      text = "PC wins!";
      outcomeKey = "pc";
    }

    const rerollNote = pcRerolled ? ` | PC reroll: ${pcBefore}->${pc}` : "";
    const last = `${p1Label}: ${p1} | PC: ${pc}${rerollNote}`;
    setUi({ title, text, last });

    // History (keep 10)
    const outcomeText =
      outcomeKey === "p1" ? "WIN" : outcomeKey === "pc" ? "LOSE" : "DRAW";

    setHistory((h) => {
      const next = [
        {
          id: crypto.randomUUID(),
          time: nowTime(),
          p1,
          pc,
          outcomeText,
          note: pcRerolled ? `PC reroll ${pcBefore}->${pc}` : "",
        },
        ...h,
      ];
      return next.slice(0, 10);
    });

    // Score + Match end check (First to 5)
    setScore((s) => {
      const next = { ...s, [outcomeKey]: s[outcomeKey] + 1 };

      if (!matchOver) {
        const p1WonMatch = next.p1 >= TARGET_WINS;
        const pcWonMatch = next.pc >= TARGET_WINS;

        if (p1WonMatch || pcWonMatch) {
          const winnerKey = p1WonMatch ? "p1" : "pc";
          const winnerLabel = winnerKey === "p1" ? p1Label : "PC";

          setMatchOver(true);

          setMatchSummary({
            winnerKey,
            winnerLabel,
            hands: next.p1 + next.pc + next.draw,
            score: next,
            difficulty,
            pcRerolls: pcRerolls + (pcRerolled ? 1 : 0),
          });

          if (winnerKey === "p1") {
            setUi((prev) => ({
              ...prev,
              title: "Match Won! 🏆",
              text: `${p1Label} won the match! (${TARGET_WINS} wins)`,
            }));
          } else {
            setUi((prev) => ({
              ...prev,
              title: "Match Lost! 😄",
              text: `PC won the match! (${TARGET_WINS} wins)`,
            }));
          }
        }
      }

      return next;
    });
  };

  const onMainButton = () => {
    if (matchOver) resetMatch();
    else onRoll();
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">{ui.title}</h1>

        <div className="grid">
          <PlayerCard
            label={p1Label}
            diceSrc={diceImages[d1 - 1]}
            diceAlt="Player 1 die"
            editableName
            nameValue={name}
            onNameChange={setName}
          />

          <PlayerCard
            label="Player 2 (PC)"
            diceSrc={diceImages[d2 - 1]}
            diceAlt="Player 2 die"
          />
        </div>

        <button className="btn" onClick={onMainButton} disabled={status === "rolling"}>
          {buttonText}
        </button>

        <div className="resultText">{ui.text}</div>
        <div className="muted">{ui.last}</div>

        {matchOver && (
          <MatchSummary summary={matchSummary} onPlayAgain={resetMatch} />
        )}

        <div className="sideBySide">
          <Settings
            targetWins={TARGET_WINS}
            difficulty={difficulty}
            onDifficultyChange={(v) => !matchOver && setDifficulty(v)}
          />

          <div className="stack">
            <Scoreboard score={score} onReset={resetMatch} />

            <History
              items={history.map((x) => ({
                ...x,
                outcomeText: x.note ? `${x.outcomeText}*` : x.outcomeText,
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
