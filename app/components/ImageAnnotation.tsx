import { useState } from "react";
import ImageAnnotator from "./ImageAnnotator";

export interface ImageAnnotationAppProps{
    commentMode:boolean;
    url:string;
    imageId:number;
}

const ImageAnnotationApp = ({ commentMode,url,imageId }:ImageAnnotationAppProps) => {
  console.log("CM MODE:",commentMode)
  return (
    <div>
      <ImageAnnotator
        commentMode={commentMode}
        url={url}
        imageId={imageId}
      />
      {/* <ul>
        {annotations.map((annotation, index) => (
          <li key={index}>{JSON.stringify(annotation)}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default ImageAnnotationApp;
