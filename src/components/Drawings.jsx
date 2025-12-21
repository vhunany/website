import React from "react";
import "./Drawings.css";

const drawingData = [
  { id: 7, src: "/gustav-finished.png", description: "Finished." },
  { id: 3, src: "/woman-sitting.png", description: "Woman sitting." },
  { id: 1, src: "/current.png", description: "Currently working on." },
  { id: 2, src: "/gustav-unfinished.png", description: "Gustav Klimt Unfinished." },
  { id: 4, src: "/fashion.png", description: "Fashion." },
  { id: 5, src: "/cats.png", description: "Cats." },
  { id: 6, src: "/Selfie.png", description: "Distorted Selfies." },
];

export default function Drawings() {
  return (
    <section id="drawings">
      <h2>Drawings</h2>
      
      <div className="drawings-statement-container">
        <p className="drawings-statement">
          I started drawing at a very young age—before elementary school. It has been one of the few hobbies that has stuck with me for a long time. A few days before I started elementary school, we went to meet our teacher. She asked me a couple of questions, and then we were given a piece of paper to draw on. I drew a princess, as seen in the following picture dated 9/2010.
        </p>
        
        <p className="drawings-statement">
          There is a sad face in the drawing that I did not draw—my teacher did. In elementary school, all the hubbub was around stick-figure drawings, which I thought looked boring and simple. But as you can see in the image on the right dated 6/2011… they got me. They got me, folks. And as you can see, she even drew a star on it.
        </p>
        
        <p className="drawings-statement">
          While it’s safe to say I was no art prodigy at five years old (and definitely not now either), I didn’t let this sad face deter me. I continued to draw.
        </p>
      </div>

      <div className="featured-drawing-container">
        <img 
          src="/kindergarten-drawing.png" 
          alt="Kindergarten Drawing" 
          className="featured-drawing" 
        />
        <p className="drawing-desc">Kindergarten drawing.</p>
      </div>

      <div className="drawings-grid">
        {drawingData.map((item) => {
          let specialClass = "";
          if (item.id === 1) specialClass = "tall";
          if (item.id === 7) specialClass = "wide";

          return (
            <div key={item.id} className={`drawing-card ${specialClass}`}>
              <img src={item.src} alt={item.description} className="drawing-image" />
              <p className="drawing-desc">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}