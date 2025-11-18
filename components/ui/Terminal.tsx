'use client';

import { useState, useEffect } from 'react';

const commands = [
  { cmd: '$ initializing_neon_flux...', delay: 0 },
  { cmd: '> Loading cyberpunk assets...', delay: 800 },
  { cmd: '> Compiling shaders... [OK]', delay: 1600 },
  { cmd: '> Establishing neural link... [OK]', delay: 2400 },
  { cmd: '> System ready. Welcome to the future.', delay: 3200 },
];

export default function Terminal() {
  const [visibleCommands, setVisibleCommands] = useState<number>(0);

  useEffect(() => {
    if (visibleCommands < commands.length) {
      const timer = setTimeout(() => {
        setVisibleCommands((prev) => prev + 1);
      }, commands[visibleCommands].delay);

      return () => clearTimeout(timer);
    }
  }, [visibleCommands]);

  return (
    <div className="glass rounded-lg p-6 font-space-mono text-sm">
      {/* Terminal header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neon-cyan/20">
        <div className="w-3 h-3 rounded-full bg-neon-pink" />
        <div className="w-3 h-3 rounded-full bg-neon-yellow" />
        <div className="w-3 h-3 rounded-full bg-neon-cyan" />
        <span className="ml-2 text-neon-cyan/60">terminal.jsx</span>
      </div>

      {/* Terminal content */}
      <div className="space-y-2">
        {commands.slice(0, visibleCommands).map((item, index) => (
          <div
            key={index}
            className="text-neon-cyan animate-pulse"
            style={{ animationDuration: '1s' }}
          >
            {item.cmd}
          </div>
        ))}
        {visibleCommands === commands.length && (
          <div className="flex items-center gap-2 mt-4">
            <span className="text-neon-pink">$</span>
            <span className="text-neon-cyan animate-pulse">_</span>
          </div>
        )}
      </div>
    </div>
  );
}
