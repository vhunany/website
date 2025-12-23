import React from "react";
import ParticleText from "./ParticleText";

export default function About() {
  return (
    <section id="about">
      <h2>About Me</h2>
      <div className="about-list">
        <ParticleText text="I like math" /><br />
        <ParticleText text="I like puzzles" /><br />
        <ParticleText text="I like to teach" /><br />
        <ParticleText text="I like to play chess" /><br />
        <ParticleText text="...not very good though" /><br />
        {/* <ParticleText text="I like doing metal earth kits" /><br /> */}
        <ParticleText text="mediocre comp sci student" /><br />
        <ParticleText text="I always want to learn ☺" />
      </div>
    </section>
  );
}