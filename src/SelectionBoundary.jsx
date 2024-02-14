import {BOX_RESIZE_HANDLES} from "./Constants.jsx";
import {Resizer} from "./Resizer.jsx";

function cssTransform({ x, y }) {
  return ["translate3d(", x, "px,", y, "px,", 0, ") "].join("");
}

function minPoint(box1, box2) {
  return [Math.min(box1.x, box2.x), Math.min(box1.y, box2.y)];
}
function maxPoint(box1, box2) {
  return [
    Math.max(box1.x + box1.width, box2.x + box2.width),
    Math.max(box1.y + box1.height, box2.y + box2.height),
  ];
}

export function calcBoundary(boxes) {
  if (boxes.length === 0){
    return {x:0, y:0, width: 0, height: 0};
  }
  return boxes.reduce((acc, curr) => {
    let [minX, minY] = minPoint(acc, curr);
    let [maxX, maxY] = maxPoint(acc, curr);
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  });
}


export default function SelectionBoundary({ selectedBoxes , handleResizing}) {
  let boundary = calcBoundary(selectedBoxes);

  let divStyle = {
    left: 0,
    top: 0,
    width: boundary.width + "px",
    height: boundary.height + "px",
    transform: cssTransform({ x: boundary.x, y: boundary.y }),
  };


  function resize(resizer) {
    return (handleOffset) => {
      let newDims = resizer.resizeDims({
        ...boundary,
        handleOffset: handleOffset,
      });
      handleResizing(newDims);
    };
  }

  return <div className="selection-boundary" style={divStyle}>

    {(selectedBoxes.length > 0) && Object.keys(BOX_RESIZE_HANDLES).map((k) => (
        <Resizer
            key={k}
            dir={BOX_RESIZE_HANDLES[k]}
            x={boundary.x}
            y={boundary.y}
            height={boundary.height}
            width={boundary.width}
            resize={resize}
        />
    ))}



  </div>;
}
