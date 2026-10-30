/** Brand lockup: thin gold crescent, spaced serif capitals, GLOBAL beneath. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="text-gold">
        <path d="M9.07 2.44A10 10 0 1 0 21.56 14.93A9.15 9.15 0 1 1 9.07 2.44Z" fill="currentColor" />
      </svg>
      <span className="flex flex-col items-center leading-none">
        <span className="font-display text-[1.2rem] font-medium tracking-[0.16em] text-ink">LUNARE</span>
        <span className="mt-[3px] pl-[0.5em] text-[0.5rem] font-medium tracking-[0.5em] text-mist">GLOBAL</span>
      </span>
    </span>
  );
}
