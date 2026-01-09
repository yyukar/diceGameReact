export default function Settings({ targetWins, difficulty, onDifficultyChange }) {
    return (
        <div className="panel">
            <div className="panelTitle">Match Settings</div>

            <div className="settingsRow">
                <div className="settingsItem">
                    <div className="settingsKey">Mode</div>
                    <div className="settingsVal">First to {targetWins}</div>
                </div>

                <div className="settingsItem">
                    <div className="settingsKey">Difficulty</div>

                    <div className="toggleGroup">
                        <button
                            className={`toggleBtn ${difficulty === "easy" ? "active" : ""}`}
                            onClick={() => onDifficultyChange("easy")}
                            type="button"
                        >
                            Easy
                        </button>
                        <button
                            className={`toggleBtn ${difficulty === "hard" ? "active" : ""}`}
                            onClick={() => onDifficultyChange("hard")}
                            type="button"
                        >
                            Hard
                        </button>
                    </div>

                    <div className="hint">
                        Hard: If the PC is losing, it rerolls once.
                    </div>
                </div>
            </div>
        </div>
    );
}
