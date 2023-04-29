import React, { useState, useRef, useEffect, MouseEvent } from "react";
import AddPost from "./AddPost";
import Marker from "./Marker";
import { io } from "socket.io-client";
import { getSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { ImageAnnotationAppProps } from "./ImageAnnotation";
// import socket from "@/socket-client";

interface createCommentParams{
    body:string;
    imageId:number;
    x:number;
    y:number;
    author:Object
    width?:number;
    height?:number;
}



const ImageAnnotator = ({ url, imageId, commentMode }:ImageAnnotationAppProps) => {
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
  const editdialogRef = useRef(null);
  const [userPrivateInfo,setUserPrivateInfo]=useState<Object>({});
  const [editMode,setEditMode]=useState<Boolean>(false);
  const [editDialogDetails,setEditDialogDetails]=useState<Object>({
    x:0,
    y:0,
    open:false,
  });

  let toastCommentId:string

  const socket=io("http://localhost:3001")

  useEffect(()=>{
        async function getUserData(){
            const session= await getSession()
            setUserPrivateInfo(session?.user??{});
        }
        getUserData();
  },[]);
  

      useEffect(()=>{
        socket.on("connect",()=>{
            console.log("Connected");
        });
        socket.on("disconnect",()=>{
            console.log("Disconnected");
        });
    },[]);

    //For getting all comments on the image
    useEffect(()=>{
      socket.emit('join-image-room', {imageId});

      //Get All Comments
      socket.emit('get-all-comments',{imageId});

      //Listen For New Comments
      socket.on(`receive-all-comments`,(allComments)=>{
        setAnnotations(allComments);
      })

      //Listen for new comments and add them to the state
      socket.on("new-comment",(comment)=>{
        console.log("New Comment Received")
        setAnnotations((prevAnnotations) => {
          return [...prevAnnotations, comment];
        });
      })

      //Listen for updated comments and update them in the state
      socket.on("edit-comment",(comment)=>{
        console.log("Updated Comment Received")
        setAnnotations((prevAnnotations) => {
          return prevAnnotations.map((annotation) => {
            if (annotation.id === comment.id) {
              return comment;
            }
            return annotation;
          });
        });
      })
      
      //Listen for deleted comments and delete them from the state
      socket.on("delete-comment",(comment)=>{
        console.log("Deleted Comment Received")
        setAnnotations((prevAnnotations) => {
          return prevAnnotations.filter((annotation) => {
            if (annotation.id === comment.id) {
              return false;
            }
            return true;
          });
        });
      })

      return () => {
        socket.emit('leave-image-room', {imageId});
      };
    },[])


  useEffect(() => {
    const canvas:HTMLCanvasElement = canvasRef.current;
    if(canvas==null) return;
    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = url;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context?.drawImage(image, 0, 0, image.width, image.height);
    };
  }, [url]);

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

  const openCommentDialog = (event:MouseEvent,x:number,y:number,comment:string,commentId:number) => {
    console.log("COMMENT ID:",commentId)
    // setEditMode(true);
    setEditDialogDetails({
      ...editDialogDetails,
      x:x,
      y:y,
      open:true,
      comment,
      commentId
    })
  }

  const createComment = (e:MouseEvent,{body,imageId,x,y,author,width=0,height=0,}:createCommentParams) => {
    e.preventDefault();
    toastCommentId=toast.loading("Sending Comment...",{
      id:toastCommentId
    })
    socket.emit("new-comment",{body,imageId,author,x,y,width,height});
    toast.success("Comment Sent!",{
      id:toastCommentId
    })
    setOnCloseDialogue(true);
    setCommentDialogOpen(false);
  }

  const editComment=(e:MouseEvent,{body,imageId,commentId})=>{
    e.preventDefault();
    toastCommentId=toast.loading("Editing Comment...",{
      id:toastCommentId
    });
    console.log("ARGUMENTS:",{body,imageId,commentId});
    socket.emit("edit-comment",{body,imageId,commentId});
    toast.success("Comment Edited!",{
      id:toastCommentId
    });
    setEditDialogDetails({
      ...editDialogDetails,
      open:false
    })
  }

  const deleteComment=(e:MouseEvent,{commentId,imageId})=>{
    console.log("ARGUMENTS:",{commentId,imageId})
    e.preventDefault();
    toastCommentId=toast.loading("Deleting Comment...",{
      id:toastCommentId
    });
    socket.emit("delete-comment",{commentId,imageId});
    toast.success("Comment Deleted!",{
      id:toastCommentId
    });
    setEditDialogDetails({
      ...editDialogDetails,
      open:false
    })
  }
console.log("COMMENT DIALOG OPEN:",commentMode)
const handleMouseUp = () => {
setIsDrawing(false);
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");
  const annotation = {
    x: startX,
    y: startY,
  };
  
  if (commentMode) {
    
    if(onCloseDialogue){
      setDialogPosition({x:startX,y:startY});
      setCommentDialogOpen(true);
      setOnCloseDialogue(false);
    }
    // return () => {
    //   removeMarkerClick();
    // };
  }
  };
 useEffect(() => {
    function handleClickOutside(event) {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setOnCloseDialogue(true);
      }
    }

    function handleEditClickOutside(event) {
      if (editdialogRef.current && !editdialogRef.current.contains(event.target)) {
        setEditDialogDetails({
          ...editDialogDetails,
          open:false,
        })
      }
    }

    document.addEventListener('mousedown', !onCloseDialogue?handleClickOutside:handleEditClickOutside);

    return () => {
      document.removeEventListener('mousedown', ! onCloseDialogue?handleClickOutside:handleEditClickOutside);
    };
  }, []);


  console.log("EDIT MODE:",editMode,onCloseDialogue)
  
  return (
    <div className="relative">
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
    {console.log("ANNOTATIONS:",annotations)}
    {annotations.map((annotation, index) => (
      <Marker commentId={annotation?.id} comment={annotation?.body}  onHoverFunction={openCommentDialog}  closeDialouge={onCloseDialogue} key={index} x={annotation.x} y={annotation.y} number={index + 1} />
    ))}
     {commentDialogOpen && !onCloseDialogue && (
      <div style={{
        left:dialogPosition.x,
        top:dialogPosition.y
      }} className="absolute">
        <AddPost markPosition={dialogPosition} createMode={true} ref={dialogRef} author={userPrivateInfo} createComment={createComment} comment="" imageId={imageId} />
      </div>
      )}
      {
        onCloseDialogue && editDialogDetails?.open && (
              <div style={{
            left:editDialogDetails.x,
            top:editDialogDetails.y
          }} className="absolute">
          <AddPost ref={editdialogRef}  markPosition={dialogPosition} writeMode={true} createMode={false} author={userPrivateInfo} createComment={editComment} comment={editDialogDetails?.comment??""} imageId={imageId} commentId={editDialogDetails?.commentId} deleteComment={deleteComment} />
          </div>
        )
      }
    </div>
  );
};

export default ImageAnnotator;
