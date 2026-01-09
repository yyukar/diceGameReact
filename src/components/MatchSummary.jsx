export default function MatchSummary({ summary, onPlayAgain }) {
    if (!summary) return null;

    return (
        <div className="panel summary">
            <div className="panelTitle">Match Summary</div>

            <div className="summaryGrid">
                <div className="summaryItem">
                    <div className="summaryKey">Winner</div>
                    <div className="summaryVal">{summary.winnerLabel}</div>
                </div>

                <div className="summaryItem">
                    <div className="summaryKey">Hands</div>
                    <div className="summaryVal">{summary.hands}</div>
                </div>

                <div className="summaryItem">
                    <div className="summaryKey">P1 / PC / Draw</div>
                    <div className="summaryVal">
                        {summary.score.p1} / {summary.score.pc} / {summary.score.draw}
                    </div>
                </div>

                <div className="summaryItem">
                    <div className="summaryKey">Difficulty</div>
                    <div className="summaryVal">{summary.difficulty.toUpperCase()}</div>
                </div>

                <div className="summaryItem">
                    <div className="summaryKey">PC Rerolls</div>
                    <div className="summaryVal">{summary.pcRerolls}</div>
                </div>
            </div>

            <button className="btnGhost" onClick={onPlayAgain} type="button">
                Play Again
            </button>
        </div>
    );
}