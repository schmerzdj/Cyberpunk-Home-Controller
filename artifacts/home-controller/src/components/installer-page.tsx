import { useMemo, useState } from 'react';
import { Cpu, Download, Monitor, Radio, Usb, Wifi, Zap, Check, ChevronRight, LockKeyhole } from 'lucide-react';
import { esp32Boards, type ESP32Board } from '@/data/esp32-boards';

const manufacturers = ['All', 'Sunton', 'HiWonder', 'JC', 'Espressif', 'Wireless Tag', 'LilyGO', 'Makerfabs', 'Waveshare', 'Elecrow'];

export function InstallerPage({ notify }: { notify: (message: string) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');
  const [flashStep, setFlashStep] = useState(0);

  const filtered = useMemo(
    () => (filter === 'All' ? esp32Boards : esp32Boards.filter((b) => b.manufacturer === filter)),
    [filter],
  );
  const selected = esp32Boards.find((b) => b.id === selectedId) ?? null;

  const installSteps = [
    { icon: Usb, title: 'Connect via USB', detail: 'Plug the board into your computer. Hold BOOT if the port does not appear.' },
    { icon: Download, title: 'Erase flash', detail: 'Wipe any existing firmware to avoid partition conflicts.' },
    { icon: Cpu, title: 'Flash firmware', detail: 'Write the CYBER//HOME binary to the board at the correct address.' },
    { icon: Wifi, title: 'Provision Wi-Fi', detail: 'Board enters AP mode. Connect and enter your network credentials.' },
    { icon: Check, title: 'Panel online', detail: 'Dashboard appears on the screen. Touch input is live.' },
  ];

  const handleFlash = () => {
    if (!selected) return;
    setFlashStep(0);
    const interval = window.setInterval(() => {
      setFlashStep((step) => {
        if (step >= installSteps.length - 1) {
          window.clearInterval(interval);
          notify(`FLASH COMPLETE · ${selected.model} ONLINE`);
          return step;
        }
        return step + 1;
      });
    }, 900);
  };

  return (
    <>
      <PageHeading
        eyebrow="Installer / ESP32 HMI flash"
        title="Device installer"
        detail="Flash CYBER//HOME onto any supported ESP32 HMI board. Select your hardware to begin."
      />

      {/* Manufacturer filter */}
      <div className="mb-5 flex flex-wrap gap-2">
        {manufacturers.map((mfr) => (
          <button
            key={mfr}
            onClick={() => setFilter(mfr)}
            className={`border px-3 py-1.5 font-mono text-[9px] tracking-wider transition ${filter === mfr ? 'border-[#c5ff32] bg-[#c5ff32]/10 text-[#c5ff32]' : 'border-[#2b3840] text-[#87949d] hover:border-[#54636c]'}`}
          >
            {mfr.toUpperCase()}
          </button>
        ))}
        <span className="ml-auto self-center font-mono text-[9px] text-[#5d6b73]">{filtered.length} BOARDS</span>
      </div>

      {/* Board grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((board) => (
          <BoardCard
            key={board.id}
            board={board}
            selected={board.id === selectedId}
            onSelect={() => { setSelectedId(board.id); setFlashStep(0); notify(`SELECTED · ${board.model}`); }}
          />
        ))}
      </div>

      {/* Install panel */}
      {selected && (
        <div className="mt-6 panel panel-cut overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#29343d] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center border border-[#3a4a42] text-[#c5ff32]">
                <Cpu size={18} />
              </div>
              <div>
                <div className="font-display text-lg text-[#dfe8e4]">{selected.model}</div>
                <div className="font-mono text-[9px] text-[#6e7b84]">{selected.manufacturer.toUpperCase()} · {selected.resolution} · {selected.touchType.toUpperCase()}</div>
              </div>
            </div>
            <span className="hidden font-mono text-[9px] text-[#c5ff32] sm:block">READY TO FLASH</span>
          </div>

          {/* Specs row */}
          <div className="grid grid-cols-2 gap-px bg-[#29343d] sm:grid-cols-4 lg:grid-cols-6">
            <SpecCell label="Screen" value={selected.screenSize} />
            <SpecCell label="Resolution" value={selected.resolution} />
            <SpecCell label="Touch" value={selected.touchType} />
            <SpecCell label="Driver" value={selected.driverIC} />
            <SpecCell label="Flash" value={selected.flash} />
            <SpecCell label="PSRAM" value={selected.psram} />
          </div>

          {/* Screen preview */}
          <div className="flex flex-col items-center gap-4 px-5 py-6 sm:flex-row sm:items-start">
            <div className="shrink-0">
              <div className="mb-2 text-center font-mono text-[8px] text-[#5d6b73]">SCREEN PREVIEW</div>
              <div
                className="relative border-2 border-[#3a4a42] bg-[#0d1116]"
                style={{
                  width: selected.aspectRatio >= 1 ? 140 : 140 * selected.aspectRatio,
                  height: selected.aspectRatio >= 1 ? 140 / selected.aspectRatio : 140,
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                  <Monitor size={20} className="text-[#3a4a42]" />
                  <span className="font-mono text-[7px] text-[#3a4a42]">{selected.resolution}</span>
                </div>
                <div className="absolute left-1 top-1 h-1 w-1 rounded-full bg-[#c5ff32] opacity-60" />
              </div>
            </div>

            {/* Flash steps */}
            <div className="min-w-0 flex-1">
              <div className="mb-3 tech-label">Flash sequence / {selected.mcu}</div>
              <div className="space-y-1.5">
                {installSteps.map((step, i) => {
                  const done = i < flashStep;
                  const active = i === flashStep;
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-3 border p-2.5 transition ${active ? 'border-[#c5ff32] bg-[#c5ff32]/8' : done ? 'border-[#3a4a42] opacity-50' : 'border-[#29343d]'}`}
                    >
                      <div className={`grid h-7 w-7 shrink-0 place-items-center border ${active ? 'border-[#c5ff32] text-[#c5ff32]' : done ? 'border-[#3a4a42] text-[#c5ff32]' : 'border-[#37454e] text-[#70808a]'}`}>
                        {done ? <Check size={14} /> : <step.icon size={13} />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className={`text-xs ${active || done ? 'text-[#d4ded8]' : 'text-[#829099]'}`}>{step.title}</div>
                        <div className="font-mono text-[8px] text-[#6e7b84]">{step.detail}</div>
                      </div>
                      {active && <Zap size={13} className="shrink-0 text-[#c5ff32] pulse" />}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleFlash}
                  disabled={flashStep > 0 && flashStep < installSteps.length - 1}
                  className="flex flex-1 items-center justify-center gap-2 border border-[#c5ff32] bg-[#c5ff32] py-2.5 font-mono text-[10px] text-[#111820] transition hover:bg-[#d7ff69] disabled:opacity-40"
                >
                  <Zap size={14} />{flashStep === installSteps.length - 1 ? 'RE-FLASH' : 'FLASH FIRMWARE'}
                </button>
                <button
                  onClick={() => notify('CONFIG EXPORTED · platformio.ini')}
                  className="flex items-center gap-2 border border-[#35434b] px-3 py-2.5 font-mono text-[10px] text-[#aab6b5] hover:border-[#c5ff32] hover:text-[#c5ff32]"
                >
                  <Download size={14} />CONFIG
                </button>
              </div>
            </div>
          </div>

          {/* Code snippet */}
          <div className="border-t border-[#29343d] bg-[#0b0f14] p-5">
            <div className="mb-2 tech-label">esptool command</div>
            <pre className="overflow-x-auto font-mono text-[10px] leading-relaxed text-[#7eb84a]">
{`esptool.py --chip ${selected.mcu.includes('S3') ? 'esp32s3' : 'esp32'} \\
  --port /dev/ttyUSB0 --baud 921600 \\
  write_flash -z 0x0 cyberhome_${selected.id}.bin`}
            </pre>
          </div>

          {selected.notes && (
            <div className="flex items-center gap-2 border-t border-[#29343d] px-5 py-3 font-mono text-[9px] text-[#53ddc0]">
              <Radio size={12} />{selected.notes}
            </div>
          )}
        </div>
      )}
    </>
  );
}

function BoardCard({ board, selected, onSelect }: { board: ESP32Board; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      data-testid={`button-board-${board.id}`}
      className={`group relative flex flex-col border p-3 text-left transition ${selected ? 'border-[#c5ff32] bg-[#c5ff32]/8' : 'border-[#2b3840] hover:border-[#54636c]'}`}
    >
      {/* Mini screen preview */}
      <div className="mb-3 flex h-16 items-center justify-center">
        <div
          className={`relative border ${selected ? 'border-[#c5ff32]/40' : 'border-[#3a4a42]'} bg-[#0d1116]`}
          style={{
            width: board.aspectRatio >= 1 ? 56 : 56 * board.aspectRatio,
            height: board.aspectRatio >= 1 ? 56 / board.aspectRatio : 56,
          }}
        >
          <div className="absolute left-0.5 top-0.5 h-0.5 w-0.5 rounded-full bg-[#c5ff32] opacity-70" />
          {board.touchType !== 'None' && (
            <div className="absolute bottom-0.5 right-0.5">
              <LockKeyhole size={6} className="text-[#3a4a42]" />
            </div>
          )}
        </div>
      </div>

      <div className={`text-xs leading-tight ${selected ? 'text-[#c5ff32]' : 'text-[#d1dbd6]'}`}>{board.model}</div>
      <div className="mt-1 font-mono text-[8px] text-[#6e7b84]">{board.screenSize} · {board.resolution}</div>
      <div className="mt-1 flex items-center gap-1.5">
        <span className={`font-mono text-[7px] ${board.touchType === 'Capacitive' ? 'text-[#53ddc0]' : board.touchType === 'Resistive' ? 'text-[#c5ff32]' : 'text-[#6e7b84]'}`}>
          {board.touchType === 'None' ? 'NO TOUCH' : board.touchType.toUpperCase()}
        </span>
        <ChevronRight size={10} className={`ml-auto ${selected ? 'text-[#c5ff32]' : 'text-[#46545d]'} group-hover:text-[#c5ff32]`} />
      </div>
    </button>
  );
}

function SpecCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#111920] p-3">
      <div className="font-mono text-[8px] text-[#6e7b84]">{label.toUpperCase()}</div>
      <div className="mt-1 text-xs text-[#d4ded8]">{value}</div>
    </div>
  );
}

function PageHeading({ eyebrow, title, detail }: { eyebrow: string; title: string; detail: string }) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-[#29343d] pb-5">
      <div>
        <div className="mb-2 flex items-center gap-2 tech-label"><span className="status-dot" />{eyebrow}</div>
        <h1 className="glitch-text font-display text-4xl tracking-[.04em] text-[#e1e9e3] sm:text-5xl" data-text={title}>{title}</h1>
        <p className="mt-2 max-w-xl text-sm text-[#7f8b94]">{detail}</p>
      </div>
    </div>
  );
}
