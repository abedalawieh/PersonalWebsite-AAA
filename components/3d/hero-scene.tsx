'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Icosahedron, Torus, Box, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function FloatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Icosahedron ref={meshRef} args={[1.5, 1]} position={[2, 0, 0]}>
        <MeshDistortMaterial
          color="#7c9a5e"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Icosahedron>
    </Float>
  )
}

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <Torus ref={meshRef} args={[0.8, 0.25, 16, 32]} position={[-2.5, 1, -1]}>
        <meshStandardMaterial
          color="#a3b87c"
          roughness={0.3}
          metalness={0.7}
          emissive="#7c9a5e"
          emissiveIntensity={0.1}
        />
      </Torus>
    </Float>
  )
}

function FloatingCube() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.25
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.35
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
      <Box ref={meshRef} args={[0.7, 0.7, 0.7]} position={[-1.5, -1.5, 0.5]}>
        <meshStandardMaterial
          color="#c9b458"
          roughness={0.2}
          metalness={0.9}
        />
      </Box>
    </Float>
  )
}

function ParticleField() {
  const count = 100
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#7c9a5e"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function WireframeSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <Sphere ref={meshRef} args={[3, 32, 32]} position={[3, -1, -3]}>
      <meshBasicMaterial
        color="#7c9a5e"
        wireframe
        transparent
        opacity={0.15}
      />
    </Sphere>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#7c9a5e" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#c9b458" />
      <FloatingIcosahedron />
      <FloatingTorus />
      <FloatingCube />
      <ParticleField />
      <WireframeSphere />
    </>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
