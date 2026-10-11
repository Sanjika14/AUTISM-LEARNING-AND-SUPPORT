import React, { useEffect, useRef } from 'react';

export default function RealAuroraCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Track mouse & touch
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, active: true };
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Stars generation
    const stars = Array.from({ length: 140 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * (window.innerHeight * 0.75),
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005
    }));

    let time = 0;

    // Main render loop
    const render = () => {
      time += 0.015;
      const w = canvas.width;
      const h = canvas.height;

      // 1. Clear & Dark Night Sky Base (#0A0612 to #160424)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, '#06030F');
      skyGrad.addColorStop(0.5, '#12072B');
      skyGrad.addColorStop(1, '#0A0612');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Render Twinkling Night Stars
      ctx.save();
      stars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) star.speed = -star.speed;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // 3. Render Realistic Aurora Light Curtains & Rays
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const rayCount = 45;
      const stepX = w / rayCount;

      for (let i = 0; i <= rayCount; i++) {
        const x = i * stepX;
        
        // Sine wave calculations matching photo curtain motion
        const wave1 = Math.sin(time * 0.8 + i * 0.15) * 80;
        const wave2 = Math.cos(time * 0.5 + i * 0.1) * 120;
        const topY = h * 0.05 + wave1;
        const bottomY = h * 0.85 + wave2;

        // Interactive Mouse Influence
        let mouseDistFactor = 1;
        if (mouseRef.current.active) {
          const dx = x - mouseRef.current.x;
          const dy = (h * 0.4) - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 350) {
            mouseDistFactor = 1 + (1 - dist / 350) * 0.8;
          }
        }

        // Color Gradient matching image (Magenta top -> Violet -> Emerald Green bottom)
        const rayGrad = ctx.createLinearGradient(x, topY, x, bottomY);
        
        // Alternating colors across the sky width
        const colorRatio = (i / rayCount + Math.sin(time * 0.2)) % 1;
        if (colorRatio < 0.4) {
          // Deep Magenta & Purple crown
          rayGrad.addColorStop(0, `rgba(217, 70, 239, ${0.45 * mouseDistFactor})`);
          rayGrad.addColorStop(0.4, `rgba(168, 85, 247, ${0.55 * mouseDistFactor})`);
          rayGrad.addColorStop(0.7, `rgba(16, 185, 129, ${0.65 * mouseDistFactor})`);
          rayGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
        } else if (colorRatio < 0.7) {
          // Electric Vivid Pink-White & Cyan
          rayGrad.addColorStop(0, `rgba(244, 114, 182, ${0.5 * mouseDistFactor})`);
          rayGrad.addColorStop(0.3, `rgba(192, 38, 211, ${0.6 * mouseDistFactor})`);
          rayGrad.addColorStop(0.6, `rgba(52, 211, 153, ${0.7 * mouseDistFactor})`);
          rayGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
        } else {
          // Emerald Green & Teal Curtain
          rayGrad.addColorStop(0, `rgba(147, 51, 234, ${0.4 * mouseDistFactor})`);
          rayGrad.addColorStop(0.4, `rgba(52, 211, 153, ${0.65 * mouseDistFactor})`);
          rayGrad.addColorStop(0.8, `rgba(6, 182, 212, ${0.5 * mouseDistFactor})`);
          rayGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
        }

        // Draw vertical curtain light beam
        const curtainWidth = stepX * 2.8;
        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        ctx.moveTo(x - curtainWidth / 2, bottomY);
        ctx.lineTo(x + curtainWidth / 2, bottomY);
        ctx.lineTo(x + curtainWidth * 0.8, topY);
        ctx.lineTo(x - curtainWidth * 0.8, topY);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // 4. Render Forest Silhouette at Bottom Horizon (Matching photo)
      ctx.save();
      ctx.fillStyle = '#05030A';
      ctx.beginPath();
      ctx.moveTo(0, h);
      
      const treeCount = Math.floor(w / 18);
      for (let t = 0; t <= treeCount; t++) {
        const tx = t * 18;
        const treeHeight = 40 + Math.sin(t * 1.5) * 20 + Math.cos(t * 3) * 15;
        const baseH = h - 20;
        
        ctx.lineTo(tx, baseH);
        ctx.lineTo(tx + 4, baseH - treeHeight);
        ctx.lineTo(tx + 9, baseH - (treeHeight * 0.6));
        ctx.lineTo(tx + 14, baseH);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}
