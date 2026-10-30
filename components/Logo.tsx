export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 text-ink ${className}`}>
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.75" />
        <path d="M12 1.5a10.5 10.5 0 1 0 0 21 13 13 0 0 1 0-21z" fill="currentColor" fillOpacity="0.92" />
      </svg>
      <span className="flex items-baseline gap-2">
        <span className="font-display text-[1.45rem] leading-none tracking-[0.02em] text-ink">Lunare</span>
        <span className="text-[0.625rem] font-medium tracking-[0.34em] text-mist uppercase">Global</span>
      </span>
    </span>
  );
}
