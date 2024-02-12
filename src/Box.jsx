import "./InputDevices.jsx";
import { useState } from "react";
import { coordsDiff, mouseCoords } from "./InputDevices.jsx";
import { Resizer } from "./Resizer.jsx";
import { BOX_RESIZE_HANDLES } from "./Constants.jsx";

export default function Box({ x, y, width, height, id }) {
  const initialState = {
    id,
    isMouseOver: false,
    isMoving: false,
    isSelected: false,
    hasMoved: false,
    x: x,
    y: y,
    width: width,
    height: height,
  };

  let [boxState, setBoxState] = useState(initialState);

  let divStyle = {
    left: boxState.x + "px",
    top: boxState.y + "px",
    height: boxState.height + "px",
    width: boxState.width + "px",
    cursor: boxState.isMoving ? "move" : "default",
    zIndex: boxState.id * 10,
  };

  function resizeBox(resizer) {
    return (handleOffset) => {
      let newDims = resizer.resizeDims({
        ...boxState,
        handleOffset: handleOffset,
      });
      setBoxState({ ...boxState, ...newDims });
    };
  }

  return (
    <div
      className={
        boxState.isSelected ? "whiteboard-box selected" : "whiteboard-box"
      }
      style={divStyle}
      onMouseOverCapture={() => {
        setBoxState({ ...boxState, isMouseOver: true });
      }}
      onMouseOutCapture={() => {
        setBoxState({
          ...boxState,
          ...{
            isMouseOver: false,
            isMoving: false,
          },
        });
      }}
      onMouseDown={(e) => {
        if (boxState.isSelected) {
          setBoxState({
            ...boxState,
            ...{
              isMoving: true,
              startMousePos: mouseCoords(e),
              startX: boxState.x,
              startY: boxState.y,
            },
          });
        }
      }}
      onMouseUp={() => {
        setBoxState({ ...boxState, ...{ isMoving: false } });
      }}
      onMouseMove={(e) => {
        if (boxState.isMoving) {
          let newCoords = coordsDiff(boxState.startMousePos, mouseCoords(e));

          setBoxState({
            ...boxState,
            ...{
              x: boxState.startX + newCoords[0],
              y: boxState.startY + newCoords[1],
              hasMoved: true,
            },
          });
        }
      }}
      onClick={(e) => {
        if (!boxState.hasMoved) {
          setBoxState({
            ...boxState,
            isSelected: !boxState.isSelected,
          });
        } else {
          setBoxState({ ...boxState, hasMoved: false });
        }
        e.preventDefault();
        e.stopPropagation();
      }}
      onDoubleClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {boxState.isSelected
        ? Object.keys(BOX_RESIZE_HANDLES).map((k) => (
            <Resizer
              key={k}
              dir={BOX_RESIZE_HANDLES[k]}
              x={boxState.x}
              y={boxState.y}
              height={boxState.height}
              width={boxState.width}
              resize={resizeBox}
            />
          ))
        : null}
    </div>
  );
}
