import "./InputDevices.jsx";

export default function Box({ x, y, width, height, id, isSelected, isMoving }) {
  let divStyle = {
    left: x + "px",
    top: y + "px",
    height: height + "px",
    width: width + "px",
    cursor: isMoving ? "move" : "default",
    zIndex: id * 10,
  };

  return (
    <div
      className={isSelected ? "whiteboard-box selected" : "whiteboard-box"}
      style={divStyle}
    ></div>
  );
}
