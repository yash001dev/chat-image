import { useState } from "react";
import ImageAnnotator from "./ImageAnnotator";

const ImageAnnotationApp = ({ commentMode,url }) => {
  const [annotations, setAnnotations] = useState([]);
  const imageUrl =
    "https://cdn.pixabay.com/photo/2023/04/16/09/54/bird-7929733_960_720.jpg";

  const handleAnnotate = (annotation) => {
    setAnnotations((prevAnnotations) => [...prevAnnotations, annotation]);
  };

  return (
    <div>
      <ImageAnnotator
        commentMode={true}
        imageUrl={url??imageUrl}
        onAnnotate={handleAnnotate}
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
