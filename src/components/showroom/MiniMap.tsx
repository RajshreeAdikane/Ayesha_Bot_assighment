import { ShowroomZone } from "@/types/showroom";
import { showroomZones, products } from "@/data/products";
import { MapPin, Navigation, User } from "lucide-react";

interface MiniMapProps {
  onNavigate: (zone: ShowroomZone) => void;
  activeZone: string | null;
  playerPosition: { x: number; z: number };
}

export const MiniMap = ({ onNavigate, activeZone, playerPosition }: MiniMapProps) => {
  // Convert world position to map position
  const mapWidth = 180;
  const mapHeight = 140;
  const worldSize = { x: 24, z: 20 };
  
  const worldToMap = (x: number, z: number) => ({
    x: ((x + worldSize.x / 2) / worldSize.x) * mapWidth,
    y: ((z + worldSize.z / 2) / worldSize.z) * mapHeight,
  });

  const playerMapPos = worldToMap(playerPosition.x, playerPosition.z);

  return (
    <div className="fixed left-4 bottom-4 z-40 animate-fade-in">
      <div className="glass-panel p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold">Floor Map</h3>
          <span className="text-[10px] text-muted-foreground ml-auto">Click to teleport</span>
        </div>

        {/* Map visualization */}
        <div 
          className="relative bg-secondary/50 rounded-lg overflow-hidden border border-border/30"
          style={{ width: mapWidth, height: mapHeight }}
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 grid-rows-6 h-full">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-foreground/20" />
              ))}
            </div>
          </div>

          {/* Safety walkway lines */}
          <div 
            className="absolute bg-primary/20 left-1/2 -translate-x-1/2"
            style={{ width: 8, height: '100%' }}
          />

          {/* Product positions */}
          {products.map((product) => {
            const pos = worldToMap(product.position[0], product.position[2]);
            return (
              <div
                key={product.id}
                className="absolute w-2.5 h-2.5 rounded-sm transition-all duration-300"
                style={{
                  left: pos.x,
                  top: pos.y,
                  backgroundColor: product.color,
                  transform: "translate(-50%, -50%)",
                  boxShadow: `0 0 6px ${product.color}`,
                }}
                title={product.name}
              />
            );
          })}

          {/* Zone click areas */}
          {showroomZones.slice(1).map((zone) => {
            const pos = worldToMap(zone.cameraTarget[0], zone.cameraTarget[2]);
            return (
              <button
                key={zone.id}
                onClick={() => onNavigate(zone)}
                className={`
                  absolute w-5 h-5 rounded-full flex items-center justify-center
                  transition-all duration-300 hover:scale-125 border
                  ${activeZone === zone.id 
                    ? "bg-primary border-primary shadow-glow" 
                    : "bg-card/80 border-border/50 hover:border-primary/50"
                  }
                `}
                style={{
                  left: pos.x,
                  top: pos.y,
                  transform: "translate(-50%, -50%)",
                }}
                title={zone.name}
              >
                <MapPin className="w-2.5 h-2.5" />
              </button>
            );
          })}

          {/* Player position indicator */}
          <div
            className="absolute w-4 h-4 rounded-full bg-accent border-2 border-foreground flex items-center justify-center transition-all duration-150"
            style={{
              left: playerMapPos.x,
              top: playerMapPos.y,
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 10px hsl(var(--accent))",
            }}
          >
            <User className="w-2 h-2 text-accent-foreground" />
          </div>
        </div>

        {/* Zone buttons */}
        <div className="grid grid-cols-2 gap-1.5">
          {showroomZones.slice(1).map((zone) => (
            <button
              key={zone.id}
              onClick={() => onNavigate(zone)}
              className={`
                text-left px-2 py-1.5 rounded text-[11px] font-medium
                transition-all duration-200 truncate
                ${activeZone === zone.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }
              `}
            >
              {zone.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
