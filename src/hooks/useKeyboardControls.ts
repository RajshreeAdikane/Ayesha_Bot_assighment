import { useEffect, useCallback } from "react";

interface KeyboardControlsProps {
  onMove: (direction: { x: number; z: number }) => void;
  enabled: boolean;
}

export const useKeyboardControls = ({ onMove, enabled }: KeyboardControlsProps) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;
    
    const moveSpeed = 0.5;
    let x = 0;
    let z = 0;

    switch (event.key.toLowerCase()) {
      case 'w':
      case 'arrowup':
        z = -moveSpeed;
        break;
      case 's':
      case 'arrowdown':
        z = moveSpeed;
        break;
      case 'a':
      case 'arrowleft':
        x = -moveSpeed;
        break;
      case 'd':
      case 'arrowright':
        x = moveSpeed;
        break;
      default:
        return;
    }

    event.preventDefault();
    onMove({ x, z });
  }, [onMove, enabled]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};
