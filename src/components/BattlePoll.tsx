// src/components/BattlePoll.tsx
'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MASKS } from '@/lib/masks';
import BattleMask from './BattleMask';
import ShareButton from './ShareButton';
import DownloadButton from './DownloadButton';
import Confetti from './Confetti';

function pickPair(count: number, avoidPair?: [number, number]) {
  if (count < 2) return [0, 1];
  let a = Math.floor(Math.random() * count);
  let b = Math.floor(Math.random() * count);
  while (b === a) b = Math.floor(Math.random() * count);
  // avoid repeating exact pair (optionally)
  if (avoidPair && a === avoidPair[0] && b === avoidPair[1]) {
    return pickPair(count, avoidPair);
  }
  return [a, b];
}

export default function BattlePoll() {
  const [pair, setPair] = useState<[number, number]>(() => pickPair(MASKS.length));
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [lastVotedId, setLastVotedId] = useState<string | null>(null);
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  useEffect(() => {
    // initialize vote counters for visible pair
    const ids = [MASKS[pair[0]].id, MASKS[pair[1]].id];
    setVotes((prev) => ({ ...prev, [ids[0]]: prev[ids[0]] || 0, [ids[1]]: prev[ids[1]] || 0 }));
  }, [pair]);

  const total = (idA?: string, idB?: string) => {
    const a = votes[idA || ''] || 0;
    const b = votes[idB || ''] || 0;
    return a + b;
  };

  const handleVote = (maskId: string) => {
    setVotes((p) => ({ ...p, [maskId]: (p[maskId] || 0) + 1 }));
    setLastVotedId(maskId);
    // trigger confetti
    setConfettiTrigger((t) => t + 1);
  };

  const percent = (maskId: string, otherId: string) => {
    const t = total(maskId, otherId);
    if (t === 0) return 0;
    return Math.round(((votes[maskId] || 0) / t) * 100);
  };

  const currentA = MASKS[pair[0]];
  const currentB = MASKS[pair[1]];
  const percentA = percent(currentA.id, currentB.id);
  const percentB = percent(currentB.id, currentA.id);

  const isALeading = percentA >= percentB && total(currentA.id, currentB.id) > 0;
  const isBLeading = percentB > percentA && total(currentA.id, currentB.id) > 0;

  const handleNext = () => {
    const next = pickPair(MASKS.length, pair);
    setPair([next[0], next[1]]);
    setLastVotedId(null);
    // optional: you can keep votes across battles or not. currently votes persist per id
  };

  return (
    <div className="w-full max-w-4xl">
      {/* confetti canvas */}
      {confettiTrigger > 0 && <Confetti trigger={confettiTrigger} />}

      <div className="flex flex-col items-center gap-4">
        <h2 className="text-3xl font-bold text-center">⚔️ Supermask Battle</h2>
        <p className="text-sm text-slate-300">Click to vote — then share your pick on X</p>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
        <div className="flex flex-col items-center">
          <BattleMask
            mask={currentA}
            onVote={() => handleVote(currentA.id)}
            isLeading={isALeading}
            disabled={false}
          />

          <motion.div
            className="w-56 h-3 bg-slate-800 rounded-full mt-3 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: total(currentA.id, currentB.id) > 0 ? 1 : 0.6 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
              style={{ width: `${percentA}%` }}
              animate={{ width: `${percentA}%` }}
              transition={{ type: 'tween', duration: 0.5 }}
            />
          </motion.div>

          <motion.p
            key={votes[currentA.id] || 0}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-2 text-sm text-slate-200"
          >
            {percentA}% • {votes[currentA.id] || 0} votes
          </motion.p>
        </div>

        <div className="flex flex-col items-center">
          <BattleMask
            mask={currentB}
            onVote={() => handleVote(currentB.id)}
            isLeading={isBLeading}
            disabled={false}
          />

          <motion.div
            className="w-56 h-3 bg-slate-800 rounded-full mt-3 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: total(currentA.id, currentB.id) > 0 ? 1 : 0.6 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
              style={{ width: `${percentB}%` }}
              animate={{ width: `${percentB}%` }}
              transition={{ type: 'tween', duration: 0.5 }}
            />
          </motion.div>

          <motion.p
            key={votes[currentB.id] || 0}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-2 text-sm text-slate-200"
          >
            {percentB}% • {votes[currentB.id] || 0} votes
          </motion.p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 justify-center">
  <button
    onClick={handleNext}
    className="px-5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
  >
    New Battle
  </button>

  {lastVotedId && (
    <DownloadButton
      imageUrl={MASKS.find((m) => m.id === lastVotedId)?.src || ''}
      name={MASKS.find((m) => m.id === lastVotedId)?.name || 'supermask'}
    />
  )}

  <ShareButton
    winner={
      lastVotedId ? MASKS.find((m) => m.id === lastVotedId)?.name || '' : 'My Pick'
    }
  />
</div>

    </div>
  );
}
