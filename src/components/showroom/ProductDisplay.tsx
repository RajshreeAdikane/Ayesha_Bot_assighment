import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { Product } from "@/types/showroom";

interface ProductDisplayProps {
  product: Product;
  onSelect: (product: Product) => void;
  isSelected: boolean;
}

// Generate a simple fence/panel mesh based on product type
const ProductMesh = ({ product, hovered }: { product: Product; hovered: boolean }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const emissiveIntensity = hovered ? 0.4 : 0.1;

  // Different 3D representations based on product category
  if (product.category === "Machine Guarding" || product.category === "Area Separation") {
    // Mesh panel representation
    return (
      <group ref={meshRef}>
        {/* Frame */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.8, 1, 0.05]} />
          <meshStandardMaterial 
            color={product.color}
            metalness={0.7}
            roughness={0.3}
            emissive={product.color}
            emissiveIntensity={emissiveIntensity}
          />
        </mesh>
        {/* Mesh grid lines */}
        {[-0.3, -0.1, 0.1, 0.3].map((x, i) => (
          <mesh key={`v${i}`} position={[x, 0.5, 0.03]}>
            <boxGeometry args={[0.02, 0.9, 0.02]} />
            <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
        {[0.2, 0.4, 0.6, 0.8].map((y, i) => (
          <mesh key={`h${i}`} position={[0, y, 0.03]}>
            <boxGeometry args={[0.7, 0.02, 0.02]} />
            <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>
    );
  }

  if (product.category === "Access Control") {
    // Safety door representation
    return (
      <group ref={meshRef}>
        <RoundedBox args={[0.6, 1.2, 0.08]} radius={0.02} position={[0, 0.6, 0]}>
          <meshStandardMaterial 
            color={product.color}
            metalness={0.6}
            roughness={0.4}
            emissive={product.color}
            emissiveIntensity={emissiveIntensity}
          />
        </RoundedBox>
        {/* Handle */}
        <mesh position={[0.2, 0.6, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.15]} />
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Warning stripe */}
        <mesh position={[0, 1.1, 0.05]}>
          <boxGeometry args={[0.5, 0.08, 0.01]} />
          <meshStandardMaterial color="#FFB800" />
        </mesh>
      </group>
    );
  }

  if (product.category === "Optical Safety") {
    // Light curtain representation
    return (
      <group ref={meshRef}>
        <RoundedBox args={[0.15, 1, 0.1]} radius={0.02} position={[-0.3, 0.5, 0]}>
          <meshStandardMaterial 
            color="#222"
            metalness={0.8}
            roughness={0.2}
          />
        </RoundedBox>
        <RoundedBox args={[0.15, 1, 0.1]} radius={0.02} position={[0.3, 0.5, 0]}>
          <meshStandardMaterial 
            color="#222"
            metalness={0.8}
            roughness={0.2}
          />
        </RoundedBox>
        {/* Light beams */}
        {[0.2, 0.4, 0.6, 0.8].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <boxGeometry args={[0.45, 0.01, 0.01]} />
            <meshBasicMaterial color={product.color} transparent opacity={hovered ? 0.8 : 0.4} />
          </mesh>
        ))}
      </group>
    );
  }

  if (product.category === "Safety Interlocks") {
    // Safety lock representation
    return (
      <group ref={meshRef}>
        <RoundedBox args={[0.25, 0.4, 0.15]} radius={0.02} position={[0, 0.4, 0]}>
          <meshStandardMaterial 
            color={product.color}
            metalness={0.7}
            roughness={0.3}
            emissive={product.color}
            emissiveIntensity={emissiveIntensity}
          />
        </RoundedBox>
        {/* Actuator */}
        <mesh position={[0.2, 0.4, 0]}>
          <boxGeometry args={[0.08, 0.15, 0.08]} />
          <meshStandardMaterial color="#FFB800" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* LED indicator */}
        <mesh position={[0, 0.55, 0.08]}>
          <sphereGeometry args={[0.02]} />
          <meshBasicMaterial color="#22C55E" />
        </mesh>
      </group>
    );
  }

  if (product.category === "Area Protection") {
    // Safety scanner representation
    return (
      <group ref={meshRef}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.2, 0.25, 0.3, 32]} />
          <meshStandardMaterial 
            color="#222"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Scanning dome */}
        <mesh position={[0, 0.35, 0]}>
          <sphereGeometry args={[0.15, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial 
            color={product.color}
            metalness={0.3}
            roughness={0.5}
            transparent
            opacity={0.7}
            emissive={product.color}
            emissiveIntensity={emissiveIntensity}
          />
        </mesh>
        {/* Scan field indicator */}
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.3, 0.8, 32, 1, 0, Math.PI * 1.5]} />
          <meshBasicMaterial 
            color={product.color} 
            transparent 
            opacity={hovered ? 0.3 : 0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    );
  }

  // Default box
  return (
    <group ref={meshRef}>
      <RoundedBox args={[0.6, 0.6, 0.6]} radius={0.05} position={[0, 0.5, 0]}>
        <meshStandardMaterial 
          color={product.color}
          metalness={0.5}
          roughness={0.4}
          emissive={product.color}
          emissiveIntensity={emissiveIntensity}
        />
      </RoundedBox>
    </group>
  );
};

export const ProductDisplay = ({ product, onSelect, isSelected }: ProductDisplayProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (glowRef.current) {
      const intensity = (hovered || isSelected) ? 0.8 : 0.3;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
      glowRef.current.scale.setScalar(scale);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = intensity;
    }
  });

  return (
    <group
      ref={groupRef}
      position={product.position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(product);
      }}
      onPointerEnter={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerLeave={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* Pedestal base */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.7, 0.2, 32]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Product mesh */}
      <group position={[0, 0.1, 0]}>
        <ProductMesh product={product} hovered={hovered || isSelected} />
      </group>

      {/* Glow ring */}
      <mesh 
        ref={glowRef}
        position={[0, 0, 0]} 
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.7, 0.9, 32]} />
        <meshBasicMaterial 
          color={product.color}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Label */}
      <Html
        position={[0, 1.8, 0]}
        center
        distanceFactor={10}
        style={{ pointerEvents: "none" }}
      >
        <div 
          className={`
            px-3 py-1.5 rounded-full glass-panel text-xs font-medium
            transition-all duration-300 whitespace-nowrap border
            ${hovered || isSelected 
              ? "opacity-100 scale-100 border-primary/50" 
              : "opacity-70 scale-90 border-transparent"
            }
          `}
        >
          <span className="text-foreground">{product.name}</span>
        </div>
      </Html>

      {/* Hotspot indicator */}
      <mesh position={[0.5, 1.2, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial 
          color={product.color}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh position={[0.5, 1.2, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial 
          color={product.color}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};
