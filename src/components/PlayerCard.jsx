export default function PlayerCard({
    label,
    diceSrc,
    diceAlt,
    editableName = false,
    nameValue,
    onNameChange,
}) {
    return (
        <div className="player">
            <div className="playerLabel">{label}</div>

            <div className="diceBox">
                <img className="diceImg" src={diceSrc} alt={diceAlt} />
            </div>

            {editableName && (
                <input
                    className="nameInput"
                    value={nameValue}
                    onChange={(e) => onNameChange(e.target.value)}
                    placeholder="Enter your name"
                />
            )}
        </div>
    );
}
