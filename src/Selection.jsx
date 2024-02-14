function cssTransform({ x, y }) {
  return ["translate3d(", x, "px,", y, "px,", 0, ") "].join("");
}

export default function Selection({ x, y, width, height }) {
  let divStyle = {
    left: 0,
    top: 0,
    width: width + "px",
    height: height + "px",
    transform: cssTransform({ x: x, y: y, width: width, height: height }),
  };

  return <div className="selection" style={divStyle}></div>;
}
