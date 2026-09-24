import { useEffect, useState } from 'react';

export type Person = {
  id: string;
  name: string;
  room: string;
  x: number; // 0–100 relative position within the floor plan
  y: number; // 0–100
  activity: string;
  since: number; // timestamp entered room
};

export type Room = {
  name: string;
  x: number; // center 0–100
  y: number;
  w: number; // half-width %
  h: number; // half-height %
};

const rooms: Room[] = [
  { name: 'Lounge', x: 30, y: 32, w: 24, h: 18 },
  { name: 'Kitchen', x: 72, y: 32, w: 20, h: 18 },
  { name: 'Hall', x: 50, y: 62, w: 14, h: 12 },
  { name: 'Bedroom', x: 26, y: 80, w: 18, h: 12 },
  { name: 'Office', x: 74, y: 80, w: 18, h: 12 },
];

const activities: Record<string, string[]> = {
  Lounge: ['Watching TV', 'Reading', 'Idle'],
  Kitchen: ['Cooking', 'Making coffee', 'Cleaning'],
  Hall: ['Walking through', 'Heading upstairs'],
  Bedroom: ['Resting', 'Getting dressed'],
  Office: ['Working', 'On a call'],
};

const initialPeople: Person[] = [
  { id: 'alex', name: 'Alex', room: 'Lounge', x: 28, y: 30, activity: 'Watching TV', since: Date.now() - 1200000 },
  { id: 'mira', name: 'Mira', room: 'Kitchen', x: 70, y: 34, activity: 'Making coffee', since: Date.now() - 180000 },
  { id: 'sam', name: 'Sam', room: 'Office', x: 76, y: 79, activity: 'Working', since: Date.now() - 5400000 },
];

function pickRoom(exclude?: string): Room {
  const choices = rooms.filter((r) => r.name !== exclude);
  return choices[Math.floor(Math.random() * choices.length)];
}

function randomInRoom(room: Room): { x: number; y: number } {
  return {
    x: room.x + (Math.random() - 0.5) * room.w,
    y: room.y + (Math.random() - 0.5) * room.h,
  };
}

export function usePresence() {
  const [people, setPeople] = useState<Person[]>(initialPeople);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPeople((prev) =>
        prev.map((person) => {
          // 12% chance to move rooms each tick
          if (Math.random() < 0.12) {
            const room = pickRoom(person.room);
            const pos = randomInRoom(room);
            const acts = activities[room.name];
            return {
              ...person,
              room: room.name,
              x: pos.x,
              y: pos.y,
              activity: acts[Math.floor(Math.random() * acts.length)],
              since: Date.now(),
            };
          }
          // small drift within current room
          const room = rooms.find((r) => r.name === person.room) ?? rooms[0];
          const nx = Math.max(room.x - room.w, Math.min(room.x + room.w, person.x + (Math.random() - 0.5) * 4));
          const ny = Math.max(room.y - room.h, Math.min(room.y + room.h, person.y + (Math.random() - 0.5) * 4));
          return { ...person, x: nx, y: ny };
        }),
      );
    }, 3000);
    return () => window.clearInterval(interval);
  }, []);

  return { people, rooms };
}
