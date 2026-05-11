'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Box, Sphere, Torus, Icosahedron, Dodecahedron, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Map project accents to 3D configurations - olive palette
const projectConfigs: Record<string, { shape: string; distort?: boolean }> = {
  '#7c9a5e': { shape: 'icosahedron', distort: true }, // Landval
  '#a3b87c': { shape: 'dodecahedron' },               // MOJ Jordan
  '#c9b458': { shape: 'torus' },                      // Didginums
  '#8b9f6e': { shape: 'box' },                        // Intalio
  '#b8a84e': { shape: 'sphere' },                     // Born Interactive
  '#6b8b4e': { shape: 'icosahedron', distort: true }, // MSc Thesis
}

function AnimatedProjectShape({ color, shape, distort }: { color: string; shape: string; distort?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.6
    }
  })

  const renderShape = () => {
    if (shape === 'icosahedron' && distort) {
      return (
        <Icosahedron ref={meshRef} args={[0.6, 1]}>
          <MeshDistortMaterial
            color={color}
            distort={0.25}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Icosahedron>
      )
    }

    const material = <meshStandardMaterial color={color} roughness={0.25} metalness={0.75} />

    switch (shape) {
      case 'dodecahedron':
        return <Dodecahedron ref={meshRef} args={[0.55]}>{material}</Dodecahedron>
      case 'torus':
        return <Torus ref={meshRef} args={[0.4, 0.18, 16, 32]}>{material}</Torus>
      case 'box':
        return <Box ref={meshRef} args={[0.7, 0.7, 0.7]}>{material}</Box>
      case 'sphere':
        return <Sphere ref={meshRef} args={[0.5, 32, 32]}>{material}</Sphere>
      default:
        return <Icosahedron ref={meshRef} args={[0.55, 0]}>{material}</Icosahedron>
    }
  }

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.3}>
      {renderShape()}
    </Float>
  )
}

function ProjectScene({ color, shape, distort }: { color: string; shape: string; distort?: boolean }) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 3, 3]} intensity={0.9} color={color} />
      <pointLight position={[-3, -3, -3]} intensity={0.25} color="#ffffff" />
      <AnimatedProjectShape color={color} shape={shape} distort={distort} />
    </>
  )
}

export function ProjectIcon3D({ accent }: { accent: string }) {
  const config = projectConfigs[accent] || { shape: 'icosahedron' }

  return (
    <div 
      className="w-14 h-14 rounded-lg overflow-hidden shrink-0"
      style={{ background: `${accent}15` }}
    >
      <Canvas
        camera={{ position: [0, 0, 2], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ProjectScene color={accent} shape={config.shape} distort={config.distort} />
      </Canvas>
    </div>
  )
}
