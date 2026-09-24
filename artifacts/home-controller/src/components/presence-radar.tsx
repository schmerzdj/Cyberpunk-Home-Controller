import { useEffect, useRef, useState } from 'react';
import { usePresence, type Room } from '@/hooks/use-presence';

const ACCENT = '#c5ff32';
const CYAN = '#53ddc0';

export function PresenceRadar() {
  const { people, rooms } = usePresence();
  const [sweepAngle, setSweepAngle] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setSweepAngle((a) => (a + dt * 55) % 360);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="panel panel-cut relative overflow-hidden p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="tech-label">Presence radar / occupancy map</div>
        <div className="flex items-center gap-2 font-mono text-[9px] text-[#c5ff32]">
          <span className="status-dot" />
          {people.length} DETECTED
        </div>
      </div>

      <div className="relative mt-4 aspect-square w-full max-w-[360px] mx-auto">
        {/* Grid rings */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="radarBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(197,255,50,0.04)" />
              <stop offset="100%" stopColor="rgba(13,17,22,0)" />
            </radialGradient>
            <linearGradient id="sweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(197,255,50,0)" />
              <stop offset="80%" stopColor="rgba(197,255,50,0.18)" />
              <stop offset="100%" stopColor="rgba(197,255,50,0.35)" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="100" height="100" fill="url(#radarBg)" />

          {/* Concentric rings */}
          {[20, 35, 50].map((r) => (
            <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#2a3a42" strokeWidth="0.3" strokeDasharray="1 2" />
          ))}
          {/* Cross hairs */}
          <line x1="0" y1="50" x2="100" y2="50" stroke="#2a3a42" strokeWidth="0.25" strokeDasharray="1 1.5" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="#2a3a42" strokeWidth="0.25" strokeDasharray="1 1.5" />

          {/* Room zones */}
          {rooms.map((room) => (
            <RoomZone key={room.name} room={room} people={people.filter((p) => p.room === room.name).length} />
          ))}

          {/* Sweep */}
          <g transform={`rotate(${sweepAngle} 50 50)`}>
            <path d="M50 50 L50 0 A50 50 0 0 1 100 50 Z" fill="url(#sweepGrad)" opacity="0.6" />
            <line x1="50" y1="50" x2="50" y2="0" stroke={ACCENT} strokeWidth="0.4" opacity="0.7" />
          </g>

          {/* People blips */}
          {people.map((person) => (
            <g key={person.id}>
              <circle cx={person.x} cy={person.y} r="3.5" fill={ACCENT} opacity="0.2">
                <animate attributeName="r" values="3.5;7;3.5" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.35;0;0.35" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx={person.x} cy={person.y} r="1.8" fill={ACCENT} stroke={ACCENT} strokeWidth="0.5">
                <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </g>
          ))}
        </svg>

        {/* Room labels (HTML for crisp text) */}
        {rooms.map((room) => (
          <div
            key={room.name}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 font-mono text-[7px] tracking-wider text-[#5d6b73]"
            style={{ left: `${room.x}%`, top: `${room.y - room.h - 3}%` }}
          >
            {room.name.toUpperCase()}
          </div>
        ))}

        {/* People labels */}
        {people.map((person) => (
          <div
            key={person.id}
            className="pointer-events-none absolute -translate-x-1/2 font-mono text-[7px] text-[#c5ff32]"
            style={{ left: `${person.x}%`, top: `${person.y + 4}%` }}
          >
            {person.name.toUpperCase()}
          </div>
        ))}
      </div>

      {/* Person list */}
      <div className="mt-5 space-y-2">
        {people.map((person) => {
          const mins = Math.max(0, Math.round((Date.now() - person.since) / 60000));
          return (
            <div key={person.id} className="flex items-center gap-3 border border-[#29343d] bg-[#111920] p-2.5">
              <div className="grid h-7 w-7 place-items-center border border-[#3a4a42] text-[#c5ff32]">
                <span className="text-[10px] font-mono">{person.name[0]}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs text-[#d4ded8]">{person.name}</div>
                <div className="font-mono text-[8px] text-[#6e7b84]">{person.room.toUpperCase()} · {person.activity}</div>
              </div>
              <div className="font-mono text-[8px] text-[#5d6b73]">
                {mins === 0 ? 'JUST NOW' : `${mins}M AGO`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RoomZone({ room, people }: { room: Room; people: number }) {
  const occupied = people > 0;
  return (
    <rect
      x={room.x - room.w}
      y={room.y - room.h}
      width={room.w * 2}
      height={room.h * 2}
      fill={occupied ? 'rgba(197,255,50,0.05)' : 'transparent'}
      stroke={occupied ? '#4a6428' : '#2a3a42'}
      strokeWidth="0.3"
      strokeDasharray="1.5 1"
      rx="1"
    />
  );
}
