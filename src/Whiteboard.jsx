import React, { useState, useRef, useEffect } from 'react';
import './Whiteboard.css'; // Import your CSS file for styling

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prevX, setPrevX] = useState(0);
  const [prevY, setPrevY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleMouseDown = (event) => {
      setIsDrawing(true);
      setPrevX(event.clientX - canvas.offsetLeft);
      setPrevY(event.clientY - canvas.offsetTop);
    };

    const handleMouseMove = (event) => {
      if (!isDrawing) return;
      const x = event.clientX - canvas.offsetLeft;
      const y = event.clientY - canvas.offsetTop;

      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#000'; // Change color if needed
      ctx.lineWidth = 4;
      ctx.stroke();

      setPrevX(x);
      setPrevY(y);
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDrawing, prevX, prevY]);

  return (
    <div className="whiteboard-container">
      <h1 className="whiteboard-title">Signature Generator</h1>
      <canvas
        ref={canvasRef}
        width={800} // Set canvas width
        height={500} // Set canvas height
        className="whiteboard"
      >
        Your browser does not support the HTML5 Canvas element.
      </canvas>
      <div className="canvas-heading">Draw your signature</div>
    </div>
  );
};

export default Whiteboard;
