import { type DragEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  Activity,
  ArrowRight,
  Bell,
  Cloud,
  Facebook,
  CalendarDays,
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleDot,
  CloudRain,
  Cpu,
  Download,
  DoorOpen,
  Eye,
  Fan,
  Gauge,
  GripVertical,
  Grid2X2,
  Home,
  LampCeiling,
  Lightbulb,
  ListChecks,
  LockKeyhole,
  Menu,
  Mail,
  Monitor,
  Moon,
  MoreHorizontal,
  PanelTop,
  Palette,
  Play,
  Plus,
  Power,
  Radio,
  RefreshCw,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Thermometer,
  Timer,
  Trash2,
  Tv,
  Volume2,
  Wind,
  X,
  Youtube,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { BottomNav } from '@/components/bottom-nav';
import { SocialPage as EnhancedSocialPage } from '@/components/social-page';
import { useLiveSensors } from '@/hooks/use-live-sensors';
import { Sparkline } from '@/components/sparkline';
import { PresenceRadar } from '@/components/presence-radar';

const queryClient = new QueryClient();

type NavItem = { href: string; label: string; icon: LucideIcon; code: string };

const navItems: NavItem[] = [
  { href: '/', label: 'Overview', icon: Grid2X2, code: '00' },
  { href: '/lighting', label: 'Lighting', icon: Lightbulb, code: '01' },
  { href: '/blinds', label: 'Blinds', icon: PanelTop, code: '02' },
  { href: '/calendar', label: 'Calendar', icon: CalendarDays, code: '03' },
  { href: '/cameras', label: 'Cameras', icon: Camera, code: '04' },
  { href: '/automations', label: 'Automations', icon: Zap, code: '05' },
  { href: '/devices', label: 'Devices', icon: Cpu, code: '06' },
  { href: '/settings', label: 'Settings', icon: Settings2, code: '07' },
  { href: '/x', label: 'X', icon: X, code: '08' },
  { href: '/facebook', label: 'Facebook', icon: Facebook, code: '09' },
  { href: '/youtube', label: 'YouTube', icon: Youtube, code: '10' },
  { href: '/gmail', label: 'Gmail', icon: Mail, code: '11' },
];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <RoutedErrorBoundary>
            <Router />
          </RoutedErrorBoundary>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  const [location] = useLocation();
  const [toastMessage, setToastMessage] = useState('SYSTEM READY · LOCAL CONTROL ACTIVE');
  const notify = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage('SYSTEM READY · LOCAL CONTROL ACTIVE'), 2800);
  };

  return (
    <div className="hc-shell">
      <BottomNav location={location} />
      <div className="grid min-h-[100dvh] md:grid-cols-[236px_1fr]">
        <Sidebar location={location} />
        <main className="hc-main">
          <TopBar location={location} notify={notify} />
          <div className="hc-content mx-auto w-full px-4 pb-20 pt-5 sm:px-6 lg:px-10">
            <Switch>
              <Route path="/" component={() => <Dashboard notify={notify} />} />
              <Route path="/lighting" component={() => <Lighting notify={notify} />} />
              <Route path="/blinds" component={() => <Blinds notify={notify} />} />
              <Route path="/calendar" component={() => <Calendar notify={notify} />} />
              <Route path="/cameras" component={() => <Cameras notify={notify} />} />
              <Route path="/automations" component={() => <Automations notify={notify} />} />
              <Route path="/devices" component={() => <Devices notify={notify} />} />
              <Route path="/settings" component={() => <Settings notify={notify} />} />
              <Route path="/x" component={() => <EnhancedSocialPage platform="X" icon={X} notify={notify} />} />
              <Route path="/facebook" component={() => <EnhancedSocialPage platform="Facebook" icon={Facebook} notify={notify} />} />
              <Route path="/youtube" component={() => <EnhancedSocialPage platform="YouTube" icon={Youtube} notify={notify} />} />
              <Route path="/gmail" component={() => <EnhancedSocialPage platform="Gmail" icon={Mail} notify={notify} />} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <div className="hc-status-feedback pointer-events-none fixed bottom-4 left-1/2 z-30 -translate-x-1/2">
            <div data-testid="status-feedback" className="flex items-center gap-2 border border-[#38464f] bg-[#111920]/95 px-3 py-2 font-mono text-[10px] tracking-[.1em] text-[#a8b5bc] shadow-2xl">
              <span className="status-dot" />
              {toastMessage}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Sidebar({ location }: { location: string }) {
  return (
    <aside className="hc-sidebar z-20 flex flex-col">
      <div className="flex items-center justify-between px-5 py-5 md:block md:px-6 md:py-7">
        <Link href="/" className="flex items-center gap-3" data-testid="link-brand">
          <div className="relative grid h-9 w-9 place-items-center border border-[#c5ff32] text-[#c5ff32]">
            <div className="absolute inset-1 border border-[#c5ff32]/30" />
            <Radio size={16} />
          </div>
          <div>
            <div className="font-display text-lg font-semibold tracking-[.08em] text-[#dfe8e4]">CYBER//HOME</div>
            <div className="tech-label mt-0.5">WALL CONTROL / v2.4.1</div>
          </div>
        </Link>
        <button className="hidden text-[#77858f] md:block" data-testid="button-sidebar-menu" aria-label="Open navigation menu">
          <Menu size={18} />
        </button>
      </div>

      <div className="mobile-scroll-nav flex gap-1 px-3 pb-3 md:block md:px-3 md:pb-0">
        <div className="mb-3 hidden px-3 tech-label md:block">Control matrix</div>
        {navItems.map(({ href, label, icon: Icon, code }) => {
          const active = location === href;
          return (
            <Link
              key={href}
              href={href}
              data-testid={`link-nav-${label.toLowerCase()}`}
              className={`nav-item flex min-w-max items-center gap-3 px-3 py-2.5 text-sm ${active ? 'active' : 'text-[#87949d]'}`}
            >
              <Icon size={16} strokeWidth={active ? 2.2 : 1.7} />
              <span>{label}</span>
              <span className="ml-auto hidden font-mono text-[9px] text-[#53616b] md:block">{code}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto hidden p-5 md:block">
        <div className="panel relative overflow-hidden p-4">
          <div className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-[#c5ff32]" />
          <div className="tech-label">Panel health</div>
          <div className="mt-3 flex items-end justify-between">
            <span className="font-display text-3xl text-[#dae5dc]">98.4</span>
            <span className="font-mono text-[10px] text-[#829099]">%</span>
          </div>
          <div className="mt-3 h-1 bg-[#0b1014]">
            <div className="h-full w-[98%] bg-[#c5ff32]" />
          </div>
          <div className="mt-2 font-mono text-[9px] text-[#6d7b84]">TEMP 31.8°C · MEMORY NOMINAL</div>
        </div>
        <div className="mt-5 flex items-center justify-between px-1 font-mono text-[9px] text-[#526069]">
          <span>JC4827W543</span>
          <span>LOCAL / SECURE</span>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ location, notify }: { location: string; notify: (message: string) => void }) {
  const current = navItems.find((item) => item.href === location);
  const now = new Date();
  const clock = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString([], { weekday: 'short', day: '2-digit', month: 'short' }).toUpperCase();
  return (
    <header className="relative z-10 flex items-center justify-between border-b border-[#252f38] px-4 py-3 sm:px-6 lg:px-10">
      <div className="flex items-center gap-3">
        <span className="tech-label">NODE / {current?.code ?? '00'}</span>
        <ChevronRight size={13} className="text-[#56646d]" />
        <span className="font-display text-sm tracking-[.12em] text-[#d5dfd9]">{current?.label.toUpperCase() ?? 'SYSTEM'}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right font-mono leading-tight text-[#89969d]" data-testid="text-date-time">
          <div className="text-[9px] tracking-[.12em] text-[#64727a]">{date}</div>
          <div className="text-xs text-[#d5dfd9]">{clock}</div>
        </div>
        <div className="hidden items-center gap-2 font-mono text-[10px] text-[#7d8a91] sm:flex">
          <CloudRain size={13} className="text-[#53ddc0]" />
          18°C / LIGHT RAIN
        </div>
        <button className="relative border border-[#2b3840] p-2 text-[#9aa7ad] transition hover:border-[#c5ff32] hover:text-[#c5ff32]" onClick={() => notify('NOTIFICATIONS · 2 HOUSEHOLD EVENTS')} data-testid="button-notifications" aria-label="View notifications">
          <Bell size={15} />
          <span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-[#c5ff32]" />
        </button>
      </div>
    </header>
  );
}

function PageHeading({ eyebrow, title, detail, action }: { eyebrow: string; title: string; detail: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#29343d] pb-5 sm:flex-row sm:items-end">
      <div>
        <div className="mb-2 flex items-center gap-2 tech-label"><span className="status-dot" />{eyebrow}</div>
        <h1 className="font-display text-4xl tracking-[.04em] text-[#e1e9e3] sm:text-5xl">{title}</h1>
        <p className="mt-2 max-w-xl text-sm text-[#7f8b94]">{detail}</p>
      </div>
      {action}
    </div>
  );
}

function SectionLabel({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return <div className="mb-3 flex items-center justify-between"><div className="tech-label">{children}</div>{right}</div>;
}

type WidgetSpan = 1 | 2 | 'full';
type WidgetInstance = { id: string; span: WidgetSpan };

const widgetCatalog: Array<{ id: string; label: string; detail: string; defaultSpan: WidgetSpan }> = [
  { id: 'weather', label: 'Weather', detail: 'Forecast and environmental readout', defaultSpan: 'full' },
  { id: 'scenes', label: 'Scenes', detail: 'Lighting presets and perimeter power', defaultSpan: 2 },
  { id: 'thermostat', label: 'Thermostat', detail: 'Target temperature and heater relay', defaultSpan: 2 },
  { id: 'blinds', label: 'Blind controls', detail: 'Momentary up/down controls', defaultSpan: 'full' },
  { id: 'security', label: 'Security', detail: 'Camera and perimeter status', defaultSpan: 2 },
  { id: 'presence', label: 'Presence radar', detail: 'Live occupancy and room locations', defaultSpan: 2 },
  { id: 'calendar', label: 'Next up', detail: 'Household schedule preview', defaultSpan: 2 },
  { id: 'platforms', label: 'Platform dock', detail: 'X, Facebook, YouTube, and Gmail', defaultSpan: 'full' },
];

function Dashboard({ notify }: { notify: (message: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [lights, setLights] = useState(true);
  const [scene, setScene] = useState('Night mode');
  const [setPoint, setSetPoint] = useState(21);
  const [heater, setHeater] = useState(false);
  const [dragging, setDragging] = useState<string | null>(null);
  const [widgets, setWidgets] = useState<WidgetInstance[]>([
    { id: 'weather', span: 'full' },
    { id: 'scenes', span: 2 },
    { id: 'thermostat', span: 2 },
    { id: 'blinds', span: 'full' },
    { id: 'security', span: 2 },
    { id: 'presence', span: 2 },
    { id: 'calendar', span: 2 },
    { id: 'platforms', span: 'full' },
  ]);
  const [blindPositions, setBlindPositions] = useState([35, 62, 48]);
  const [movingBlind, setMovingBlind] = useState<{ index: number; direction: 'up' | 'down' } | null>(null);
  const liveSensors = useLiveSensors();
  const scenes = [
    { name: 'Night mode', detail: 'Soft perimeter lighting', icon: Moon },
    { name: 'Focus', detail: 'Cool work light', icon: Gauge },
    { name: 'Away', detail: 'Secure + conserve', icon: LockKeyhole },
  ];
  const forecast = [
    { day: 'NOW', temp: '18°', low: '11°', icon: CloudRain, current: true },
    { day: 'MON', temp: '20°', low: '12°', icon: Sun },
    { day: 'TUE', temp: '17°', low: '10°', icon: Cloud },
    { day: 'WED', temp: '19°', low: '11°', icon: CloudRain },
    { day: 'THU', temp: '21°', low: '13°', icon: Sun },
    { day: 'FRI', temp: '16°', low: '9°', icon: CloudRain },
  ];
  const availableWidgets = useMemo(() => widgetCatalog.filter((item) => !widgets.some((widget) => widget.id === item.id)), [widgets]);

  useEffect(() => {
    if (!movingBlind) return;
    const interval = window.setInterval(() => {
      setBlindPositions((positions) => positions.map((position, index) => index === movingBlind.index ? Math.max(0, Math.min(100, position + (movingBlind.direction === 'up' ? 3 : -3))) : position));
    }, 120);
    return () => window.clearInterval(interval);
  }, [movingBlind]);

  const stopBlind = () => {
    if (movingBlind) notify(`${['BACK DOOR', 'LOUNGE', 'KITCHEN'][movingBlind.index]} · ${movingBlind.direction.toUpperCase()} STOP`);
    setMovingBlind(null);
  };
  const startBlind = (index: number, direction: 'up' | 'down') => {
    if (editing) return;
    setMovingBlind({ index, direction });
    notify(`${['BACK DOOR', 'LOUNGE', 'KITCHEN'][index]} · ${direction.toUpperCase()} ACTIVE`);
  };
  const moveWidget = (id: string, offset: number) => {
    setWidgets((current) => {
      const index = current.findIndex((widget) => widget.id === id);
      const nextIndex = index + offset;
      if (index < 0 || nextIndex < 0 || nextIndex >= current.length) return current;
      const next = [...current];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next;
    });
  };
  const cycleSpan = (id: string) => {
    setWidgets((current) => current.map((widget) => {
      if (widget.id !== id) return widget;
      const nextSpan: WidgetSpan = widget.span === 1 ? 2 : widget.span === 2 ? 'full' : 1;
      return { ...widget, span: nextSpan };
    }));
  };
  const addWidget = (id: string) => {
    const definition = widgetCatalog.find((item) => item.id === id);
    if (!definition) return;
    setWidgets((current) => [...current, { id, span: definition.defaultSpan }]);
    notify(`WIDGET ADDED · ${definition.label.toUpperCase()}`);
  };
  const removeWidget = (id: string) => {
    setWidgets((current) => current.filter((widget) => widget.id !== id));
    notify(`WIDGET REMOVED · ${widgetCatalog.find((item) => item.id === id)?.label.toUpperCase()}`);
  };
  const handleDrop = (event: DragEvent<HTMLDivElement>, targetId: string) => {
    event.preventDefault();
    if (!dragging || dragging === targetId) return;
    setWidgets((current) => {
      const from = current.findIndex((widget) => widget.id === dragging);
      const to = current.findIndex((widget) => widget.id === targetId);
      if (from < 0 || to < 0) return current;
      const next = [...current];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
    setDragging(null);
  };

  const renderWidget = (id: string) => {
    if (id === 'weather') {
      return <div className="panel panel-cut relative overflow-hidden p-5 sm:p-7">
        <div className="absolute right-5 top-5 tech-label">21 JUN / 21:47</div>
        <div className="scan-line">
          <div className="tech-label">Environmental readout / living level</div>
          <div className="mt-4 flex items-end gap-3"><span className="metric-value text-[#e4ede6]" data-testid="text-home-temperature">{liveSensors.temperature.toFixed(1)}°</span><span className="mb-1 font-mono text-xs text-[#819098]">CELSIUS / COMFORT BAND</span><Sparkline data={liveSensors.history} /></div>
          <div className="mt-2 flex items-center gap-3 text-xs text-[#7f8b94]"><CloudRain size={15} className="text-[#53ddc0]" />Light rain outside <span className="text-[#46545d]">/</span> humidity {Math.round(liveSensors.humidity)}%</div>
          <div className="forecast-grid mt-5 grid grid-cols-6 gap-1 border-y border-[#27343c] py-3">{forecast.map(({ day, temp, low, icon: Icon, current }) => <div key={day} className={`min-w-0 border-l border-[#27343c] px-2 first:border-l-0 ${current ? 'bg-[#c5ff32]/10 py-2' : 'py-1'}`}><div className={`font-mono text-[9px] ${current ? 'text-[#c5ff32]' : 'text-[#6d7b83]'}`}>{day}</div><Icon size={current ? 18 : 14} className={`my-2 ${current ? 'text-[#53ddc0]' : 'text-[#9aa8a6]'}`} /><div className={`font-display ${current ? 'text-xl text-[#e3ede5]' : 'text-sm text-[#c8d2cc]'}`}>{temp}</div><div className="font-mono text-[9px] text-[#68767e]">{low} / LOW</div></div>)}</div>
        </div>
        <div className="my-6 signal-line" />
        <div className="grid grid-cols-3 gap-3"><Metric icon={Thermometer} label="Inside" value={`${liveSensors.temperature.toFixed(1)}°`} detail="stable" /><Metric icon={Wind} label="Air quality" value="Good" detail={`CO₂ ${Math.round(liveSensors.co2)} ppm`} accent="cyan" /><Metric icon={ShieldCheck} label="Security" value="Armed" detail="all zones clear" /></div>
      </div>;
    }
    if (id === 'scenes') {
      return <div className="panel p-5 sm:p-6"><SectionLabel right={<span className="font-mono text-[9px] text-[#53616b]">LOCAL PRESETS</span>}>Scene launcher</SectionLabel><div className="space-y-2">{scenes.map(({ name, detail, icon: Icon }) => <button key={name} onClick={() => { setScene(name); notify(`SCENE LOADED · ${name.toUpperCase()}`); }} data-testid={`button-scene-${name.toLowerCase().replace(' ', '-')}`} className={`group flex w-full items-center gap-3 border p-3 text-left transition ${scene === name ? 'border-[#a9da36] bg-[#c5ff32]/10' : 'border-[#2b3840] hover:border-[#54636c]'}`}><div className={`grid h-8 w-8 place-items-center border ${scene === name ? 'border-[#c5ff32] text-[#c5ff32]' : 'border-[#37454e] text-[#829099]'}`}><Icon size={15} /></div><span className="min-w-0 flex-1"><span className="block text-sm text-[#d1dbd6]">{name}</span><span className="block font-mono text-[9px] text-[#6f7c84]">{detail}</span></span>{scene === name ? <Check size={14} className="text-[#c5ff32]" /> : <ChevronRight size={14} className="text-[#596771]" />}</button>)}</div><div className="mt-5 flex items-center justify-between border-t border-[#27333c] pt-4"><div><div className="text-sm text-[#cdd8d1]">Perimeter lighting</div><div className="font-mono text-[9px] text-[#6f7b83]">Lounge + hall circuit</div></div><button className={`switch ${lights ? 'on' : ''}`} onClick={() => { setLights(!lights); notify(`PERIMETER LIGHTS · ${!lights ? 'ON' : 'OFF'}`); }} data-testid="switch-perimeter-lights" aria-label="Toggle perimeter lighting" /></div></div>;
    }
    if (id === 'thermostat') {
      return <div className="panel p-5 sm:p-6"><SectionLabel right={<span className="font-mono text-[9px] text-[#53616b]">HEAT / RELAY 01</span>}>Thermostat</SectionLabel><div className="flex items-center justify-between gap-3"><div><div className="font-display text-3xl text-[#e2ece4]">{setPoint}°</div><div className="font-mono text-[9px] text-[#718089]">TARGET / INSIDE {liveSensors.temperature.toFixed(1)}°</div></div><button className={`switch ${heater ? 'on' : ''}`} onClick={() => { setHeater(!heater); notify(`HEATER RELAY · ${!heater ? 'ON' : 'OFF'}`); }} data-testid="switch-heater" aria-label="Toggle heater" /></div><input className="mt-4 w-full accent-[#c5ff32]" type="range" min="16" max="28" value={setPoint} onChange={(event) => setSetPoint(Number(event.target.value))} aria-label="Thermostat set temperature" data-testid="input-thermostat-setpoint" /><div className="mt-2 flex justify-between font-mono text-[9px] text-[#68767e]"><span>16° ECO</span><span className={heater ? 'text-[#c5ff32]' : 'text-[#68767e]'}>{heater ? 'RELAY ACTIVE' : 'RELAY STANDBY'}</span><span>28° MAX</span></div></div>;
    }
    if (id === 'blinds') {
      return <div className="panel p-5 sm:p-6"><SectionLabel right={<span className="font-mono text-[9px] text-[#53616b]">HOLD TO MOVE</span>}>Roller blinds</SectionLabel><div className="grid gap-2 sm:grid-cols-3">{['Back door', 'Lounge', 'Kitchen'].map((name, index) => <div key={name} className="border border-[#2b3942] bg-[#111920] p-3"><div className="flex items-center justify-between"><div><div className="text-sm text-[#d6dfd9]">{name}</div><div className="font-mono text-[9px] text-[#6e7b84]">MOTOR {String(index + 1).padStart(2, '0')}</div></div><span className="font-display text-xl text-[#d9e4dd]">{blindPositions[index]}%</span></div><div className="blind-track mt-3"><div className="blind-fill" style={{ width: `${blindPositions[index]}%` }} /></div><div className="mt-3 grid grid-cols-2 gap-2"><button className={`momentary-button ${movingBlind?.index === index && movingBlind.direction === 'up' ? 'active' : ''}`} onPointerDown={() => startBlind(index, 'up')} onPointerUp={stopBlind} onPointerCancel={stopBlind} onPointerLeave={stopBlind} onKeyDown={(event) => { if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) startBlind(index, 'up'); }} onKeyUp={stopBlind} onBlur={stopBlind} disabled={editing} data-testid={`button-overview-blind-up-${index}`} aria-label={`Hold to raise ${name}`}><ChevronUp size={14} />UP</button><button className={`momentary-button ${movingBlind?.index === index && movingBlind.direction === 'down' ? 'active' : ''}`} onPointerDown={() => startBlind(index, 'down')} onPointerUp={stopBlind} onPointerCancel={stopBlind} onPointerLeave={stopBlind} onKeyDown={(event) => { if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) startBlind(index, 'down'); }} onKeyUp={stopBlind} onBlur={stopBlind} disabled={editing} data-testid={`button-overview-blind-down-${index}`} aria-label={`Hold to lower ${name}`}><ChevronDown size={14} />DOWN</button></div></div>)}</div></div>;
    }
    if (id === 'security') {
      return <div className="panel p-5"><SectionLabel right={<span className="font-mono text-[9px] text-[#53616b]">SECURITY / LIVE</span>}>Camera pulse</SectionLabel><div className="flex items-center gap-3"><div className="camera-frame relative grid h-14 w-20 place-items-center border border-[#38505a]"><Eye size={17} className="text-[#53ddc0]" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#e36b5a]" /></div><div><div className="text-sm text-[#d0dad4]">Front entry</div><div className="font-mono text-[10px] text-[#77858e]">No movement · 2 min ago</div></div><Link href="/cameras" className="ml-auto text-[#839097] hover:text-[#c5ff32]" data-testid="link-cameras-overview"><ArrowRight size={16} /></Link></div></div>;
    }
    if (id === 'presence') {
      return <PresenceRadar />;
    }
    if (id === 'calendar') {
      return <div className="panel p-5"><SectionLabel right={<span className="font-mono text-[9px] text-[#53616b]">SCHEDULE / 02</span>}>Next up</SectionLabel><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center border border-[#35434b] text-[#c5ff32]"><Timer size={16} /></div><div><div className="text-sm text-[#d0dad4]">Blinds close</div><div className="font-mono text-[10px] text-[#77858e]">22:30 · lounge / kitchen</div></div></div><div className="mt-4 h-1 bg-[#0d1216]"><div className="h-full w-[72%] bg-[#c5ff32]" /></div></div>;
    }
    return <div className="panel p-5"><SectionLabel right={<span className="font-mono text-[9px] text-[#53616b]">LOCAL LINKS</span>}>Platform dock</SectionLabel><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{[{ href: '/x', label: 'X', icon: X }, { href: '/facebook', label: 'Facebook', icon: Facebook }, { href: '/youtube', label: 'YouTube', icon: Youtube }, { href: '/gmail', label: 'Gmail', icon: Mail }].map(({ href, label, icon: Icon }) => <Link key={href} href={href} className="flex items-center gap-2 border border-[#2b3942] p-2.5 text-xs text-[#cfdad3] hover:border-[#c5ff32] hover:text-[#c5ff32]"><Icon size={14} />{label}</Link>)}</div></div>;
  };

  return <>
    <PageHeading eyebrow="Overview / Home node" title="Good evening, Alex." detail="Your home is quiet, secure, and ready. One action surface for every room." action={<button className={`layout-edit-button ${editing ? 'active' : ''}`} onClick={() => { setEditing(!editing); setMovingBlind(null); }} data-testid="button-edit-overview"><SlidersHorizontal size={14} />{editing ? 'DONE' : 'EDIT LAYOUT'}</button>} />
    {editing && <div className="layout-toolbar panel mb-4 flex flex-wrap items-center gap-2 p-3"><div className="mr-auto"><div className="tech-label text-[#c5ff32]">EDIT MODE / OVERVIEW GRID</div><div className="font-mono text-[9px] text-[#718089]">Drag on desktop or use the arrows. Tap SIZE to cycle 1 / 2 / FULL.</div></div>{availableWidgets.map((widget) => <button key={widget.id} className="widget-add-button" onClick={() => addWidget(widget.id)} data-testid={`button-add-widget-${widget.id}`}><Plus size={12} />{widget.label}</button>)}</div>}
    <div className={`overview-grid ${editing ? 'editing' : ''}`}>
      {widgets.map((widget, index) => <div key={widget.id} draggable={editing} onDragStart={() => setDragging(widget.id)} onDragOver={(event) => event.preventDefault()} onDrop={(event) => handleDrop(event, widget.id)} onDragEnd={() => setDragging(null)} className={`widget-shell widget-span-${widget.span} ${dragging === widget.id ? 'dragging' : ''}`}>
        {editing && <div className="widget-controls"><span className="widget-drag-label"><GripVertical size={13} />MOVE</span><button onClick={() => moveWidget(widget.id, -1)} aria-label={`Move ${widget.id} earlier`}><ChevronUp size={13} /></button><button onClick={() => moveWidget(widget.id, 1)} aria-label={`Move ${widget.id} later`}><ChevronDown size={13} /></button><button onClick={() => cycleSpan(widget.id)} aria-label={`Resize ${widget.id}`}>SIZE</button><button onClick={() => removeWidget(widget.id)} aria-label={`Remove ${widget.id}`}><X size={13} /></button></div>}
        {renderWidget(widget.id)}
      </div>)}
    </div>
  </>;
}

function Metric({ icon: Icon, label, value, detail, accent }: { icon: LucideIcon; label: string; value: string; detail: string; accent?: string }) {
  return <div className="border-l border-[#344149] pl-3"><Icon size={14} className={accent === 'cyan' ? 'text-[#53ddc0]' : 'text-[#c5ff32]'} /><div className="mt-2 text-sm text-[#d6e0da]" data-testid={`text-metric-${label.toLowerCase().replace(' ', '-')}`}>{value}</div><div className="font-mono text-[9px] text-[#718089]">{label} / {detail}</div></div>;
}

function DashboardCard({ title, code, children }: { title: string; code: string; children: ReactNode }) {
  return <div className="panel p-4 sm:p-5"><SectionLabel right={<span className="font-mono text-[9px] text-[#56656e]">{code}</span>}>{title}</SectionLabel>{children}</div>;
}

function Lighting({ notify }: { notify: (message: string) => void }) {
  const [on, setOn] = useState(true);
  const [brightness, setBrightness] = useState(72);
  const [temperature, setTemperature] = useState(68);
  const [color, setColor] = useState('#c5ff32');
  const [animation, setAnimation] = useState('Steady');
  const colors = ['#c5ff32', '#fff2c1', '#53ddc0', '#63a3ff', '#d98fff', '#ff795e'];
  return (
    <>
      <PageHeading eyebrow="Lighting / Circuit 01" title="Ambient light" detail="Tune the lounge globe and lamp circuit. Changes apply instantly to the room." action={<button className={`switch ${on ? 'on' : ''}`} onClick={() => { setOn(!on); notify(`LOUNGE CIRCUIT · ${!on ? 'ONLINE' : 'STANDBY'}`); }} data-testid="switch-lounge-light" aria-label="Toggle lounge light" />} />
      <div className="grid gap-4 lg:grid-cols-[1fr_1.25fr]">
        <div className="panel relative flex min-h-[390px] flex-col items-center justify-center overflow-hidden p-8">
          <div className="absolute left-5 top-5 tech-label">LOUNGE / GLOBE 01</div><div className="absolute right-5 top-5 font-mono text-[10px] text-[#5e6d75]">RGBW · 9.2 W</div>
          <div className="relative grid h-56 w-56 place-items-center rounded-full border border-[#45523b] bg-[radial-gradient(circle_at_40%_35%,rgba(222,255,142,.9),rgba(176,238,35,.33)_28%,rgba(95,125,18,.1)_57%,transparent_71%)] shadow-[0_0_100px_rgba(197,255,50,.2)] transition-opacity" style={{ opacity: on ? brightness / 100 : .13 }}>
            <div className="absolute inset-5 rounded-full border border-[#c5ff32]/25" /><div className="absolute inset-10 rounded-full border border-[#c5ff32]/20" /><Lightbulb size={26} className="text-[#f4ffc9]" />
            <span className="absolute -bottom-9 font-mono text-[10px] text-[#809098]">{on ? 'OUTPUT ACTIVE' : 'OUTPUT STANDBY'}</span>
          </div>
          <div className="mt-14 flex w-full items-center justify-between border-t border-[#29363e] pt-4 font-mono text-[9px] text-[#687780]"><span>LAST INPUT 4 SEC AGO</span><span className={on ? 'text-[#c5ff32]' : 'text-[#d56b5c]'}>{on ? 'NOMINAL' : 'OFFLINE'}</span></div>
        </div>
        <div className="panel p-5 sm:p-7">
          <SectionLabel right={<span className="font-mono text-[9px] text-[#55646d]">OUTPUT TUNING</span>}>Photometric control</SectionLabel>
          <ControlSlider label="Brightness" value={`${brightness}%`} valueNum={brightness} onChange={setBrightness} testId="input-light-brightness" />
          <ControlSlider label="White temperature" value={temperature < 50 ? 'Cool' : temperature > 75 ? 'Warm' : 'Neutral'} valueNum={temperature} onChange={setTemperature} testId="input-light-temperature" />
          <div className="mt-7"><SectionLabel right={<span className="font-mono text-[10px]" style={{ color }}>HEX {color.toUpperCase()}</span>}>Chromatic channel</SectionLabel><div className="flex flex-wrap gap-3">{colors.map((chip) => <button key={chip} className={`color-chip ${color === chip ? 'selected' : ''}`} style={{ background: chip }} onClick={() => { setColor(chip); notify(`COLOR CHANNEL · ${chip.toUpperCase()}`); }} data-testid={`button-color-${chip.slice(1)}`} aria-label={`Select color ${chip}`} />)}</div></div>
          <div className="mt-7"><SectionLabel>Animation profile</SectionLabel><div className="segmented grid grid-cols-3">{['Steady', 'Breath', 'Pulse'].map((mode) => <button key={mode} className={`py-2 font-mono text-[10px] ${animation === mode ? 'active' : ''}`} onClick={() => { setAnimation(mode); notify(`ANIMATION PROFILE · ${mode.toUpperCase()}`); }} data-testid={`button-animation-${mode.toLowerCase()}`}>{mode}</button>)}</div></div>
          <div className="mt-7 flex items-center justify-between border-t border-[#29363e] pt-4"><div><div className="text-sm text-[#d3ddd7]">Room sync</div><div className="font-mono text-[9px] text-[#6d7a82]">Match hall perimeter tone</div></div><button className="switch on" data-testid="switch-room-sync" onClick={() => notify('ROOM SYNC · LINKED TO PERIMETER')} aria-label="Toggle room sync" /></div>
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3"><DashboardCard title="Lounge lamp" code="01 / 72%"><DeviceMini icon={LampCeiling} value="Online" detail="warm white" /></DashboardCard><DashboardCard title="Hall strip" code="02 / 41%"><DeviceMini icon={Activity} value="Online" detail="motion linked" /></DashboardCard><DashboardCard title="Desk task light" code="03 / OFF"><DeviceMini icon={Monitor} value="Standby" detail="last used 18:04" /></DashboardCard></div>
    </>
  );
}

function ControlSlider({ label, value, valueNum, onChange, testId }: { label: string; value: string; valueNum: number; onChange: (value: number) => void; testId: string }) {
  return <div className="mt-6"><div className="mb-2 flex justify-between text-sm text-[#cfd9d2]"><span>{label}</span><span className="font-mono text-[10px] text-[#c5ff32]" data-testid={`text-${testId}`}>{value}</span></div><input className="hc-range w-full" type="range" min="0" max="100" value={valueNum} onChange={(event) => onChange(Number(event.target.value))} data-testid={testId} /></div>;
}

function DeviceMini({ icon: Icon, value, detail }: { icon: LucideIcon; value: string; detail: string }) {
  return <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center border border-[#35434b] text-[#c5ff32]"><Icon size={16} /></div><div><div className="text-sm text-[#d2ddd6]">{value}</div><div className="font-mono text-[9px] text-[#74818a]">{detail}</div></div><span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#c5ff32]" /></div>;
}

function Blinds({ notify }: { notify: (message: string) => void }) {
  const [blinds, setBlinds] = useState([{ name: 'Back door', room: 'Ground / west', value: 35 }, { name: 'Lounge', room: 'Ground / south', value: 62 }, { name: 'Kitchen', room: 'Ground / east', value: 48 }]);
  const update = (index: number, value: number) => setBlinds((items) => items.map((item, current) => current === index ? { ...item, value } : item));
  return <>
    <PageHeading eyebrow="Shading / Motor bank" title="Window control" detail="Three motorized rollers · position is shown as percent open." action={<button className="flex items-center gap-2 border border-[#35434b] px-3 py-2 font-mono text-[10px] text-[#aab6b5] hover:border-[#c5ff32] hover:text-[#c5ff32]" onClick={() => { setBlinds((items) => items.map((item) => ({ ...item, value: 0 }))); notify('ALL ROLLERS · CLOSED'); }} data-testid="button-close-all-blinds"><PanelTop size={14} />CLOSE ALL</button>} />
    <div className="panel overflow-hidden">
      <div className="hidden grid-cols-[1.1fr_1fr_120px] border-b border-[#2b3840] px-5 py-3 tech-label sm:grid"><span>Motor / zone</span><span>Position telemetry</span><span className="text-right">Output</span></div>
      {blinds.map((blind, index) => <div key={blind.name} className="grid gap-4 border-b border-[#27343c] p-5 last:border-0 sm:grid-cols-[1.1fr_1fr_120px] sm:items-center"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center border border-[#35434b] text-[#c5ff32]"><DoorOpen size={17} /></div><div><div className="text-sm text-[#d6dfd9]">{blind.name}</div><div className="font-mono text-[10px] text-[#6e7b84]">{blind.room} / motor {String(index + 1).padStart(2, '0')}</div></div></div><div><div className="mb-2 flex justify-between font-mono text-[10px] text-[#718089]"><span>0% CLOSED</span><span className="text-[#c5ff32]" data-testid={`text-blind-position-${index}`}>{blind.value}% OPEN</span><span>100%</span></div><div className="blind-track"><div className="blind-fill" style={{ width: `${blind.value}%` }} /></div><input className="hc-range mt-3 w-full" type="range" min="0" max="100" value={blind.value} onChange={(event) => update(index, Number(event.target.value))} data-testid={`input-blind-${index}`} /></div><div className="flex items-center justify-between gap-2 sm:justify-end"><button className="border border-[#2f3d45] p-2 text-[#829099] hover:border-[#c5ff32] hover:text-[#c5ff32]" onClick={() => { update(index, 0); notify(`${blind.name.toUpperCase()} · CLOSED`); }} data-testid={`button-blind-close-${index}`} aria-label={`Close ${blind.name}`}><PanelTop size={14} /></button><button className="border border-[#2f3d45] p-2 text-[#829099] hover:border-[#c5ff32] hover:text-[#c5ff32]" onClick={() => { update(index, 100); notify(`${blind.name.toUpperCase()} · OPEN`); }} data-testid={`button-blind-open-${index}`} aria-label={`Open ${blind.name}`}><ChevronRight size={14} /></button><span className="w-12 text-right font-display text-2xl text-[#d9e4dd]">{blind.value}%</span></div></div>)}
    </div>
    <div className="mt-4 grid gap-4 md:grid-cols-2"><DashboardCard title="Auto shade logic" code="RULE / WEATHER"><div className="flex items-center justify-between"><div><div className="text-sm text-[#d2ddd6]">Close on direct sun</div><div className="font-mono text-[9px] text-[#718089]">Solar angle threshold 42°</div></div><button className="switch on" onClick={() => notify('AUTO SHADE LOGIC · UPDATED')} data-testid="switch-auto-shade" aria-label="Toggle auto shade logic" /></div></DashboardCard><DashboardCard title="Scheduled movement" code="NEXT / 22:30"><div className="flex items-center gap-3"><Timer size={16} className="text-[#53ddc0]" /><div className="text-sm text-[#d2ddd6]">Evening close sequence</div><span className="ml-auto font-mono text-[10px] text-[#c5ff32]">IN 43 MIN</span></div></DashboardCard></div>
  </>;
}

function Calendar({ notify }: { notify: (message: string) => void }) {
  const [selected, setSelected] = useState(3);
  const [events, setEvents] = useState([{ time: '08:30', title: 'School run', room: 'Household' }, { time: '12:15', title: 'Package delivery window', room: 'Front entry' }, { time: '18:30', title: 'Dinner with Mira', room: 'Dining' }]);
  const [newEvent, setNewEvent] = useState('');
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const dates = ['17', '18', '19', '20', '21', '22', '23'];
  return <>
    <PageHeading eyebrow="Calendar / Household signal" title="This week" detail="One shared timeline for the home. Household events appear alongside system schedules." action={<button className="flex items-center gap-2 border border-[#c5ff32] bg-[#c5ff32] px-3 py-2 font-mono text-[10px] text-[#111820] hover:bg-[#d7ff69]" onClick={() => { setEvents([...events, { time: '20:00', title: 'New household note', room: 'Home' }]); notify('CALENDAR · EVENT ADDED'); }} data-testid="button-add-calendar"><Plus size={14} />ADD EVENT</button>} />
    <div className="panel p-4 sm:p-6"><div className="grid grid-cols-7 gap-1">{days.map((day, index) => <button key={day} onClick={() => { setSelected(index); notify(`CALENDAR FOCUS · ${day} ${dates[index]}`); }} data-testid={`button-day-${day.toLowerCase()}`} className={`border p-2 text-left transition sm:p-3 ${selected === index ? 'border-[#b9ec3b] bg-[#c5ff32]/10' : 'border-[#29363e] hover:border-[#51616a]'}`}><div className="font-mono text-[9px] text-[#77858e]">{day}</div><div className={`mt-2 font-display text-2xl ${selected === index ? 'text-[#c5ff32]' : 'text-[#d2ddd6]'}`}>{dates[index]}</div>{index === 4 && <div className="mt-2 h-1 w-1 rounded-full bg-[#e36b5a]" />}</button>)}</div><div className="my-6 signal-line" /><div className="flex items-center justify-between"><div><div className="font-display text-2xl tracking-wide text-[#dde7e0]">{days[selected]} 21 JUNE</div><div className="mt-1 font-mono text-[10px] text-[#687780]">WEEK 25 / LOCAL TIME</div></div><div className="flex items-center gap-2 font-mono text-[10px] text-[#53ddc0]"><CalendarDays size={14} />3 EVENTS</div></div><div className="mt-6 space-y-2">{events.map((event, index) => <div key={`${event.title}-${index}`} className="flex items-center gap-4 border border-[#29363e] bg-[#131b21] p-3"><div className="w-12 font-mono text-[10px] text-[#c5ff32]">{event.time}</div><div className="h-7 w-px bg-[#36444c]" /><div className="flex-1"><div className="text-sm text-[#d4ded8]">{event.title}</div><div className="font-mono text-[9px] text-[#6e7c84]">{event.room}</div></div><button className="text-[#56656d] hover:text-[#d46b5d]" onClick={() => { setEvents(events.filter((_, eventIndex) => eventIndex !== index)); notify('CALENDAR · EVENT REMOVED'); }} data-testid={`button-delete-event-${index}`} aria-label={`Delete ${event.title}`}><Trash2 size={14} /></button></div>)}</div><div className="mt-5 flex gap-2"><input value={newEvent} onChange={(event) => setNewEvent(event.target.value)} placeholder="Add a quick household note" className="min-w-0 flex-1 border border-[#2d3a42] bg-[#0d1419] px-3 py-2 text-sm text-[#d4ded8] outline-none placeholder:text-[#5c6a73] focus:border-[#8ebf2e]" data-testid="input-calendar-event" /><button className="border border-[#35434b] px-3 text-[#c5ff32] hover:border-[#c5ff32]" onClick={() => { if (!newEvent.trim()) return; setEvents([...events, { time: '21:00', title: newEvent.trim(), room: 'Household' }]); setNewEvent(''); notify('CALENDAR · NOTE ADDED'); }} data-testid="button-save-calendar-event"><Check size={15} /></button></div></div>
  </>;
}

function Cameras({ notify }: { notify: (message: string) => void }) {
  const [privacy, setPrivacy] = useState(false);
  const cameras = [{ name: 'Front entry', code: 'CAM-01', detail: 'Driveway / north', status: 'No movement' }, { name: 'Lounge', code: 'CAM-02', detail: 'Interior / ground', status: 'Occupancy detected' }, { name: 'Back garden', code: 'CAM-03', detail: 'Garden / west', status: 'No movement' }, { name: 'Side passage', code: 'CAM-04', detail: 'Passage / east', status: 'No movement' }];
  return <>
    <PageHeading eyebrow="Cameras / Perimeter watch" title="Security grid" detail="Local camera feeds are available on this panel. Privacy mode masks interior zones." action={<button className="flex items-center gap-2 border border-[#35434b] px-3 py-2 font-mono text-[10px] text-[#aab6b5] hover:border-[#c5ff32] hover:text-[#c5ff32]" onClick={() => { setPrivacy(!privacy); notify(`PRIVACY MODE · ${!privacy ? 'ENABLED' : 'DISABLED'}`); }} data-testid="button-privacy-mode"><LockKeyhole size={14} />{privacy ? 'PRIVACY ON' : 'PRIVACY MODE'}</button>} />
    <div className="grid gap-4 sm:grid-cols-2">{cameras.map((camera, index) => <div key={camera.code} className={`panel overflow-hidden ${index === 0 ? 'sm:col-span-2' : ''}`}><div className={`camera-frame relative ${index === 0 ? 'aspect-[2.5/1]' : 'aspect-video'} grid place-items-center`}><div className={`absolute inset-0 ${privacy && index === 1 ? 'bg-[#10161b]' : ''}`} />{privacy && index === 1 ? <div className="z-10 text-center"><LockKeyhole size={22} className="mx-auto text-[#c5ff32]" /><div className="mt-2 font-mono text-[10px] text-[#c5ff32]">INTERIOR MASK ACTIVE</div></div> : <><div className="z-10 grid h-14 w-14 place-items-center rounded-full border border-[#41616a] bg-[#17323a]/60"><Camera size={20} className="text-[#53ddc0]" /></div><div className="absolute left-3 top-3 z-10 flex items-center gap-2 font-mono text-[9px] text-[#cad7d3]"><span className="h-1.5 w-1.5 rounded-full bg-[#de6c5b]" />LIVE / LOCAL</div><div className="absolute bottom-3 left-3 z-10 font-mono text-[9px] text-[#778a90]">21:47:08 · 1080P / 24 FPS</div></>}</div><div className="flex items-center gap-3 p-4"><div><div className="text-sm text-[#d5dfd9]">{camera.name}</div><div className="font-mono text-[9px] text-[#6e7b84]">{camera.code} · {camera.detail}</div></div><span className="ml-auto font-mono text-[10px] text-[#829098]">{camera.status}</span><button className="text-[#65747d] hover:text-[#c5ff32]" onClick={() => notify(`${camera.code} · FEED PAIRED TO PANEL`)} data-testid={`button-camera-options-${index}`} aria-label={`Options for ${camera.name}`}><MoreHorizontal size={17} /></button></div></div>)}</div><div className="mt-4 grid gap-4 sm:grid-cols-3"><DashboardCard title="Perimeter status" code="4 / 4 ONLINE"><DeviceMini icon={ShieldCheck} value="Secure" detail="no active alarms" /></DashboardCard><DashboardCard title="Motion events" code="LAST 24 H"><DeviceMini icon={Activity} value="03 logged" detail="0 unresolved" /></DashboardCard><DashboardCard title="Recording" code="LOCAL STORAGE"><DeviceMini icon={Radio} value="62% used" detail="14 days retention" /></DashboardCard></div>
  </>;
}

function Automations({ notify }: { notify: (message: string) => void }) {
  const initial = [{ title: 'Arrival lighting', detail: 'When front door unlocks after sunset', meta: 'LIGHTING / LOUNGE + HALL', on: true }, { title: 'Goodnight sequence', detail: 'At 22:30 every day', meta: 'BLINDS / SECURITY / LIGHTING', on: true }, { title: 'Rain protection', detail: 'When rain probability exceeds 60%', meta: 'BLINDS / KITCHEN', on: false }, { title: 'Quiet hours', detail: 'At 23:00 every day', meta: 'NOTIFICATIONS / PANEL', on: true }];
  const [rules, setRules] = useState(initial);
  return <>
    <PageHeading eyebrow="Automations / Logic layer" title="Rules engine" detail="Small routines that make the home feel anticipatory. Toggle, inspect, and run each rule locally." action={<button className="flex items-center gap-2 border border-[#c5ff32] bg-[#c5ff32] px-3 py-2 font-mono text-[10px] text-[#111820] hover:bg-[#d7ff69]" onClick={() => notify('AUTOMATION BUILDER · READY FOR NEW RULE')} data-testid="button-new-automation"><Plus size={14} />NEW RULE</button>} />
    <div className="space-y-3">{rules.map((rule, index) => <div className="panel flex flex-col gap-4 p-5 sm:flex-row sm:items-center" key={rule.title}><div className={`grid h-11 w-11 shrink-0 place-items-center border ${rule.on ? 'border-[#9ecb30] text-[#c5ff32]' : 'border-[#38464e] text-[#70808a]'}`}><Zap size={18} /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className="text-sm text-[#d6e0da]">{rule.title}</span>{rule.on && <span className="border border-[#49601f] px-1.5 py-0.5 font-mono text-[8px] text-[#c5ff32]">ACTIVE</span>}</div><div className="mt-1 text-xs text-[#7f8d94]">{rule.detail}</div><div className="mt-2 font-mono text-[9px] text-[#61717a]">{rule.meta}</div></div><div className="flex items-center gap-3 border-t border-[#29363e] pt-3 sm:border-0 sm:pt-0"><button className="flex items-center gap-2 border border-[#2f3e46] px-3 py-2 font-mono text-[9px] text-[#91a0a6] hover:border-[#c5ff32] hover:text-[#c5ff32]" onClick={() => notify(`RULE TEST · ${rule.title.toUpperCase()}`)} data-testid={`button-test-automation-${index}`}><Play size={12} />TEST</button><button className={`switch ${rule.on ? 'on' : ''}`} onClick={() => { setRules(rules.map((item, itemIndex) => itemIndex === index ? { ...item, on: !item.on } : item)); notify(`RULE ${rule.on ? 'PAUSED' : 'ENABLED'} · ${rule.title.toUpperCase()}`); }} data-testid={`switch-automation-${index}`} aria-label={`Toggle ${rule.title}`} /></div></div>)}</div><div className="mt-5 panel p-5"><SectionLabel right={<span className="font-mono text-[9px] text-[#56656e]">EVENT STREAM / LOCAL</span>}>Latest automation activity</SectionLabel><div className="grid gap-3 text-xs sm:grid-cols-3"><ActivityLog time="21:32:04" text="Quiet hours evaluated" status="PASS" /><ActivityLog time="20:14:51" text="Arrival lighting ran" status="PASS" /><ActivityLog time="18:02:10" text="Rain protection skipped" status="IDLE" /></div></div>
  </>;
}

function ActivityLog({ time, text, status }: { time: string; text: string; status: string }) {
  return <div className="border-l border-[#3a4c54] pl-3"><div className="font-mono text-[9px] text-[#687881]">{time}</div><div className="mt-1 text-[#bdc9c3]">{text}</div><div className={`mt-1 font-mono text-[9px] ${status === 'PASS' ? 'text-[#c5ff32]' : 'text-[#75858c]'}`}>{status}</div></div>;
}

function Devices({ notify }: { notify: (message: string) => void }) {
  const [devices, setDevices] = useState([{ name: 'Lounge globe', type: 'LIGHT / ZIGBEE', room: 'Lounge', status: 'Online' }, { name: 'Somfy blind motor', type: 'SHADE / MATTER', room: 'Back door', status: 'Online' }, { name: 'Air monitor', type: 'SENSOR / WIFI', room: 'Hall', status: 'Online' }, { name: 'Nest camera', type: 'CAMERA / WIFI', room: 'Front entry', status: 'Online' }]);
  const [name, setName] = useState('');
  const [type, setType] = useState('LIGHT / ZIGBEE');
  return <>
    <PageHeading eyebrow="Devices / Mesh inventory" title="Connected hardware" detail="Every endpoint in the local mesh, with pairing and health state visible at a glance." action={<button className="flex items-center gap-2 border border-[#c5ff32] bg-[#c5ff32] px-3 py-2 font-mono text-[10px] text-[#111820] hover:bg-[#d7ff69]" onClick={() => notify('PAIRING MODE · SCANNING FOR DEVICES')} data-testid="button-scan-devices"><RefreshCw size={14} />SCAN MESH</button>} />
    <div className="grid gap-4 lg:grid-cols-[1.3fr_.7fr]"><div className="panel overflow-hidden"><div className="flex items-center justify-between border-b border-[#2a3740] px-5 py-4"><div className="tech-label">Active endpoints / {devices.length.toString().padStart(2, '0')}</div><div className="font-mono text-[9px] text-[#c5ff32]">MESH HEALTH 100%</div></div>{devices.map((device, index) => <div key={`${device.name}-${index}`} className="flex items-center gap-3 border-b border-[#27343c] p-4 last:border-0"><div className="grid h-9 w-9 place-items-center border border-[#35434b] text-[#c5ff32]">{device.type.startsWith('LIGHT') ? <Lightbulb size={15} /> : device.type.startsWith('CAMERA') ? <Camera size={15} /> : device.type.startsWith('SHADE') ? <PanelTop size={15} /> : <Activity size={15} />}</div><div className="min-w-0 flex-1"><div className="truncate text-sm text-[#d3ddd7]">{device.name}</div><div className="font-mono text-[9px] text-[#6d7b83]">{device.type} · {device.room}</div></div><div className="hidden items-center gap-2 font-mono text-[9px] text-[#c5ff32] sm:flex"><span className="status-dot" />{device.status}</div><button className="text-[#5f6e77] hover:text-[#d66b5c]" onClick={() => { setDevices(devices.filter((_, deviceIndex) => deviceIndex !== index)); notify(`DEVICE REMOVED · ${device.name.toUpperCase()}`); }} data-testid={`button-remove-device-${index}`} aria-label={`Remove ${device.name}`}><Trash2 size={14} /></button></div>)}</div><div className="panel p-5"><SectionLabel>Pair a device</SectionLabel><div className="mb-5 border border-dashed border-[#3c4b53] bg-[#111920] p-4 text-center"><Radio size={23} className="mx-auto text-[#53ddc0]" /><div className="mt-2 text-sm text-[#c8d4cd]">Ready for local pairing</div><div className="mt-1 font-mono text-[9px] text-[#687780]">Matter, Zigbee, Wi-Fi endpoints supported</div></div><label className="tech-label" htmlFor="device-name">Device label</label><input id="device-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Bedroom sensor" className="mt-2 w-full border border-[#2d3a42] bg-[#0d1419] px-3 py-2 text-sm text-[#d4ded8] outline-none placeholder:text-[#5c6a73] focus:border-[#8ebf2e]" data-testid="input-device-name" /><label className="mt-4 block tech-label" htmlFor="device-type">Protocol profile</label><select id="device-type" value={type} onChange={(event) => setType(event.target.value)} className="mt-2 w-full border border-[#2d3a42] bg-[#0d1419] px-3 py-2 text-sm text-[#d4ded8] outline-none focus:border-[#8ebf2e]" data-testid="select-device-type"><option>LIGHT / ZIGBEE</option><option>SHADE / MATTER</option><option>SENSOR / WIFI</option><option>CAMERA / WIFI</option></select><button className="mt-4 flex w-full items-center justify-center gap-2 border border-[#c5ff32] bg-[#c5ff32] py-2.5 font-mono text-[10px] text-[#111820] hover:bg-[#d7ff69]" onClick={() => { if (!name.trim()) { notify('PAIRING ERROR · DEVICE LABEL REQUIRED'); return; } setDevices([...devices, { name: name.trim(), type, room: 'Unassigned', status: 'Online' }]); setName(''); notify(`DEVICE PAIRED · ${name.trim().toUpperCase()}`); }} data-testid="button-pair-device"><Plus size={14} />PAIR DEVICE</button></div></div>
  </>;
}

function Settings({ notify }: { notify: (message: string) => void }) {
  const [theme, setTheme] = useState('Graphite lime');
  const [dimming, setDimming] = useState(72);
  const [standby, setStandby] = useState(true);
  const [sensors, setSensors] = useState(true);
  return <>
    <PageHeading eyebrow="Settings / Panel configuration" title="System settings" detail="Tune the wall panel itself: visual profile, standby behavior, sensors, and update readiness." action={<div className="flex items-center gap-2 font-mono text-[10px] text-[#c5ff32]"><ShieldCheck size={14} />OTA READY</div>} />
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="panel p-5 sm:p-6"><SectionLabel right={<Palette size={14} className="text-[#c5ff32]" />}>Visual profile</SectionLabel><div className="space-y-2">{['Graphite lime', 'Graphite cyan', 'Warm instrument'].map((name) => <button key={name} onClick={() => { setTheme(name); notify(`THEME APPLIED · ${name.toUpperCase()}`); }} data-testid={`button-theme-${name.toLowerCase().replaceAll(' ', '-')}`} className={`flex w-full items-center justify-between border p-3 text-left ${theme === name ? 'border-[#b5e83a] bg-[#c5ff32]/10' : 'border-[#2d3a42] hover:border-[#52636c]'}`}><span className="flex items-center gap-3 text-sm text-[#d2ddd6]"><span className={`h-4 w-4 rounded-full ${name === 'Graphite lime' ? 'bg-[#c5ff32]' : name === 'Graphite cyan' ? 'bg-[#53ddc0]' : 'bg-[#e9a36c]'}`} />{name}</span>{theme === name && <Check size={15} className="text-[#c5ff32]" />}</button>)}</div><div className="mt-6 border-t border-[#2a3740] pt-5"><ControlSlider label="Panel dimming" value={`${dimming}%`} valueNum={dimming} onChange={setDimming} testId="input-panel-dimming" /><div className="mt-2 font-mono text-[9px] text-[#66757e]">Brightness at active state / ambient sensor compensation enabled</div></div></div>
      <div className="panel p-5 sm:p-6"><SectionLabel right={<Monitor size={14} className="text-[#c5ff32]" />}>Display behavior</SectionLabel><SettingsRow title="Standby after inactivity" detail="Panel dims after 90 seconds" value={standby} onClick={() => { setStandby(!standby); notify(`STANDBY TIMER · ${!standby ? 'ENABLED' : 'DISABLED'}`); }} testId="switch-standby" /><SettingsRow title="Wake on proximity" detail="Use the front sensor to wake" value={sensors} onClick={() => { setSensors(!sensors); notify(`PROXIMITY SENSOR · ${!sensors ? 'ACTIVE' : 'PAUSED'}`); }} testId="switch-proximity" /><SettingsRow title="Touch feedback" detail="Subtle haptic pulse on input" value={true} onClick={() => notify('TOUCH FEEDBACK · CALIBRATED')} testId="switch-touch-feedback" /><div className="mt-5 border-t border-[#2a3740] pt-5"><div className="tech-label">Standby clock</div><div className="segmented mt-3 grid grid-cols-3">{['Minimal', 'Time + weather', 'Off'].map((mode, index) => <button key={mode} className={`py-2 font-mono text-[9px] ${index === 1 ? 'active' : ''}`} onClick={() => notify(`STANDBY CLOCK · ${mode.toUpperCase()}`)} data-testid={`button-standby-${index}`}>{mode}</button>)}</div></div></div>
      <div className="panel p-5 sm:p-6"><SectionLabel right={<ShieldCheck size={14} className="text-[#c5ff32]" />}>Sensors & privacy</SectionLabel><div className="grid gap-3 sm:grid-cols-2"><SensorTile icon={Thermometer} title="Temperature" value="22.6°C" /><SensorTile icon={Wind} title="Air quality" value="Good" /><SensorTile icon={Eye} title="Presence" value={sensors ? 'Detected' : 'Paused'} /><SensorTile icon={Volume2} title="Noise floor" value="31 dB" /></div><button className="mt-5 flex w-full items-center justify-center gap-2 border border-[#35434b] py-2 font-mono text-[10px] text-[#aab6b5] hover:border-[#c5ff32] hover:text-[#c5ff32]" onClick={() => notify('SENSOR CALIBRATION · BASELINE UPDATED')} data-testid="button-calibrate-sensors"><RefreshCw size={14} />CALIBRATE SENSORS</button></div>
      <div className="panel p-5 sm:p-6"><SectionLabel right={<Download size={14} className="text-[#c5ff32]" />}>Firmware & OTA</SectionLabel><div className="flex items-start gap-4 border border-[#33443d] bg-[#12201c] p-4"><div className="grid h-10 w-10 place-items-center border border-[#4a672d] text-[#c5ff32]"><Check size={18} /></div><div><div className="text-sm text-[#d3ded7]">System is up to date</div><div className="mt-1 font-mono text-[10px] text-[#718179]">CYBER//HOME OS 2.4.1 · build 8942</div></div></div><div className="mt-5 flex items-center justify-between font-mono text-[10px] text-[#6f7d85]"><span>Last check</span><span className="text-[#bdc9c2]">Today, 20:04</span></div><button className="mt-4 flex w-full items-center justify-center gap-2 border border-[#35434b] py-2.5 font-mono text-[10px] text-[#aab6b5] hover:border-[#c5ff32] hover:text-[#c5ff32]" onClick={() => notify('OTA SERVICE · NO NEW PACKAGE FOUND')} data-testid="button-check-updates"><RefreshCw size={14} />CHECK FOR UPDATES</button></div>
    </div>
  </>;
}

function SettingsRow({ title, detail, value, onClick, testId }: { title: string; detail: string; value: boolean; onClick: () => void; testId: string }) {
  return <div className="flex items-center justify-between border-b border-[#29363e] py-4 last:border-0"><div><div className="text-sm text-[#d1dcd5]">{title}</div><div className="mt-1 font-mono text-[9px] text-[#6d7b83]">{detail}</div></div><button className={`switch ${value ? 'on' : ''}`} onClick={onClick} data-testid={testId} aria-label={title} /></div>;
}

function SensorTile({ icon: Icon, title, value }: { icon: LucideIcon; title: string; value: string }) {
  return <div className="border border-[#2b3840] bg-[#121a20] p-3"><Icon size={15} className="text-[#53ddc0]" /><div className="mt-3 font-mono text-[9px] text-[#6c7b83]">{title.toUpperCase()}</div><div className="mt-1 text-sm text-[#d3ded7]">{value}</div></div>;
}

function NotFound() {
  return <div className="panel mx-auto max-w-xl p-8 text-center"><div className="tech-label">ERROR / 404</div><h1 className="mt-3 font-display text-4xl text-[#dce6e0]">Signal not found</h1><p className="mt-2 text-sm text-[#7d8a92]">That control surface does not exist in this build.</p><Link href="/" className="mt-6 inline-flex items-center gap-2 border border-[#c5ff32] px-4 py-2 font-mono text-[10px] text-[#c5ff32]" data-testid="link-back-home">RETURN TO OVERVIEW <ArrowRight size={14} /></Link></div>;
}

export default App;