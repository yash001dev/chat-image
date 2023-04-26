import { useState } from "react";
import AddPost from "./AddPost";

const Marker = ({ x, y, number }) => {
  const size = 40;
  const fontSize = 18;
  const color = "#4299e1";
  const backgroundColor = "#f7fafc";
    let [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={(e) => {
        console.log("Mouse Hover is called.")
        setHovered(true);
      }}
      onMouseLeave={(e) => {
        setHovered(false);
      }}

      onClick={(e) => {
        console.log("Mouse click",e);

      }}
      className="border-solid border-2 text-teal-400  border-teal-400 hover:border-teal-600"
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor,
        borderRadius: "50%",
        // border: `2px solid ${color}`,
        fontSize,
        fontWeight: "bold",
        userSelect: "none",
       
      }}
    >
      {number}
      {/* {hovered && <div className="absolute"><AddPost /></div>} */}
    </div>
  );
};

export default Marker;