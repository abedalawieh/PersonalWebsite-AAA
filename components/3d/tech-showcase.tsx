'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Icosahedron, Torus, Box, Sphere, Octahedron, Dodecahedron, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Central distorted sphere - olive themed
function CentralSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Icosahedron ref={meshRef} args={[1.8, 4]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#7c9a5e"
        distort={0.4}
        speed={1.5}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.9}
      />
    </Icosahedron>
  )
}

// Orbiting tech shapes - olive palette
const techShapes = [
  { color: '#a3b87c', shape: 'box', orbit: 3.5, speed: 0.3, yOffset: 0.5 },
  { color: '#c9b458', shape: 'torus', orbit: 4, speed: 0.25, yOffset: -0.3 },
  { color: '#8b9f6e', shape: 'octahedron', orbit: 3.8, speed: 0.35, yOffset: 0.8 },
  { color: '#d4e4bc', shape: 'dodecahedron', orbit: 4.2, speed: 0.2, yOffset: -0.6 },
  { color: '#6b8b4e', shape: 'sphere', orbit: 3.3, speed: 0.4, yOffset: 0.2 },
  { color: '#b8c99a', shape: 'icosahedron', orbit: 4.5, speed: 0.28, yOffset: -0.1 },
]

function OrbitingShape({ color, shape, orbit, speed, yOffset, index }: {
  color: string
  shape: string
  orbit: number
  speed: number
  yOffset: number
  index: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const initialAngle = (index / techShapes.length) * Math.PI * 2

  useFrame((state) => {
    if (groupRef.current) {
      const angle = initialAngle + state.clock.elapsedTime * speed
      groupRef.current.position.x = Math.cos(angle) * orbit
      groupRef.current.position.z = Math.sin(angle) * orbit
      groupRef.current.position.y = yOffset + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.3
    }
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.015
    }
  })

  const renderShape = () => {
    const material = <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
    
    switch (shape) {
      case 'box':
        return <Box ref={meshRef} args={[0.4, 0.4, 0.4]}>{material}</Box>
      case 'torus':
        return <Torus ref={meshRef} args={[0.25, 0.1, 16, 32]}>{material}</Torus>
      case 'octahedron':
        return <Octahedron ref={meshRef} args={[0.3]}>{material}</Octahedron>
      case 'dodecahedron':
        return <Dodecahedron ref={meshRef} args={[0.3]}>{material}</Dodecahedron>
      case 'sphere':
        return <Sphere ref={meshRef} args={[0.25, 32, 32]}>{material}</Sphere>
      case 'icosahedron':
        return <Icosahedron ref={meshRef} args={[0.3, 0]}>{material}</Icosahedron>
      default:
        return <Box ref={meshRef} args={[0.4, 0.4, 0.4]}>{material}</Box>
    }
  }

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.2}>
        {renderShape()}
      </Float>
    </group>
  )
}

// Particle ring - olive
function ParticleRing() {
  const count = 200
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 5 + (Math.random() - 0.5) * 0.5
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.5
      pos[i * 3 + 2] = Math.sin(angle) * radius
    }
    return pos
  }, [])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
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
        size={0.04}
        color="#7c9a5e"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

// Connection lines
function ConnectionLines() {
  const lineRef = useRef<THREE.LineSegments>(null)
  
  const positions = useMemo(() => {
    const pos: number[] = []
    const nodeCount = 30
    const nodes: THREE.Vector3[] = []
    
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = 3 + Math.random() * 2
      nodes.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      ))
    }
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 2.5) {
          pos.push(nodes[i].x, nodes[i].y, nodes[i].z)
          pos.push(nodes[j].x, nodes[j].y, nodes[j].z)
        }
      }
    }
    
    return new Float32Array(pos)
  }, [])

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = state.clock.elapsedTime * 0.03
      lineRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#7c9a5e" transparent opacity={0.15} />
    </lineSegments>
  )
}

function ShowcaseScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#7c9a5e" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#c9b458" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#a3b87c" />
      
      <CentralSphere />
      
      {techShapes.map((config, i) => (
        <OrbitingShape key={i} {...config} index={i} />
      ))}
      
      <ParticleRing />
      <ConnectionLines />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  )
}

export function TechShowcase3D() {
  return (
    <section id="showcase" className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          Interactive
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
          Tech Universe
        </h2>
        <p className="text-muted-foreground mb-10 max-w-xl leading-relaxed">
          An interactive 3D visualization of my technical ecosystem. Drag to explore — each orbiting shape represents a different domain of expertise.
        </p>
        
        <div className="relative w-full h-[500px] md:h-[600px] rounded-xl border border-border bg-background/50 overflow-hidden">
          <Canvas
            camera={{ position: [0, 2, 10], fov: 50 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <ShowcaseScene />
            </Suspense>
          </Canvas>
          
          {/* Legend - olive themed */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-3 justify-center">
            {[
              { color: '#7c9a5e', label: 'Core' },
              { color: '#a3b87c', label: 'Backend' },
              { color: '#c9b458', label: 'DevOps' },
              { color: '#8b9f6e', label: 'Databases' },
              { color: '#6b8b4e', label: 'AI/ML' },
              { color: '#b8c99a', label: 'Testing' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 px-2 py-1 rounded bg-background/80 backdrop-blur-sm border border-border">
                <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
