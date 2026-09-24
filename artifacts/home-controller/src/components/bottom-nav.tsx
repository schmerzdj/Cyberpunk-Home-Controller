import { useState } from 'react';
import { Link } from 'wouter';
import {
  Grid2X2,
  Lightbulb,
  PanelTop,
  Camera,
  Settings2,
  MoreHorizontal,
  X,
  CalendarDays,
  Zap,
  Cpu,
  Facebook,
  Youtube,
  Mail,
  type LucideIcon,
} from 'lucide-react';

type NavEntry = { href: string; label: string; icon: LucideIcon };

const primaryNav: NavEntry[] = [
  { href: '/', label: 'Home', icon: Grid2X2 },
  { href: '/lighting', label: 'Light', icon: Lightbulb },
  { href: '/blinds', label: 'Blinds', icon: PanelTop },
  { href: '/cameras', label: 'Cams', icon: Camera },
  { href: '/settings', label: 'System', icon: Settings2 },
];

const secondaryNav: NavEntry[] = [
  { href: '/calendar', label: 'Calendar', icon: CalendarDays },
  { href: '/automations', label: 'Automations', icon: Zap },
  { href: '/devices', label: 'Devices', icon: Cpu },
  { href: '/x', label: 'X', icon: X },
  { href: '/facebook', label: 'Facebook', icon: Facebook },
  { href: '/youtube', label: 'YouTube', icon: Youtube },
  { href: '/gmail', label: 'Gmail', icon: Mail },
];

export function BottomNav({ location }: { location: string }) {
  const [open, setOpen] = useState(false);
  const allItems = [...primaryNav, ...secondaryNav];

  return (
    <>
      <nav className="hc-bottom-nav" aria-label="Primary navigation">
        {primaryNav.map(({ href, label, icon: Icon }) => {
          const active = location === href;
          return (
            <Link
              key={href}
              href={href}
              data-testid={`link-bottom-nav-${label.toLowerCase()}`}
              className={`hc-bottom-nav-item ${active ? 'active' : ''}`}
            >
              <Icon size={18} strokeWidth={active ? 2.2 : 1.6} />
              <span>{label.toUpperCase()}</span>
            </Link>
          );
        })}
        <button
          className={`hc-bottom-nav-item ${open ? 'active' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Show all navigation items"
          data-testid="button-bottom-nav-more"
        >
          <MoreHorizontal size={18} />
          <span>MORE</span>
        </button>
      </nav>

      {open && (
        <div className="hc-bottom-nav-overlay" onClick={() => setOpen(false)}>
          <div className="hc-bottom-nav-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="hc-bottom-nav-sheet-header">
              <span className="tech-label">All surfaces</span>
              <button onClick={() => setOpen(false)} aria-label="Close navigation">
                <X size={16} />
              </button>
            </div>
            <div className="hc-bottom-nav-grid">
              {allItems.map(({ href, label, icon: Icon }) => {
                const active = location === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`hc-bottom-nav-tile ${active ? 'active' : ''}`}
                  >
                    <Icon size={20} strokeWidth={active ? 2.2 : 1.6} />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
