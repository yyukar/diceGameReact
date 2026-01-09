import { useCallback, useEffect, useRef, useState } from "react";

const rand1to6 = () => Math.floor(Math.random() * 6) + 1;

export function useDiceRoller({ durationMs = 3000, tickMs = 100 } = {}) {
    const [status, setStatus] = useState("idle"); // idle | rolling | result
    const [dice, setDice] = useState([1, 1]);

    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    const clearTimers = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        intervalRef.current = null;
        timeoutRef.current = null;
    }, []);

    useEffect(() => {
        return () => clearTimers();
    }, [clearTimers]);

    const roll = useCallback(() => {
        if (status === "rolling") return Promise.resolve(null);

        setStatus("rolling");
        clearTimers();

        intervalRef.current = setInterval(() => {
            setDice([rand1to6(), rand1to6()]);
        }, tickMs);

        return new Promise((resolve) => {
            timeoutRef.current = setTimeout(() => {
                clearTimers();
                const final = [rand1to6(), rand1to6()];
                setDice(final);
                setStatus("result");
                resolve(final);
            }, durationMs);
        });
    }, [status, clearTimers, tickMs, durationMs]);

    const resetToIdle = useCallback(() => {
        clearTimers();
        setStatus("idle");
        setDice([1, 1]);
    }, [clearTimers]);

    // Expose setDice for callers that need manual updates.
    return { status, dice, roll, resetToIdle, setStatus, setDice };
}
