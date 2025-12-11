import { useProgress } from "@react-three/drei";

export const LoadingScreen = () => {
  const { progress, active } = useProgress();

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient">
            SAFETY SHOWROOM
          </h1>
          <p className="text-muted-foreground text-lg">
            Loading virtual experience...
          </p>
        </div>
        
        <div className="w-64 md:w-80 space-y-3">
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full loading-bar rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {Math.round(progress)}% loaded
          </p>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
          <span>Preparing 3D environment</span>
        </div>
      </div>
    </div>
  );
};
