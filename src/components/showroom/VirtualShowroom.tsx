import { useState, useCallback, useRef } from "react";
import { ShowroomScene } from "./ShowroomScene";
import { ShowroomHeader } from "./ShowroomHeader";
import { ProductInfoPanel } from "./ProductInfoPanel";
import { MiniMap } from "./MiniMap";
import { ControlsHint } from "./ControlsHint";
import { WelcomeOverlay } from "./WelcomeOverlay";
import { Product, ShowroomZone } from "@/types/showroom";
import { useKeyboardControls } from "@/hooks/useKeyboardControls";

export const VirtualShowroom = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeZone, setActiveZone] = useState<string | null>("entrance");
  const [targetPosition, setTargetPosition] = useState<ShowroomZone | null>(null);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, z: 10 });
  const [showWelcome, setShowWelcome] = useState(true);
  const [moveDirection, setMoveDirection] = useState<{ x: number; z: number } | null>(null);
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMove = useCallback((direction: { x: number; z: number }) => {
    setMoveDirection(direction);
    setTargetPosition(null); // Cancel any teleport animation
    
    // Clear previous timeout
    if (moveTimeoutRef.current) {
      clearTimeout(moveTimeoutRef.current);
    }
    
    // Reset direction after a short delay
    moveTimeoutRef.current = setTimeout(() => {
      setMoveDirection(null);
    }, 50);
  }, []);

  useKeyboardControls({
    onMove: handleMove,
    enabled: !showWelcome
  });

  const handleProductSelect = useCallback((product: Product | null) => {
    setSelectedProduct(product);
    setShowWelcome(false);
  }, []);

  const handleNavigate = useCallback((zone: ShowroomZone) => {
    setActiveZone(zone.id);
    setTargetPosition(zone);
    setSelectedProduct(null);
    setShowWelcome(false);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const handleCameraPositionChange = useCallback((pos: { x: number; z: number }) => {
    setPlayerPosition(pos);
  }, []);

  const handleStartExploring = useCallback(() => {
    setShowWelcome(false);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* 3D Scene */}
      <ShowroomScene
        onProductSelect={handleProductSelect}
        selectedProduct={selectedProduct}
        targetPosition={targetPosition}
        onCameraPositionChange={handleCameraPositionChange}
        moveDirection={moveDirection}
      />

      {/* UI Overlays */}
      <ShowroomHeader />
      
      {!showWelcome && (
        <>
          <MiniMap 
            onNavigate={handleNavigate} 
            activeZone={activeZone}
            playerPosition={playerPosition}
          />
          
          <ProductInfoPanel 
            product={selectedProduct} 
            onClose={handleClosePanel}
          />
          
          <ControlsHint />
        </>
      )}

      {/* Welcome overlay */}
      {showWelcome && (
        <WelcomeOverlay onStart={handleStartExploring} />
      )}
    </div>
  );
};
