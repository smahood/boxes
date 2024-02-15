import { useState } from "react";
import "./App.css";
import Box from "./Box.jsx";
import Selection from "./Selection.jsx";
import "./InputDevices.jsx";
import { coordsDiff, mouseCoords } from "./InputDevices.jsx";
import SelectionBoundary, { calcBoundary } from "./SelectionBoundary.jsx";

const initialBoxes = [
  {
    x: 50,
    y: 20,
    width: 100,
    height: 100,
    id: 1,
  },
];

const initialSelectionState = {
  isSelecting: false,
  isMoving: false,
  mouseMoved: false,
  startX: 0,
  startY: 0,
  x: 0,
  y: 0,
  width: 1,
  height: 1,
  selectedBoxIds: [],
};

const boundariesIntersect = function (
  { x: x1, y: y1, width: width1, height: height1 },
  { x: x2, y: y2, width: width2, height: height2 },
) {
  let xIntersects =
    (x1 < x2 && x2 < x1 + width1) || (x2 < x1 && x1 < x2 + width2);
  let yIntersects =
    (y1 < y2 && y2 < y1 + height1) || (y2 < y1 && y1 < y2 + height2);
  return xIntersects && yIntersects;
};

const boundariesDiff = function (
  { x: x1, y: y1, width: width1, height: height1 },
  { x: x2, y: y2, width: width2, height: height2 },
) {
  return {
    x: (x2 || x1) - (x1 || x2),
    y: (y2 || y1) - (y1 || y2),
    width: (width2 || width1) - (width1 || width2),
    height: (height2 || height1) - (height1 || height2),
  };
};

const boxesIntersectingBoundary = function (selectionBounds, boxes) {
  return boxes.filter((b) => boundariesIntersect(selectionBounds, b));
};

function calcSelectionBoundary([startX, startY], [currX, currY]) {
  return {
    x: startX < currX ? startX : currX,
    y: startY < currY ? startY : currY,
    width: Math.abs(currX - startX),
    height: Math.abs(currY - startY),
  };
}

function getSelectedBoxes({ boxes, selectionState }) {
  return boxes.filter((box) => selectionState.selectedBoxIds.includes(box.id));
}

function handleStartSelecting({ coords, selectionState }) {
  return {
    ...selectionState,
    startX: coords[0],
    startY: coords[1],
    isSelecting: true,
    isMoving: false,
    mouseMoved: false,
  };
}

function handleSelecting({ coords, selectionState, boxes }) {
  return {
    ...selectionState,
    ...calcSelectionBoundary(
      [selectionState.startX, selectionState.startY],
      coords,
    ),
    selectedBoxIds: boxesIntersectingBoundary(selectionState, boxes).map(
      (box) => box.id,
    ),
  };
}

function handleStopSelecting({ selectionState }) {
  return {
    ...selectionState,
    isSelecting: false,
    startX: 0,
    startY: 0,
    width: 1,
    height: 1,
  };
}

function handleStartMoving({ coords, selectionState }) {
  return {
    ...selectionState,
    startX: coords[0],
    startY: coords[1],
    x: coords[0],
    y: coords[1],
    isMoving: true,
  };
}

function handleMoving({ coords, selectionState, boxes }) {
  let offset = coordsDiff([selectionState.x, selectionState.y], coords);

  return selectionState.selectedBoxIds.map((id) => {
    let box = boxes.find((b) => b.id === id);
    box.x = box.x + offset[0];
    box.y = box.y + offset[1];
  });
}

function handleStopMoving({ selectionState }) {
  return {
    ...selectionState,
    isMoving: false,
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  };
}

