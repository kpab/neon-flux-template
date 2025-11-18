'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Animated building component
function Building({ position, height, color }: { position: [number, number, number]; height: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, height, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

// City grid component
function CityGrid() {
  const buildings = useMemo(() => {
    const temp = [];
    const colors = ['#FF10F0', '#00FFF0', '#B026FF', '#00D4FF'];

    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if (Math.random() > 0.3) {
          const x = (i - 10) * 3;
          const z = (j - 10) * 3;
          const height = Math.random() * 5 + 1;
          const color = colors[Math.floor(Math.random() * colors.length)];

          temp.push({
            position: [x, height / 2, z] as [number, number, number],
            height,
            color,
            key: `${i}-${j}`,
          });
        }
      }
    }

    return temp;
  }, []);

  return (
    <>
      {buildings.map((building) => (
        <Building
          key={building.key}
          position={building.position}
          height={building.height}
          color={building.color}
        />
      ))}
    </>
  );
}

// Grid floor component
function GridFloor() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[100, 50, '#00FFF0', '#FF10F0']}
      position={[0, -0.5, 0]}
    />
  );
}

// Main scene component
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} color="#00FFF0" intensity={1} />
      <pointLight position={[-10, 10, -10]} color="#FF10F0" intensity={1} />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <GridFloor />
      <CityGrid />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2.5}
        minPolarAngle={Math.PI / 4}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

// Main component
export default function CyberCity() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 10, 20], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
