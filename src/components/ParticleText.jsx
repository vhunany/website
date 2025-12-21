import React, { useRef, useEffect, useState } from "react";
import "./ParticleText.css";

const ParticleText = ({ text }) => {
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasBeenRevealed, setHasBeenRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    let animationFrameId;
    let particlesArray = [];

    const fontSize = 18;
    const font = `${fontSize}px Arial, sans-serif`; 
    const speed = 0.05; 
    const scale = window.devicePixelRatio || 1;

    const init = () => {
      ctx.font = font;
      const textMetrics = ctx.measureText(text);
      const cssWidth = textMetrics.width + 60; 
      const cssHeight = fontSize * 3.5;

      canvas.width = cssWidth * scale;
      canvas.height = cssHeight * scale;
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;

      ctx.save();
      ctx.scale(scale, scale);
      ctx.font = font;
      ctx.fillStyle = "white";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 20, cssHeight / 2);
      ctx.restore();

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      particlesArray = [];

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const opacity = imageData.data[(y * 4 * canvas.width) + (x * 4) + 3];
          if (opacity > 150) {
            particlesArray.push(new Particle(x / scale, y / scale, cssWidth, cssHeight));
          }
        }
      }
    };

    class Particle {
      constructor(x, y, canvasWidth, canvasHeight) {
        this.originX = x;
        this.originY = y;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;

        this.baseSize = 0.8;
        this.size = this.baseSize;
        this.color = "black";
        this.hue = 0;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }

      // We pass the "revealed" status here
      update(permanentlyRevealed) {
        if (permanentlyRevealed) {
          // 1. Move towards target (Once this starts, it never stops)
          this.x += (this.originX - this.x) * speed;
          this.y += (this.originY - this.y) * speed;

          const distanceToTarget = Math.sqrt(
            Math.pow(this.x - this.originX, 2) + Math.pow(this.y - this.originY, 2)
          );

          // 2. Rainbow effect kicks in when close
          if (distanceToTarget < 1.5) {
            this.hue = (this.hue + 2) % 360; 
            this.color = `hsl(${this.hue}, 80%, 50%)`;
            if (this.size < 1.4) this.size += 0.05;
          }
        } else {
          // 3. Drift (Only happens BEFORE the first hover)
          this.x += this.vx;
          this.y += this.vy;

          if (this.x < 0 || this.x > this.canvasWidth) this.vx *= -1;
          if (this.y < 0 || this.y > this.canvasHeight) this.vy *= -1;

          this.color = "black";
          if (this.size > this.baseSize) this.size -= 0.05;
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(scale, scale);
      for (let i = 0; i < particlesArray.length; i++) {
        // NOTICE: We only use hasBeenRevealed here. 
        // We don't care about the real-time 'isHovered' for particle positioning anymore.
        particlesArray[i].update(hasBeenRevealed);
        particlesArray[i].draw();
      }
      ctx.restore();
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [text, hasBeenRevealed]); // isHovered removed from dependencies to stop the reset glitch

  const handleMouseEnter = () => {
    setHasBeenRevealed(true);
  };

  return (
    <div 
      className="particle-text-container"
      onMouseEnter={handleMouseEnter}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ParticleText;