import { useRef } from "react";
import * as THREE from "three";

export const ShowroomEnvironment = () => {
  const floorRef = useRef<THREE.Mesh>(null);

  return (
    <group>
      {/* Main floor */}
      <mesh 
        ref={floorRef} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial 
          color="#141414"
          metalness={0.2}
          roughness={0.9}
        />
      </mesh>

      {/* Floor grid with yellow safety lines */}
      <gridHelper 
        args={[40, 40, "#2a2a2a", "#1f1f1f"]} 
        position={[0, -0.49, 0]}
      />

      {/* Safety floor markings - walkways */}
      {[
        { pos: [0, -0.48, 0], size: [1.5, 20] },
        { pos: [-6, -0.48, 0], size: [0.1, 15] },
        { pos: [6, -0.48, 0], size: [0.1, 15] },
      ].map((line, i) => (
        <mesh key={i} position={line.pos as [number, number, number]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={line.size as [number, number]} />
          <meshBasicMaterial color="#FFB800" transparent opacity={0.15} />
        </mesh>
      ))}

      {/* Back wall with company branding area */}
      <mesh position={[0, 5, -8]} receiveShadow>
        <boxGeometry args={[40, 12, 0.5]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      {/* Side walls */}
      <mesh position={[-20, 5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[25, 12, 0.5]} />
        <meshStandardMaterial color="#0f0f0f" />
      </mesh>
      <mesh position={[20, 5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[25, 12, 0.5]} />
        <meshStandardMaterial color="#0f0f0f" />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 10, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 25]} />
        <meshStandardMaterial color="#050505" />
      </mesh>

      {/* Industrial ceiling structure */}
      {[-12, -4, 4, 12].map((x, i) => (
        <group key={i}>
          <mesh position={[x, 9.5, 0]}>
            <boxGeometry args={[0.3, 0.3, 25]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Overhead lighting strips (industrial style) */}
      {[-6, 0, 6].map((x, i) => (
        <group key={i}>
          {[-4, 0, 4].map((z, j) => (
            <group key={j}>
              <mesh position={[x, 9, z]}>
                <boxGeometry args={[2, 0.1, 0.3]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
              <pointLight 
                position={[x, 8, z]} 
                intensity={0.8} 
                color="#ffffff" 
                distance={12}
                castShadow
              />
            </group>
          ))}
        </group>
      ))}

      {/* Accent lighting (safety orange) */}
      {[
        [-5, -3], [0, -3], [5, -3],
        [-5, 2], [0, 2], [5, 2]
      ].map(([x, z], i) => (
        <group key={`accent-${i}`}>
          <spotLight
            position={[x, 7, z]}
            angle={0.5}
            penumbra={0.7}
            intensity={1.5}
            color="#FFB800"
            castShadow
          />
        </group>
      ))}

      {/* Floor spot lights for products */}
      {[
        [-5, -3], [0, -3], [5, -3],
        [-5, 2], [0, 2], [5, 2]
      ].map(([x, z], i) => (
        <mesh key={`floor-light-${i}`} position={[x, -0.45, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.8, 32]} />
          <meshBasicMaterial color="#FFB800" transparent opacity={0.08} />
        </mesh>
      ))}

      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      <hemisphereLight 
        color="#ffffff" 
        groundColor="#111111" 
        intensity={0.3} 
      />

      {/* Zone dividers / pillars */}
      {[-8, 8].map((x, i) => (
        <mesh key={i} position={[x, 3, 0]}>
          <boxGeometry args={[0.3, 7, 0.3]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* Safety signage on back wall */}
      <mesh position={[0, 7, -7.7]}>
        <planeGeometry args={[8, 1.5]} />
        <meshBasicMaterial color="#FFB800" />
      </mesh>
      <mesh position={[0, 7, -7.65]}>
        <planeGeometry args={[7.8, 1.3]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Zone labels on floor */}
      {[
        { pos: [-5, -0.47, -5], text: "MACHINE GUARDING" },
        { pos: [0, -0.47, -5], text: "ACCESS CONTROL" },
        { pos: [5, -0.47, -5], text: "OPTICAL SAFETY" },
        { pos: [0, -0.47, 5], text: "AREA PROTECTION" },
      ].map((zone, i) => (
        <mesh key={i} position={zone.pos as [number, number, number]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3, 0.4]} />
          <meshBasicMaterial color="#FFB800" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
};
