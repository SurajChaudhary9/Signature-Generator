import React, { useState, useRef, useEffect } from 'react';
import './Whiteboard.css'; // Import your CSS file for styling
import html2canvas from 'html2canvas'; // Import html2canvas package
import jsPDF from 'jspdf';
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

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleDownload = async (format) => {
    const canvas = canvasRef.current;
  
    if (format === 'pdf') {
      try {
        const pdf = new jsPDF();
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        
        // Add image to first page
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297); 
        
        // Add footer to each page
        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.text('Developed by Suraj Chaudhary @Thinken Media', 14, pdf.internal.pageSize.getHeight() - 10); // Adjust coordinates as needed
        }
        
        // Save PDF
        pdf.save('signature.pdf');
      } catch (error) {
        console.error('Error creating PDF:', error);
      }
    } else {
      // Handle JPEG download
    }
  };

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
      <div className="canvas-controls">
        <button className="clear-button" onClick={handleClear}>Clear</button>
        <button className="download-button" onClick={() => handleDownload('jpeg')}>Download as JPEG</button>
        <button className="download-button" onClick={() => handleDownload('pdf')}>Download as PDF</button>
        <div className="canvas-heading">Draw your signature</div>
      </div>
    </div>
  );
};

export default Whiteboard;
