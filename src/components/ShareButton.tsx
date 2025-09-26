'use client';
import React from 'react';

export default function ShareButton({ winner }: { winner: string }) {
  const handleShare = () => {
    const location = typeof window !== 'undefined' ? window.location.href : '';

    // ✨ Two strong hype variations with emojis
    const messages = [
      `🔥 The battle of the masks is ON! My pick: 🥷 ${winner}  
Countdown to the Supermask mint begins… ${location}  
Built by @EmperorMikel_ cc @billions_ntwk`,

      
  `👑 Riding with ✨ ${winner} ✨ in the Billions Supermask Battle!  
Mint day is almost here — don’t sleep on it. ${location}  
Built by @EmperorMikel_ cc @billions_ntwk`,

  `⚔️ Voted for ${winner} in the Billions Supermask Battle!  
The ultimate mint is loading… get ready fam 🚀 ${location}  
Built by @EmperorMikel_ cc @billions_ntwk`,
    ];

    // 🎲 Randomly pick one
    const text = messages[Math.floor(Math.random() * messages.length)];
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleShare}
      className="px-5 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-md hover:scale-105 transition-transform text-white"
    >
      Share on X 🚀
    </button>
  );
}
