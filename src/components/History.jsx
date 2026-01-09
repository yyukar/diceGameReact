export default function History({ items }) {
    return (
        <div className="panel">
            <div className="panelTitle">History (last 10 hands)</div>

            {items.length === 0 ? (
                <div className="muted">No hands yet.</div>
            ) : (
                <ul className="historyList">
                    {items.map((it) => (
                        <li key={it.id} className="historyItem">
                            <span className="historyTime">{it.time}</span>
                            <span className="historyRoll">
                                {it.p1} - {it.pc}
                            </span>
                            <span className="historyOutcome">{it.outcomeText}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