function handleResizing({ boxes, updateBoxes, selectionState }) {
  return (newDimensions) => {
    let selectedBoxes = getSelectedBoxes({
      boxes: boxes,
      selectionState: selectionState,
    });
    let boundary = calcBoundary(selectedBoxes);
    let diff = boundariesDiff(boundary, newDimensions);
    let resizedBoxes = selectedBoxes.map((box) => {
      let percentWidth = box.width / boundary.width;
      let percentHeight = box.height / boundary.height;
      let percentOffsetX = (box.x - boundary.x) / boundary.width;
      let percentOffsetY = (box.y - boundary.y) / boundary.height;
      return {
        ...box,
        x:
          box.x +
          diff.x * percentOffsetX +
          diff.x * (1 - percentOffsetX) +
          diff.width * percentOffsetX,
        y:
          box.y +
          +diff.y * percentOffsetY +
          diff.y * (1 - percentOffsetY) +
          diff.height * percentOffsetY,
        width: box.width + diff.width * percentWidth,
        height: box.height + diff.height * percentHeight,
      };
    });
    updateBoxes(resizedBoxes);
  };
}

function WhiteBoard() {
  const [boxes, setBoxes] = useState(initialBoxes);
  const [selectionState, setSelectionState] = useState(initialSelectionState);

  function addBox({ x, y, width, height, id }) {
    setBoxes([
      ...boxes,
      {
        x: x,
        y: y,
        width: width,
        height: height,
        id: id,
      },
    ]);
  }

  function updateResizedBoxes(resizedBoxes) {
    let newBoxes = [...boxes];

    resizedBoxes.map((box) => {
      let index = boxes.findIndex((b) => b.id === box.id);
      newBoxes[index] = box;
    });

    setBoxes(newBoxes);
  }

  return (
    <div
      id="whiteboard"
      onDoubleClick={(e) => {
        let coords = mouseCoords(e);
        addBox({
          x: coords[0],
          y: coords[1],
          width: 100,
          height: 100,
          id: boxes.length + 1,
        });
      }}
      onMouseDown={(e) => {
        let coords = mouseCoords(e);
        let boxesAtCoords = boxesIntersectingBoundary(
          calcSelectionBoundary(coords, coords),
          boxes,
        );
        let mouseDownOnSelection =
          boxesAtCoords.length === 1 &&
          selectionState.selectedBoxIds.some(
            (id) => id === boxesAtCoords[0].id,
          );

        if (mouseDownOnSelection) {
          setSelectionState(
            handleStartMoving({
              coords: coords,
              selectionState: selectionState,
            }),
          );
        } else
          setSelectionState(
            handleStartSelecting({
              coords: coords,
              selectionState: selectionState,
            }),
          );
      }}
      onMouseMove={(e) => {
        let coords = mouseCoords(e);
        if (selectionState.isSelecting) {
          setSelectionState(
            handleSelecting({
              coords: coords,
              selectionState: selectionState,
              boxes: boxes,
            }),
          );
        } else if (selectionState.isMoving) {
          handleMoving({
            coords: coords,
            selectionState: selectionState,
            boxes: boxes,
          });
          setSelectionState({ ...selectionState, x: coords[0], y: coords[1] });
        }
      }}
      onMouseUp={() => {
        if (selectionState.isSelecting) {
          setSelectionState(
            handleStopSelecting({ selectionState: selectionState }),
          );
        }
        if (selectionState.isMoving) {
          setSelectionState(
            handleStopMoving({ selectionState: selectionState }),
          );
        }
      }}
    >
      {boxes.map((props) => {
        let isSelected = selectionState.selectedBoxIds.some(
          (id) => id === props.id,
        );
        let boxState = {
          ...props,
          key: props.id,
          isSelected: isSelected,
        };
        return <Box {...boxState}></Box>;
      })}

      {selectionState.isSelecting && (
        <Selection {...selectionState}>Selection</Selection>
      )}
      <SelectionBoundary
        handleResizing={handleResizing({
          boxes: boxes,
          updateBoxes: updateResizedBoxes,
          selectionState: selectionState,
        })}
        selectedBoxes={getSelectedBoxes({
          boxes: boxes,
          selectionState: selectionState,
        })}
      ></SelectionBoundary>
    </div>
  );
}

function App() {
  return WhiteBoard();
}

export default App;
