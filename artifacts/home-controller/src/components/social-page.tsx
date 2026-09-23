import { type LucideIcon, RefreshCw, ChevronRight, Heart, Repeat2, Eye, MessageCircle, ThumbsUp, Clock, Play } from 'lucide-react';
import { PageHeading, SectionLabel } from './shared';

type Platform = 'X' | 'Facebook' | 'YouTube' | 'Gmail';

type FeedItem = {
  id: string;
  author: string;
  handle: string;
  time: string;
  content: string;
  metric: string;
  metricLabel: string;
  badge?: string;
};

type PlatformConfig = {
  eyebrow: string;
  title: string;
  detail: string;
  items: FeedItem[];
  accent: string;
  metricIcon: LucideIcon;
};

const platformConfig: Record<Platform, PlatformConfig> = {
  X: {
    eyebrow: 'X / Signal stream',
    title: 'X feed',
    detail: 'A quick social readout for the wall panel.',
    accent: '#c5ff32',
    metricIcon: Heart,
    items: [
      { id: '1', author: 'Smart Home Digest', handle: '@smarthome', time: '12m', content: 'New Matter 1.4 spec drops — multi-admin fabric is here. Thread border routers just got a lot more interesting.', metric: '1.2K', metricLabel: 'likes', badge: 'TECH' },
      { id: '2', author: 'Local Weather Watch', handle: '@weatherbot', time: '34m', content: 'Light rain expected through 23:00. Wind shifting NW at 12 km/h. Consider closing east-facing blinds.', metric: '89', metricLabel: 'likes' },
      { id: '3', author: 'Alex Rivera', handle: '@alex', time: '1h', content: 'Weekend project: rewired the JC4827W543 with a custom MQTT bridge. Panel latency dropped to 40ms. Thread incoming.', metric: '45', metricLabel: 'likes', badge: 'SAVED' },
      { id: '4', author: 'Home Assistant', handle: '@homeassistant', time: '2h', content: '2026.9 release notes: new dashboard energy cards, improved BLE proxy range, and a long-awaited fix for Zigbee group state desync.', metric: '3.4K', metricLabel: 'likes' },
      { id: '5', author: 'Cyberpunk Design', handle: '@cyberdesign', time: '4h', content: 'Neon-lime instrument panels are the new brutalist. Less is more, but glow is everything.', metric: '672', metricLabel: 'likes' },
    ],
  },
  Facebook: {
    eyebrow: 'Facebook / Household',
    title: 'Facebook',
    detail: 'Household updates and shared community signals.',
    accent: '#63a3ff',
    metricIcon: ThumbsUp,
    items: [
      { id: '1', author: 'Mira Rivera', handle: 'Family', time: '8m', content: 'Shared a photo from the garden — tomatoes are finally ripening! 🍅', metric: '12', metricLabel: 'reactions' },
      { id: '2', author: 'Neighbourhood Watch', handle: 'Community', time: '45m', content: '2 new posts: package theft reported on Oak Street. Keep deliveries inside after 6 PM.', metric: '34', metricLabel: 'reactions', badge: 'ALERT' },
      { id: '3', author: 'Family Group', handle: 'Family', time: '2h', content: 'Dinner plans for Saturday — thinking Thai. Mira says yes, Alex says maybe. Vote below.', metric: '8', metricLabel: 'reactions' },
      { id: '4', author: 'Local Events', handle: 'Community', time: '5h', content: 'Community electronics recycling this Saturday at the community centre. 9 AM to 1 PM.', metric: '56', metricLabel: 'reactions' },
      { id: '5', author: 'Mira Rivera', handle: 'Family', time: '8h', content: 'School holiday calendar updated — next week is a half-term. Check the family calendar for pick-up changes.', metric: '5', metricLabel: 'reactions' },
    ],
  },
  YouTube: {
    eyebrow: 'YouTube / Media queue',
    title: 'YouTube',
    detail: 'Your watch queue, ready for the lounge display.',
    accent: '#ff795e',
    metricIcon: Eye,
    items: [
      { id: '1', author: 'Ambient Worlds', handle: 'Lounge display', time: '4K · 2:14:30', content: 'Ambient cyberpunk workspace — neon rain cityscape loop. Perfect for focus sessions.', metric: '1.2M', metricLabel: 'views', badge: 'NOW PLAYING' },
      { id: '2', author: 'DIY Tech with Sam', handle: 'Watch later', time: '1080p · 18:42', content: 'Weekend repair guide: fixing a blank JC4827W543 panel — backlight replacement walkthrough.', metric: '89K', metricLabel: 'views' },
      { id: '3', author: 'Smart Home Solver', handle: 'Saved', time: '4K · 24:15', content: 'Complete smart home setup with Home Assistant + Matter + Thread — 2026 edition.', metric: '245K', metricLabel: 'views' },
      { id: '4', author: 'Tech Audit', handle: 'Watch later', time: '1080p · 12:08', content: 'I lived with a cyberpunk wall panel for 30 days — full review of the JC4827W543.', metric: '67K', metricLabel: 'views' },
      { id: '5', author: 'Lo-Fi Beats', handle: 'Lounge display', time: '4K · 1:00:00', content: 'Synthwave study mix — retro-future ambient beats for deep work sessions.', metric: '890K', metricLabel: 'views' },
    ],
  },
  Gmail: {
    eyebrow: 'Gmail / Inbox signal',
    title: 'Gmail',
    detail: 'Important messages surfaced without leaving the controller.',
    accent: '#53ddc0',
    metricIcon: Clock,
    items: [
      { id: '1', author: 'DHL Express', handle: 'Inbox', time: '14:02', content: 'Delivery update · Your package is arriving tomorrow between 10 AM and 1 PM. Track shipment.', metric: 'Priority', metricLabel: 'label', badge: 'SHIPPING' },
      { id: '2', author: 'Energy Provider', handle: 'Inbox', time: '09:30', content: 'Monthly statement available — your usage was 12% lower than last month. View statement PDF.', metric: 'Statement', metricLabel: 'label' },
      { id: '3', author: 'School Office', handle: 'Inbox', time: 'Yesterday', content: 'School calendar for next week — half-term schedule attached. Pick-up times change on Wednesday.', metric: 'School', metricLabel: 'label', badge: 'IMPORTANT' },
      { id: '4', author: 'GitHub', handle: 'Updates', time: 'Yesterday', content: 'Security alert: a new version of esbuild is available. 3 dependencies have updates pending.', metric: 'Security', metricLabel: 'label' },
      { id: '5', author: 'Mira Rivera', handle: 'Inbox', time: '2 days', content: 'Can you check the front camera when you get home? I think I left a package on the porch.', metric: 'Personal', metricLabel: 'label' },
    ],
  },
};

