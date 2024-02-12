import { useState } from "react";
import "./App.css";
import Box from "./Box.jsx";

const initialBoxes = [
  {
    x: 50,
    y: 20,
    width: 100,
    height: 80,
    id: 1,
  },
];

function WhiteBoard() {
  const [boxes, setBoxes] = useState(initialBoxes);

  return (
    <div id="whiteboard">
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
