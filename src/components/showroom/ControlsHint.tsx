import { MousePointer2, Move, ZoomIn } from "lucide-react";
import { KeyboardHint } from "./KeyboardHint";

export const ControlsHint = () => {
  return (
    <div className="fixed bottom-4 right-4 z-40 animate-fade-in">
      <div className="glass-panel px-4 py-3">
        <div className="flex items-center gap-5 text-xs">
          <KeyboardHint />
          <div className="w-px h-6 bg-border" />
          <div className="flex items-center gap-2">
            <Move className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Drag to look</span>
          </div>
          <div className="flex items-center gap-2">
            <ZoomIn className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Scroll to zoom</span>
          </div>
          <div className="flex items-center gap-2">
            <MousePointer2 className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Click product</span>
          </div>
        </div>
      </div>
    </div>
  );
};