export function SocialPage({
  platform,
  icon: Icon,
  notify,
}: {
  platform: Platform;
  icon: LucideIcon;
  notify: (message: string) => void;
}) {
  const config = platformConfig[platform];

  return (
    <>
      <PageHeading
        eyebrow={config.eyebrow}
        title={config.title}
        detail={config.detail}
        action={
          <button
            className="flex items-center gap-2 border border-[#35434b] px-3 py-2 font-mono text-[10px] text-[#aab6b5] hover:border-[#c5ff32] hover:text-[#c5ff32]"
            onClick={() => notify(`${platform.toUpperCase()} · REFRESH REQUESTED`)}
            data-testid={`button-refresh-${platform.toLowerCase()}`}
          >
            <RefreshCw size={14} />
            REFRESH
          </button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
        <div className="panel overflow-hidden hc-fade-in">
          <div className="flex items-center gap-3 border-b border-[#29363e] p-5">
            <div
              className="grid h-10 w-10 place-items-center border"
              style={{ borderColor: `${config.accent}55`, color: config.accent }}
            >
              <Icon size={19} />
            </div>
            <div>
              <div className="text-sm text-[#d8e3dc]">Local preview / {platform}</div>
              <div className="font-mono text-[9px] text-[#718089]">
                ACCOUNT LINK READY · AUTH NOT CONNECTED
              </div>
            </div>
            <span className="ml-auto status-dot" />
          </div>
          <div className="divide-y divide-[#27343c]">
            {config.items.map((item, index) => (
              <button
                key={item.id}
                className="social-feed-item flex w-full items-start gap-3 p-4 text-left"
                onClick={() =>
                  notify(`${platform.toUpperCase()} · OPENED ITEM ${String(index + 1).padStart(2, '0')}`)
                }
                data-testid={`button-${platform.toLowerCase()}-item-${index}`}
              >
                <div
                  className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center border font-display text-xs"
                  style={{ borderColor: `${config.accent}44`, color: config.accent }}
                >
                  {item.author.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm text-[#d2ddd6]">{item.author}</span>
                    <span className="shrink-0 font-mono text-[9px] text-[#6f7c84]">{item.handle}</span>
                    <span className="ml-auto shrink-0 font-mono text-[9px] text-[#56646d]">{item.time}</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-[#9ba8a4]">{item.content}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="flex items-center gap-1 font-mono text-[9px]" style={{ color: config.accent }}>
                      <config.metricIcon size={11} />
                      {item.metric} {item.metricLabel}
                    </span>
                    {item.badge && (
                      <span
                        className="border px-1.5 py-0.5 font-mono text-[8px]"
                        style={{ borderColor: `${config.accent}44`, color: config.accent }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight size={15} className="mt-2 shrink-0 text-[#67767e]" />
              </button>
            ))}
          </div>
        </div>
        <div className="panel p-5 hc-fade-in">
          <SectionLabel right={<span className="font-mono text-[9px] text-[#53616b]">INTEGRATION</span>}>
            Connection status
          </SectionLabel>
          <div className="border border-dashed border-[#3c4b53] bg-[#111920] p-5 text-center">
            <Icon size={25} className="mx-auto text-[#53ddc0]" />
            <div className="mt-3 text-sm text-[#d2ddd6]">Ready to connect</div>
            <div className="mt-1 font-mono text-[9px] leading-relaxed text-[#6e7b84]">
              This page is a local controller surface. Connect the account integration to load live
              content.
            </div>
            <button
              className="mt-5 border border-[#c5ff32] px-4 py-2 font-mono text-[10px] text-[#c5ff32] hover:bg-[#c5ff32] hover:text-[#111820]"
              onClick={() => notify(`${platform.toUpperCase()} · INTEGRATION SETUP REQUIRED`)}
              data-testid={`button-connect-${platform.toLowerCase()}`}
            >
              CONNECT ACCOUNT
            </button>
          </div>
          <div className="mt-4 border border-[#2b3840] bg-[#121a20] p-3">
            <div className="tech-label">Cached items</div>
            <div className="mt-2 font-display text-2xl text-[#d3ded7]">{config.items.length}</div>
            <div className="font-mono text-[9px] text-[#6e7b84]">LOCAL CACHE / OFFLINE READY</div>
          </div>
        </div>
      </div>
    </>
  );
}
