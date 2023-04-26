import React, { useState, useRef, useEffect } from "react";
import commentDialog from "./commentDialog";
import AddPost from "./AddPost";
import Marker from "./Marker";
import { io } from "socket.io-client";
import { getSession } from "next-auth/react";
import { toast } from "react-hot-toast";

interface createCommentParams{
    body:string;
    imageId:number;
    x:number;
    y:number;
    author:Object
    width:number;
    height:number;
}

const ImageAnnotator = ({ imageUrl, onAnnotate, commentMode }) => {

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [annotations, setAnnotations] = useState([]);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [onCloseDialogue,setOnCloseDialogue]=useState<Boolean>(true);
  const [dialogPosition,setDialogPosition]=useState({x:0,y:0});
  const dialogRef = useRef(null);
  const [userPrivateInfo,setUserPrivateInfo]=useState<Object>({});

  let toastCommentId:string

  const socket=io("http://localhost:3001")
  useEffect(()=>{
        async function getUserData(){
            const session= await getSession()
            setUserPrivateInfo(session?.user??{});
        }
        getUserData();
  },[]);

  console.log("userPrivateInfo:",userPrivateInfo);

  useEffect(() => {
    const canvas:HTMLCanvasElement = canvasRef.current;
    if(canvas==null) return;
    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context?.drawImage(image, 0, 0, image.width, image.height);
    };
  }, [imageUrl]);

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

  const createComment = (e:MouseEvent,{body,imageId,x,y,width,height,author}:createCommentParams) => {
    e.preventDefault();
    toastCommentId=toast.loading("Sending Comment...",{
      id:toastCommentId
    })
    socket.emit("sendComment",{body,imageId,author});
    toast.success("Comment Sent!",{
      id:toastCommentId
    })
    setOnCloseDialogue(true);
    setCommentDialogOpen(false);
  }

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
    if(onCloseDialogue){
      setDialogPosition({x:startX,y:startY});
      setCommentDialogOpen(true);
      setOnCloseDialogue(false);
    }
    return () => {
      removeMarkerClick();
    };
  }
  };
 useEffect(() => {
    function handleClickOutside(event) {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setOnCloseDialogue(true);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="relative">
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
    {annotations.map((annotation, index) => (
      <Marker key={index} x={annotation.x} y={annotation.y} number={index + 1} />
    ))}
     {commentDialogOpen && !onCloseDialogue && (
      <div style={{
        left:dialogPosition.x,
        top:dialogPosition.y
      }} className="absolute">
        <AddPost createMode={true} ref={dialogRef} author={userPrivateInfo} createComment={createComment} comment="" imageId={1} />
      </div>
      )}
    </div>
  );
};

export default ImageAnnotator;
