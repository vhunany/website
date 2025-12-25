import React, { useEffect, useRef } from "react";
import "./Home.css";

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // CONFIGURATION
    const SIDEBAR_WIDTH = 0;
    const MAIN_PADDING = 40; // Matches .main-content padding
    const TOTAL_CIRCLES = 8000; 
    const ATTEMPTS_PER_FRAME = 150; 
    
    // Tighter constraints for "compact" look
    const MIN_RADIUS = 2;
    const MAX_RADIUS = 6; // Smaller max radius makes it look denser
    const GAP = 0.1; // Minimal gap for high density

    // const colors = ["#586643", "#76D34F", "#DFE751", "#5ECACE", "#E0E0E0", "#000000"];
    // const colors = ["#586643", "#76D34F", "#DFE751", "#5ECACE", "#E0E0E0", "#000000"];
    /*
    #C4A847
    #9ED8C9
    #531E82
    #4F7791
    #942724
    #1c3834
    #76C9E4
    #0B0C5B
    #A63023
    #4B1D10
    #D091C0
    #D16865
    #BA4C38
    #A62838
    #6D1853
    #2B4BA2
    #BFDBFA
    #FDE4BE
    #F1D8D7
    #9F7E91
    #000503
    #E98D3C
    #C2451E
    #D55722
    #E0C66C
    #5B0E07
    #19034A
    #3C6071
    #5C2440
    */
   const colors = ["#3e3b33ff", "#9ED8C9", "#531E82", "#4F7791", "#942724",
  "#1c3834", "#79cdeaff", "#A63023", "#651f0bff",
  "#D091C0", "#f1706bff", "#c63a22ff", "#A62838", "#060A32",
  "#a02079ff", "#2B4BA2", "#BFDBFA", "#FDE4BE", "#F1D8D7",
  "#9F7E91", "#000503", "#ec872dff", "#C2451E", "#e55619ff",
  "#eacd62ff", "#6b1007ff", "#19034A", "#3C6071", "#7e2e56ff", "#e24f99ff", "#f0087cff", "#b2e2f3ff", "#b2f3f3ff", "#25f5f5ff", "#f4cb39ff", "#f6f94bff", "#eff0c2ff", "#e55619ff", "#fd0432ff", "#fac8d1ff", "#9fe7caff", "#24ee9dff", "#ff00bfff", "#fd0468ff", "#521ad6ff", "#fd0442ff", "#fd0474ff", "#63edffff"];

    let circles = [];
    let animationId;

    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

    const resizeCanvas = () => { // problem here. The entire artwork should only fit on the space that is on the screen, not the entire window
      // Subtracting sidebar and double padding (left/right) to keep it in the "white space"
      canvas.width = window.innerWidth - SIDEBAR_WIDTH - (MAIN_PADDING * 2) + 800;
      canvas.height = window.innerHeight - (MAIN_PADDING * 2) + 800;
      init();
    };

    const isValid = (c1) => {
      // Boundary check (Stay inside the calculated canvas area)
      if (
        c1.x + c1.r > canvas.width ||
        c1.x - c1.r < 0 ||
        c1.y + c1.r > canvas.height ||
        c1.y - c1.r < 0
      ) {
        return false;
      }

      // Proximity check
      for (let i = 0; i < circles.length; i++) {
        const c2 = circles[i];
        const dx = c1.x - c2.x;
        const dy = c1.y - c2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Distance must be greater than radii sum + minimal gap
        if (dist < c1.r + c2.r + GAP) {
          return false;
        }
      }
      return true;
    };

    const init = () => {
      circles = [];
      const startCircle = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        r: 9, // Smaller starting circle
        // color: "#1E2EE6",
        color: "#ff003cff",
      };
      circles.push(startCircle);
      animate();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (circles.length < TOTAL_CIRCLES) {
        let count = 0;
        while (count < ATTEMPTS_PER_FRAME) {
          // Optimization: Pick from the last 100 added circles to keep growth localized/compact
          const startIndex = Math.max(0, circles.length - 100);
          const parent = circles[randomInt(startIndex, circles.length - 1)];

          const newRadius = randomInt(MIN_RADIUS, MAX_RADIUS);
          const angle = Math.random() * Math.PI * 2;

          // Place exactly at the edge + GAP
          const dist = parent.r + newRadius + GAP;
          const newX = parent.x + Math.cos(angle) * dist;
          const newY = parent.y + Math.sin(angle) * dist;

          const newCircle = {
            x: newX,
            y: newY,
            r: newRadius,
            color: randomColor(),
          };

          if (isValid(newCircle)) {
            circles.push(newCircle);
          }
          count++;
        }
      }

      circles.forEach((c) => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fillStyle = c.color;
        ctx.fill();
        ctx.closePath();
      });

      if (circles.length < TOTAL_CIRCLES) {
        animationId = requestAnimationFrame(animate);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="home-canvas-wrapper">
      <canvas ref={canvasRef} />
    </div>
  );
}