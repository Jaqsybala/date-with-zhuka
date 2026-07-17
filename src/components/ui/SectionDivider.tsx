export function SectionDivider() {
  return (
    <div
      className="relative py-10 bg-gradient-to-b from-warm-100 to-warm-50 dark:from-stone-900 dark:to-warm-900"
      aria-hidden="true"
    >
      <div className="max-w-xs mx-auto flex items-center gap-4 px-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-primary/30 to-rose-primary/50 dark:via-rose-primary/20 dark:to-rose-primary/40" />
        <span className="text-rose-primary/50 dark:text-rose-primary/40 text-sm select-none">❤️</span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-rose-primary/30 to-rose-primary/50 dark:via-rose-primary/20 dark:to-rose-primary/40" />
      </div>
    </div>
  );
}
