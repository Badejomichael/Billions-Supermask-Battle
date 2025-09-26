// src/components/DownloadButton.tsx
'use client';
import React from 'react';

export default function DownloadButton({ imageUrl, name }: { imageUrl: string; name: string }) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${name.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md hover:scale-105 transition-transform text-white"
    >
      Download 🖼️
    </button>
  );
}
