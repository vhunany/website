/* SpeckledText.jsx file */

import React, { useState } from "react";
import "./SpeckledText.css";

export default function SpeckledText({ text }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <span
      className={`speckled-text ${revealed ? "revealed" : ""}`}
      onMouseEnter={() => setRevealed(true)}
    >
      {text}
    </span>
  );
}
