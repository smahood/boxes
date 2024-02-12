import { useState } from "react";
import "./App.css";
import Box from "./Box.jsx";
import "./InputDevices.jsx";
import { mouseCoords } from "./InputDevices.jsx";

const initialBoxes = [
  {
    x: 50,
    y: 20,
    width: 100,
    height: 100,
    id: 1,
  },
];

function WhiteBoard() {
  const [boxes, setBoxes] = useState(initialBoxes);

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

  return (
    <div
      id="whiteboard"
      onDoubleClick={(e) => {
        let [x, y] = mouseCoords(e);
        addBox({ x: x, y: y, width: 100, height: 100, id: boxes.length + 1 });
      }}
    >
      {boxes.map((props) => {
        return <Box key={props.id} {...props}></Box>;
      })}
    </div>
  );
}

function App() {
  return WhiteBoard();
}

export default App;
