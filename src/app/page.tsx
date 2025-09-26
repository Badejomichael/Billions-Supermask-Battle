// app/page.tsx
'use client';
import Image from 'next/image';
import BattlePoll from '@/components/BattlePoll';
import Countdown from '@/components/CountDown';

export default function Page() {
  return (
    <main className="min-h-screen relative bg-gradient-to-b from-[#001428] to-[#001a33] text-white flex flex-col items-center py-10 px-4">
      {/* soft background glows */}
      <div aria-hidden className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute w-72 h-72 bg-[#053a6b]/30 rounded-full blur-3xl top-8 left-6 animate-pulse" />
        <div className="absolute w-96 h-96 bg-[#00f5ff]/12 rounded-full blur-3xl bottom-8 right-6 animate-pulse" />
      </div>

      <header className="w-full max-w-5xl mx-auto text-center mb-6 px-3">
  <div className="flex justify-center mb-3">
    <Image
      src="/billions-logo.png"
      alt="Billions Network"
      width={100}
      height={100}
      className="object-contain rounded-md border border-slate-700/40 p-2 bg-slate-900/40"
    />
  </div>

  <h1 className="text-3xl sm:text-5xl font-extrabold text-cyan-400 mb-4">
    Supermask Battle ⚔️
  </h1>

  {/* Countdown under heading */}
  <Countdown />
</header>


      <section className="w-full max-w-4xl">
        <BattlePoll />
      </section>

      <footer className="mt-12 text-sm text-slate-300">
        Built by <span className="text-white font-semibold">Emperor Mikel 👑</span>
      </footer>
    </main>
  );
}
