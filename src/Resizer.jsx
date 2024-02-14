import { useState } from "react";
import { coordsDiff, mouseCoords } from "./InputDevices.jsx";

export function Resizer({ dir, height, width, resize }) {
  const initialState = {
    isMouseOver: false,
    isResizing: false,
  };

  let style = {
    backgroundColor: "lightgray",
    translate: dir.left(width) + "px " + dir.top(height) + "px",
    height: dir.height + "px",
    width: dir.width + "px",
    border: "solid 1px black",
    cursor: dir.cursor,
  };

  let [resizerState, setResizerState] = useState(initialState);

  return (
    <div
      className="resizer"
      style={style}
      onMouseOverCapture={() => {
        setResizerState({ ...resizerState, isMouseOver: true });
      }}
      onMouseOutCapture={() => {
        setResizerState({
          ...resizerState,
          ...{
            isMouseOver: false,
            isResizing: false,
          },
        });
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();

        setResizerState({
          ...resizerState,
          ...{
            isResizing: true,
            startMousePos: mouseCoords(e),
            startX: resizerState.x,
            startY: resizerState.y,
          },
        });
      }}
      onMouseUp={() =>
        setResizerState({ ...resizerState, ...{ isResizing: false } })
      }
      onMouseMove={(e) => {
        if (resizerState.isResizing) {
          let newCoords = coordsDiff(
            resizerState.startMousePos,
            mouseCoords(e),
          );

          resize(dir)(newCoords);
          setResizerState({
            ...resizerState,
            ...{
              startMousePos: mouseCoords(e),
            },
          });
        }
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDoubleClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    ></div>
  );
}
