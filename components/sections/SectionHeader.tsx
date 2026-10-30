export default function SectionHeader({ index, label }: { index: string; label: string }) {
  return (
    <div data-reveal className="mb-10 flex items-center gap-5 md:mb-14">
      <span className="font-display text-sm text-silver tabular-nums">{index}</span>
      <span className="hairline w-12" />
      <span className="eyebrow">{label}</span>
    </div>
  );
}
