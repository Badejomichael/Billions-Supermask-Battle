'use client';
import { useEffect, useState } from 'react';

const MINT_ISO = '2025-10-06T00:00:00Z';

function formatTime(ms: number) {
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((ms / (1000 * 60)) % 60);
  const secs = Math.floor((ms / 1000) % 60);
  return { days, hours, mins, secs };
}

export default function Countdown() {
  const target = new Date(MINT_ISO).getTime();
  const [time, setTime] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setTime(Math.max(target - Date.now(), 0));
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, [target]);

  if (time === null) {
    return <div className="text-slate-400 text-sm font-mono">Loading…</div>;
  }

  if (time <= 0) {
    return (
      <div className="text-center">
        <h2 className="text-lg sm:text-xl font-bold text-green-400 mb-1">
          🚀 Mint is LIVE!
        </h2>
      </div>
    );
  }

  const { days, hours, mins, secs } = formatTime(time);

  return (
    <div className="text-center">
      <h2 className="text-base sm:text-lg font-semibold text-slate-200 mb-2">
        ⏳ Countdown to Official Mint
      </h2>
      <div className="flex justify-center gap-2 bg-blue-900/40 rounded-lg px-4 py-2">
        {[
          { label: 'D', val: days },
          { label: 'H', val: hours },
          { label: 'M', val: mins },
          { label: 'S', val: secs },
        ].map(({ label, val }) => (
          <div
            key={label}
            className="flex flex-col items-center text-cyan-400 font-mono"
          >
            <span className="text-lg sm:text-2xl font-bold tabular-nums">
              {val.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] text-slate-400">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
