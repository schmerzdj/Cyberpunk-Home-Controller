import { type ReactNode } from 'react';

export function PageHeading({
  eyebrow,
  title,
  detail,
  action,
}: {
  eyebrow: string;
  title: string;
  detail: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#29343d] pb-5 sm:flex-row sm:items-end">
      <div>
        <div className="mb-2 flex items-center gap-2 tech-label">
          <span className="status-dot" />
          {eyebrow}
        </div>
        <h1 className="font-display text-4xl tracking-[.04em] text-[#e1e9e3] sm:text-5xl">{title}</h1>
        <p className="mt-2 max-w-xl text-sm text-[#7f8b94]">{detail}</p>
      </div>
      {action}
    </div>
  );
}

export function SectionLabel({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="tech-label">{children}</div>
      {right}
    </div>
  );
}
