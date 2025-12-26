import { useRef, useEffect, useState } from 'react';
import { colors, typography, interactive } from '../../config/theme';

/**
 * EmptyState Component - "The Neural Net"
 * Interactive particle constellation that responds to mouse movement.
 */
const EmptyState = ({ icon, title, message }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mouseRef = useRef({ x: null, y: null });

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation Loop
  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Particle Config
    const PARTICLE_COUNT = 60; // Adjust density
    const CONNECTION_DISTANCE = 150;
    const MOUSE_DISTANCE = 200;
    
    // Core brand colors parsed for canvas
    const particleColor = interactive.particles.primary; // Primary cyan
    const lineColor = interactive.particles.secondary; // Secondary purple

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse Interaction
        if (mouseRef.current.x != null) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < MOUSE_DISTANCE) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (MOUSE_DISTANCE - distance) / MOUSE_DISTANCE;
            
            // Gently push away
            const direction = -1; 
            const strength = 0.8;
            
            this.vx += forceDirectionX * force * strength * direction * 0.05;
            this.vy += forceDirectionY * force * strength * direction * 0.05;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      }
    }

    // Init Particles
    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.strokeStyle = lineColor; // Use the parsed color
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Connect to mouse
        if (mouseRef.current.x != null) {
           for (let i = 0; i < particles.length; i++) {
              const dx = mouseRef.current.x - particles[i].x;
              const dy = mouseRef.current.y - particles[i].y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              if (distance < MOUSE_DISTANCE) {
                 ctx.beginPath();
                 ctx.strokeStyle = interactive.particles.connection;
                 ctx.lineWidth = 1;
                 ctx.moveTo(mouseRef.current.x, mouseRef.current.y);
                 ctx.lineTo(particles[i].x, particles[i].y);
                 ctx.stroke();
              }
           }
        }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions]);

  const handleMouseMove = (e) => {
     if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseRef.current = {
           x: e.clientX - rect.left,
           y: e.clientY - rect.top
        };
     }
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: null, y: null };
  };

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: `radial-gradient(circle at center, ${colors.bg.primary} 0%, ${colors.bg.deep} 100%)`,
        cursor: 'crosshair',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas 
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
        }}
      />
      
      {/* Content Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none', // Let clicks pass through to canvas logic if needed
        zIndex: 10,
      }}>
        
        <div style={{
           marginBottom: '24px',
           position: 'relative',
        }}>
           {/* Glowing Orb Behind Icon */}
           <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '120px',
              height: '120px',
              background: `radial-gradient(circle, ${colors.brand.primary} 0%, transparent 70%)`,
              opacity: 0.2,
              filter: 'blur(20px)',
           }} />
           
           <div style={{
              fontSize: '64px',
              filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))',
              animation: 'float 6s ease-in-out infinite'
           }}>
              {icon}
           </div>
        </div>

        <h3 style={{
           fontSize: '32px',
           fontWeight: '800',
           color: '#fff',
           marginBottom: '12px',
           letterSpacing: '-1px',
           textAlign: 'center',
           background: 'linear-gradient(to bottom, #fff 0%, #aaa 100%)',
           WebkitBackgroundClip: 'text',
           WebkitTextFillColor: 'transparent',
        }}>
           {title}
        </h3>

        <p style={{
           fontFamily: typography.fontFamily.mono,
           fontSize: '13px',
           color: colors.text.muted,
           maxWidth: '300px',
           textAlign: 'center',
           lineHeight: '1.6',
           background: 'rgba(0,0,0,0.4)',
           backdropFilter: 'blur(4px)',
           padding: '8px 16px',
           borderRadius: '99px',
           border: '1px solid rgba(255,255,255,0.1)',
        }}>
           {message}
        </p>

        <style>{`
           @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-15px); }
           }
        `}</style>
      </div>
    </div>
  );
};

export default EmptyState;