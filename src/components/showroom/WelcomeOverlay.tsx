import { ArrowRight, Keyboard, Mouse, Map } from "lucide-react";

interface WelcomeOverlayProps {
  onStart: () => void;
}

export const WelcomeOverlay = ({ onStart }: WelcomeOverlayProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel-glow p-8 max-w-lg mx-4 text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Welcome to the <span className="text-gradient">Virtual Showroom</span>
          </h2>
          <p className="text-muted-foreground">
            Explore our industrial safety solutions in an immersive 3D experience
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 py-4">
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center mx-auto border border-border/30">
              <Keyboard className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-foreground font-medium">WASD</span> or Arrow keys to move
            </p>
          </div>
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center mx-auto border border-border/30">
              <Mouse className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-foreground font-medium">Click & drag</span> to look around
            </p>
          </div>
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center mx-auto border border-border/30">
              <Map className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-foreground font-medium">Floor map</span> for quick access
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Click on any product to view detailed specifications and documentation
        </p>

        <button 
          onClick={onStart}
          className="btn-primary-glow inline-flex items-center gap-2 text-base"
        >
          Start Exploring
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
