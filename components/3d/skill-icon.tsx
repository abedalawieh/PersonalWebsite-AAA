'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Box, Sphere, Torus, Octahedron, Dodecahedron, Icosahedron, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

// Each skill category gets a unique 3D shape - olive palette
const categoryShapes: Record<string, { shape: string; color: string }> = {
  Backend: { shape: 'box', color: '#7c9a5e' },
  Frontend: { shape: 'icosahedron', color: '#a3b87c' },
  Databases: { shape: 'octahedron', color: '#c9b458' },
  'Cloud & DevOps': { shape: 'sphere', color: '#8b9f6e' },
  'Security & IAM': { shape: 'dodecahedron', color: '#b8a84e' },
  'AI & Data': { shape: 'torus', color: '#6b8b4e' },
  'Testing & Automation': { shape: 'roundedbox', color: '#d4e4bc' },
  'Tools & Platforms': { shape: 'icosahedron', color: '#9cb87c' },
}

function AnimatedShape({ shape, color }: { shape: string; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  const renderShape = () => {
    const props = { ref: meshRef }
    
    switch (shape) {
      case 'box':
        return (
          <Box {...props} args={[0.8, 0.8, 0.8]}>
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
          </Box>
        )
      case 'sphere':
        return (
          <Sphere {...props} args={[0.5, 32, 32]}>
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
          </Sphere>
        )
      case 'torus':
        return (
          <Torus {...props} args={[0.4, 0.15, 16, 32]}>
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
          </Torus>
        )
      case 'octahedron':
        return (
          <Octahedron {...props} args={[0.55]}>
            <meshStandardMaterial color={color} roughness={0.25} metalness={0.75} />
          </Octahedron>
        )
      case 'dodecahedron':
        return (
          <Dodecahedron {...props} args={[0.5]}>
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
          </Dodecahedron>
        )
      case 'icosahedron':
        return (
          <Icosahedron {...props} args={[0.55, 0]}>
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
          </Icosahedron>
        )
      case 'roundedbox':
        return (
          <RoundedBox {...props} args={[0.7, 0.7, 0.7]} radius={0.1}>
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
          </RoundedBox>
        )
      default:
        return (
          <Box {...props} args={[0.8, 0.8, 0.8]}>
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
          </Box>
        )
    }
  }

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      {renderShape()}
    </Float>
  )
}

function SkillScene({ shape, color }: { shape: string; color: string }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color={color} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#ffffff" />
      <AnimatedShape shape={shape} color={color} />
    </>
  )
}

export function SkillIcon3D({ category }: { category: string }) {
  const config = categoryShapes[category] || { shape: 'box', color: '#7c9a5e' }

  return (
    <div className="w-10 h-10 rounded-md overflow-hidden" style={{ background: `${config.color}15` }}>
      <Canvas
        camera={{ position: [0, 0, 2], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <SkillScene shape={config.shape} color={config.color} />
      </Canvas>
    </div>
  )
}
