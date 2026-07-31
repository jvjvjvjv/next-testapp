'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const version = process.env.APP_VERSION || 'dev';
  const buildTime = process.env.BUILD_TIME || 'unknown';
  const gitSha = process.env.GIT_SHA || 'unknown';
  const [now, setNow] = useState<string>('');

  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleTimeString());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Generate a deterministic color from the version string
  const hash = version.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const hue = (hash * 37) % 360;
  const bg = `hsl(${hue}, 70%, 55%)`;

  return (
    <main
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${bg}, hsl(${(hue + 60) % 360}, 70%, 45%))`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          background: 'rgba(0,0,0,0.35)',
          padding: '3rem 4rem',
          borderRadius: '1rem',
          textAlign: 'center',
          backdropFilter: 'blur(8px)',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', margin: 0, opacity: 0.8 }}>
          🚀 Flux Test App
        </h1>
        <div
          style={{
            fontSize: '6rem',
            fontWeight: 'bold',
            margin: '1rem 0',
            fontFamily: 'monospace',
          }}
        >
          v{version}
        </div>
        <div style={{ opacity: 0.85, lineHeight: 1.8 }}>
          <div>🕒 Built: {buildTime}</div>
          <div>🔖 Commit: {gitSha}</div>
          <div>⏰ Now: {now}</div>
        </div>
      </div>
    </main>
  );
}
