import React, { useRef, useEffect } from "react";

function App() {
  const canvasRef = useCanvas(this.refs.canvas, "2d", "fillRect");

  return <canvas ref={canvasRef} width="800" height="600" />;
}

function useCanvas(canvasContext, context, shape) {
  useEffect(() => {
    const ctx = canvasContext.getContext(context);
    function drawRectangle() {
        ctx[shape](0,0, 100, 100);
    }
    drawRectangle();
  }, []);

  return canvasRef;
}