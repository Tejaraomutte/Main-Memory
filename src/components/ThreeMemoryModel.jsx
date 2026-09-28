import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows, Text, Html } from '@react-three/drei';
import { RAM_HOTSPOTS } from '../data/memoryData';
import { Info, RotateCw, ZoomIn, Eye, Sparkles } from 'lucide-react';

function DimmStick({ activeHotspot, onSelectHotspot, powerOn }) {
  const meshRef = useRef();

  // DRAM Chip positions on the PCB
  const chipPositions = [-1.8, -1.3, -0.8, -0.3, 0.3, 0.8, 1.3, 1.8];

  return (
    <group ref={meshRef}>
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.12}>
        {/* PCB Board - Realistic Matte Green/Dark-Slate PCB */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4.4, 1.7, 0.08]} />
          <meshStandardMaterial 
            color="#144d3e" 
            roughness={0.4} 
            metalness={0.15} 
          />
        </mesh>

        {/* Heat spreader top aesthetic bar */}
        <mesh position={[0, 0.84, 0]}>
          <boxGeometry args={[4.44, 0.12, 0.12]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* 8 BGA DRAM Memory Chips */}
        {chipPositions.map((xPos, idx) => (
          <group key={idx} position={[xPos, 0.12, 0.06]}>
            {/* Main Chip Package */}
            <mesh>
              <boxGeometry args={[0.38, 0.65, 0.06]} />
              <meshStandardMaterial 
                color={powerOn ? '#1e293b' : '#334155'} 
                roughness={0.25} 
                metalness={0.65} 
              />
            </mesh>
            {/* Silicon Silkscreen detail */}
            <mesh position={[0, 0, 0.035]}>
              <planeGeometry args={[0.3, 0.45]} />
              <meshBasicMaterial color={powerOn ? '#0284c7' : '#475569'} opacity={0.15} transparent />
            </mesh>
          </group>
        ))}

        {/* PMIC (Power Management IC) in Center */}
        <mesh position={[0, 0.58, 0.06]}>
          <boxGeometry args={[0.28, 0.22, 0.05]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* SPD EEPROM Chip */}
        <mesh position={[1.2, 0.52, 0.06]}>
          <boxGeometry args={[0.18, 0.18, 0.05]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Decoupling Capacitors (SMD rows) */}
        {[-1.55, -1.05, -0.55, 0.55, 1.05, 1.55].map((x, i) => (
          <mesh key={'cap-' + i} position={[x, -0.32, 0.05]}>
            <boxGeometry args={[0.08, 0.14, 0.04]} />
            <meshStandardMaterial color="#b45309" roughness={0.3} metalness={0.6} />
          </mesh>
        ))}

        {/* Gold Contact Edge Connector Fingers (288-Pin bus) */}
        <group position={[0, -0.88, 0]}>
          {/* Left Gold Section */}
          <mesh position={[-1.25, 0, 0]}>
            <boxGeometry args={[1.75, 0.16, 0.09]} />
            <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* Mechanical Key Notch Gap (-0.35) */}
          <mesh position={[-0.35, 0.02, 0]}>
            <boxGeometry args={[0.18, 0.2, 0.1]} />
            <meshBasicMaterial color="#edf3f7" />
          </mesh>
          {/* Right Gold Section */}
          <mesh position={[0.9, 0, 0]}>
            <boxGeometry args={[2.3, 0.16, 0.09]} />
            <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.15} />
          </mesh>
        </group>

        {/* Power Status LED */}
        <mesh position={[-2.05, 0.65, 0.06]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color={powerOn ? '#10b981' : '#ef4444'} />
        </mesh>

        {/* Hotspots overlay */}
        {RAM_HOTSPOTS.map((spot) => {
          const isSelected = activeHotspot?.id === spot.id;
          return (
            <group key={spot.id} position={spot.pos}>
              <Html distanceFactor={8} position={[0, 0, 0.15]} center>
                <button
                  className={`hotspot-pin ${isSelected ? 'active-pin' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectHotspot(spot);
                  }}
                  title={spot.title}
                >
                  <span className="hotspot-pulse-ring" />
                  <span className="hotspot-center-dot" />
                  <span className="hotspot-tooltip-tag">{spot.tag}</span>
                </button>
              </Html>
            </group>
          );
        })}
      </Float>
    </group>
  );
}

export default function ThreeMemoryModel({ powerOn }) {
  const [selectedHotspot, setSelectedHotspot] = useState(RAM_HOTSPOTS[0]);
  const controlsRef = useRef();

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleFocusPins = () => {
    setSelectedHotspot(RAM_HOTSPOTS.find(h => h.id === 'gold-contacts'));
    if (controlsRef.current) {
      controlsRef.current.target.set(0, -0.6, 0);
    }
  };

  const handleFocusChips = () => {
    setSelectedHotspot(RAM_HOTSPOTS.find(h => h.id === 'dram-chips'));
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0.2, 0);
    }
  };

  return (
    <div className="three-viewport-wrapper">
      {/* Viewer Overlay Header */}
      <div className="viewer-asset-header">
        <span className="viewer-asset-kicker">3D HARDWARE INSPECTOR • DDR5 UNBUFFERED DIMM</span>
        <h2>High-Density Dual In-Line Memory Module</h2>
        <p>Interactive 360° hardware inspection with clickable architectural hotspots.</p>
      </div>

      {/* Floating Toolbar Controls */}
      <div className="viewer-floating-controls">
        <button className="viewer-ctrl-btn" onClick={handleResetCamera} title="Reset 3D Camera">
          <RotateCw size={14} />
          <span>Reset</span>
        </button>
        <button className="viewer-ctrl-btn" onClick={handleFocusChips} title="Inspect DRAM Chips">
          <Eye size={14} />
          <span>Chips</span>
        </button>
        <button className="viewer-ctrl-btn" onClick={handleFocusPins} title="Inspect Gold Bus Pins">
          <Sparkles size={14} />
          <span>Pins</span>
        </button>
      </div>

      {/* 3D Canvas */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0.6, 4.6], fov: 42 }}>
          <ambientLight intensity={1.3} />
          <directionalLight position={[4, 6, 5]} intensity={1.8} castShadow />
          <directionalLight position={[-4, -3, 3]} intensity={0.6} color="#22d3ee" />
          <pointLight position={[0, 2, 3]} intensity={1.2} color="#ffffff" />
          
          <DimmStick 
            activeHotspot={selectedHotspot} 
            onSelectHotspot={setSelectedHotspot}
            powerOn={powerOn}
          />

          <ContactShadows 
            position={[0, -1.3, 0]} 
            opacity={0.3} 
            scale={7.5} 
            blur={2.4} 
            color="#334155" 
          />
          
          <OrbitControls 
            ref={controlsRef}
            enablePan={true}
            minDistance={2.5}
            maxDistance={7}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 4}
          />
        </Canvas>
      </div>

      {/* Hotspot Info Drawer at Bottom */}
      {selectedHotspot && (
        <div className="viewer-active-hotspot-card">
          <div className="hotspot-badge-strip">
            <span className="hotspot-badge-pill">{selectedHotspot.tag}</span>
            <span className="hotspot-role-text">{selectedHotspot.role}</span>
          </div>
          <h4>{selectedHotspot.title}</h4>
          <p>{selectedHotspot.desc}</p>
        </div>
      )}

      {/* Power Notification Indicator */}
      {!powerOn && (
        <div className="power-cut-overlay">
          <span>⚡ POWER INTERRUPTED — VOLATILE CAPACITORS DRAINED TO 0V</span>
        </div>
      )}

      <div className="viewer-footer-tip">
        <span>Drag to rotate • Pinch / Scroll to zoom • Click glowing nodes to inspect</span>
      </div>
    </div>
  );
}
