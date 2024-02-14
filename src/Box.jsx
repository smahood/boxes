import "./InputDevices.jsx";
import { useState } from "react";
import { coordsDiff, mouseCoords } from "./InputDevices.jsx";

export default function Box({
  x,
  y,
  width,
  height,
  id,
  isSelected,
  isMoving,
  handleMove,
  handleResize,
}) {
  // const initialState = {
  //   id,
  //   isMouseOver: false,
  //   isMoving: false,
  //   hasMoved: false,
  //   // x: x,
  //   // y: y,
  //   width: width,
  //   height: height,
  // };

  // let [boxState, setBoxState] = useState(initialState);

  let divStyle = {
    left: x + "px",
    top: y + "px",
    height: height + "px",
    width: width + "px",
    cursor: isMoving ? "move" : "default",
    zIndex: id * 10,
  };

  // function resizeBox(resizer) {
  //   return (handleOffset) => {
  //     let newDims = resizer.resizeDims({
  //       ...boxState,
  //       handleOffset: handleOffset,
  //     });
  //     setBoxState({ ...boxState, ...newDims });
  //   };
  // }

  return (
    <div
      className={isSelected ? "whiteboard-box selected" : "whiteboard-box"}
      style={divStyle}
      // onMouseOverCapture={() => {
      //   setBoxState({ ...boxState, isMouseOver: true });
      // }}
      // onMouseOutCapture={() => {
      //   setBoxState({
      //     ...boxState,
      //     ...{
      //       isMouseOver: false,
      //       isMoving: false,
      //     },
      //   });
      // }}
      // onMouseDown={(e) => {
      //   if (isSelected) {
      //     setBoxState({
      //       ...boxState,
      //       ...{
      //         isMoving: true,
      //         startMousePos: mouseCoords(e),
      //         startX: x,
      //         startY: y,
      //       },
      //     });
      //   }
      // }}
      // onMouseUp={() => {
      //   setBoxState({ ...boxState, ...{ isMoving: false } });
      // }}
      // onMouseMove={(e) => {
      //   if (isMoving) {
      //     console.log("box onMouseMove");
      //     let newCoords = coordsDiff(boxState.startMousePos, mouseCoords(e));
      //
      //     handleMove({
      //       id: id,
      //       x: x + newCoords[0],
      //       y: x + newCoords[1],
      //     });
      //
      //     // setBoxState({
      //     //   ...boxState,
      //     //   ...{
      //     //     x: boxState.startX + newCoords[0],
      //     //     y: boxState.startY + newCoords[1],
      //     //     hasMoved: true,
      //     //   },
      //     // });
      //   }
      // }}
      // onClick={(e) => {
      //   if (!boxState.hasMoved) {
      //     setBoxState({
      //       ...boxState,
      //     });
      //   } else {
      //     setBoxState({ ...boxState, hasMoved: false });
      //   }
      //   e.preventDefault();
      //   e.stopPropagation();
      // }}
      // onDoubleClick={(e) => {
      //   e.preventDefault();
      //   e.stopPropagation();
      // }}
    ></div>
  );
}
