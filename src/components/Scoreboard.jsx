export default function Scoreboard({ score, onReset }) {
    return (
        <div className="panel">
            <div className="panelTitle">Score</div>
            <div className="scoreGrid">
                <div className="scoreItem">
                    <div className="scoreKey">P1</div>
                    <div className="scoreVal">{score.p1}</div>
                </div>
                <div className="scoreItem">
                    <div className="scoreKey">PC</div>
                    <div className="scoreVal">{score.pc}</div>
                </div>
                <div className="scoreItem">
                    <div className="scoreKey">Draw</div>
                    <div className="scoreVal">{score.draw}</div>
                </div>
            </div>

            <button className="btnGhost" onClick={onReset}>
                Reset Score
            </button>
        </div>
    );
}
