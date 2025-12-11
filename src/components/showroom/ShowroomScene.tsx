import { Suspense, useRef, useCallback, useState, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { ShowroomEnvironment } from "./ShowroomEnvironment";
import { ProductDisplay } from "./ProductDisplay";
import { LoadingScreen } from "./LoadingScreen";
import { products } from "@/data/products";
import { Product, ShowroomZone } from "@/types/showroom";
import { useKeyboardControls } from "@/hooks/useKeyboardControls";

interface CameraControllerProps {
  targetPosition: ShowroomZone | null;
  onPositionChange: (pos: { x: number; z: number }) => void;
  moveDirection: { x: number; z: number } | null;
}

const CameraController = ({ targetPosition, onPositionChange, moveDirection }: CameraControllerProps) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const currentPosition = useRef(new THREE.Vector3(0, 3, 10));

  useEffect(() => {
    if (targetPosition && controlsRef.current) {
      currentTarget.current.set(...targetPosition.cameraTarget);
      currentPosition.current.set(...targetPosition.position);
    }
  }, [targetPosition]);

  useFrame(() => {
    if (!controlsRef.current) return;

    // Handle WASD movement
    if (moveDirection && (moveDirection.x !== 0 || moveDirection.z !== 0)) {
      // Get camera forward direction (ignore Y)
      const forward = new THREE.Vector3();
      camera.getWorldDirection(forward);
      forward.y = 0;
      forward.normalize();

      // Get camera right direction
      const right = new THREE.Vector3();
      right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

      // Calculate movement
      const movement = new THREE.Vector3();
      movement.addScaledVector(forward, -moveDirection.z);
      movement.addScaledVector(right, moveDirection.x);

      // Apply to camera position
      camera.position.add(movement);
      controlsRef.current.target.add(movement);

      // Boundary check
      camera.position.x = THREE.MathUtils.clamp(camera.position.x, -18, 18);
      camera.position.z = THREE.MathUtils.clamp(camera.position.z, -6, 12);
      controlsRef.current.target.x = THREE.MathUtils.clamp(controlsRef.current.target.x, -18, 18);
      controlsRef.current.target.z = THREE.MathUtils.clamp(controlsRef.current.target.z, -6, 12);
    }

    // Smooth camera transition to target
    if (targetPosition) {
      camera.position.lerp(currentPosition.current, 0.03);
      controlsRef.current.target.lerp(currentTarget.current, 0.03);
    }

    // Report position for minimap
    onPositionChange({ x: camera.position.x, z: camera.position.z });
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      enableRotate={true}
      minDistance={2}
      maxDistance={20}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.2}
      rotateSpeed={0.5}
      zoomSpeed={0.8}
    />
  );
};

interface ShowroomSceneProps {
  onProductSelect: (product: Product | null) => void;
  selectedProduct: Product | null;
  targetPosition: ShowroomZone | null;
  onCameraPositionChange: (pos: { x: number; z: number }) => void;
  moveDirection: { x: number; z: number } | null;
}

export const ShowroomScene = ({ 
  onProductSelect, 
  selectedProduct,
  targetPosition,
  onCameraPositionChange,
  moveDirection
}: ShowroomSceneProps) => {
  const handleProductSelect = useCallback((product: Product) => {
    onProductSelect(product);
  }, [onProductSelect]);

  return (
    <div className="fixed inset-0 z-0">
      <Canvas 
        shadows 
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera
            makeDefault
            position={[0, 3, 10]}
            fov={60}
            near={0.1}
            far={100}
          />
          
          <CameraController 
            targetPosition={targetPosition}
            onPositionChange={onCameraPositionChange}
            moveDirection={moveDirection}
          />

          <ShowroomEnvironment />

          {products.map((product) => (
            <ProductDisplay
              key={product.id}
              product={product}
              onSelect={handleProductSelect}
              isSelected={selectedProduct?.id === product.id}
            />
          ))}

          {/* Atmospheric fog */}
          <fog attach="fog" args={["#080808", 15, 40]} />
        </Suspense>
      </Canvas>
      <LoadingScreen />
    </div>
  );
};
