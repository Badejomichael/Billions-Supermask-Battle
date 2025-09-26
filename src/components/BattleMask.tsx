// src/components/BattleMask.tsx
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MaskItem } from '@/lib/masks';

type Props = {
  mask: MaskItem;
  onVote: () => void;
  isLeading?: boolean;
  disabled?: boolean;
};

export default function BattleMask({ mask, onVote, isLeading, disabled }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      className="flex flex-col items-center"
    >
      <motion.div
        onClick={() => !disabled && onVote()}
        whileTap={{ scale: 0.96 }}
        animate={isLeading ? { scale: 1.07, boxShadow: '0 10px 40px rgba(6,182,212,0.25)' } : {}}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className={`rounded-2xl p-3 cursor-pointer select-none ${disabled ? 'opacity-80' : 'hover:shadow-xl' }`}
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
          border: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <Image
          src={mask.src}
          alt={mask.name}
          width={260}
          height={260}
          className="rounded-xl object-contain"
        />
      </motion.div>

      <div className="mt-3 text-center">
        <p className="font-semibold text-white">{mask.name}</p>
      </div>
    </motion.div>
  );
}
