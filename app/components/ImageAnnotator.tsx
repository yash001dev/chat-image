import React, { useState, useRef, useEffect } from "react";
import commentDialog from "./commentDialog";
import AddPost from "./AddPost";

const ImageAnnotator = ({ imageUrl, onAnnotate, commentMode }) => {
  console.log("COMMENT MODE:", commentMode);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [annotations, setAnnotations] = useState([]);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
   const dialogRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, image.width, image.height);
    };
  }, [imageUrl]);

  const drawMarker = (context, x, y, number) => {
    const size = 20;
    const fontSize = 12;
    context.fillStyle = "red";
    context.fillRect(x - size / 2, y - size / 2, size, size);
    context.fillStyle = "white";
    context.font = `${fontSize}px Arial`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(number, x, y);
  };

  const handleMouseDown = (event) => {
    setIsDrawing(true);
    setStartX(event.nativeEvent.offsetX);
    setStartY(event.nativeEvent.offsetY);
    setEndX(event.nativeEvent.offsetX);
    setEndY(event.nativeEvent.offsetY);
  };

  const handleMouseMove = (event) => {
    if (!isDrawing) return;
    setEndX(event.nativeEvent.offsetX);
    setEndY(event.nativeEvent.offsetY);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const annotation = {
      x: startX,
      y: startY,
      width: endX - startX,
      height: endY - startY
    };
    if (commentMode) {
      setAnnotations((prevAnnotations) => [...prevAnnotations, annotation]);
      drawMarker(context, startX, startY, annotations.length + 1);
      setCommentDialogOpen(true);
    }
  };

  return (
    <div className="relative">
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
     {commentDialogOpen && (
        <AddPost ref={dialogRef} />
      )}
    </div>
  );
};

export default ImageAnnotator;
