export const KeyboardHint = () => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex flex-col items-center gap-0.5">
        <kbd className="px-1.5 py-0.5 text-[10px] bg-secondary rounded border border-border">W</kbd>
        <div className="flex gap-0.5">
          <kbd className="px-1.5 py-0.5 text-[10px] bg-secondary rounded border border-border">A</kbd>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-secondary rounded border border-border">S</kbd>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-secondary rounded border border-border">D</kbd>
        </div>
      </div>
      <span className="text-muted-foreground text-xs ml-1">Move</span>
    </div>
  );
};
