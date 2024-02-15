import { useState } from "react";
import { coordsDiff, mouseCoords } from "./InputDevices.jsx";

export function Resizer({ dir, height, width, resize, x, y }) {
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

  const handleMouseMove = function (e) {
    if (resizerState.isResizing) {
      let newCoords = coordsDiff(resizerState.startMousePos, mouseCoords(e));

      resize(dir)(newCoords);
      setResizerState({
        ...resizerState,
        ...{
          startMousePos: mouseCoords(e),
        },
      });
      e.stopPropagation();
    }
  };

  const handleMouseUp = function () {
    setResizerState({ ...resizerState, ...{ isResizing: false } });
  };

  let resizeHandle = (
    <div
      className="resizer"
      style={style}
      onMouseOverCapture={() => {
        setResizerState({ ...resizerState, isMouseOver: true });
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

  let resizeWrapper = (
    <div
      className={"resize-overlay"}
      style={{
        marginLeft: -x + "px",
        marginTop: -y + "px",
        paddingLeft: x + "px",
        paddingTop: y + "px",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {resizeHandle}
    </div>
  );
  return resizerState.isResizing ? resizeWrapper : resizeHandle;
}
