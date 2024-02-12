import { X_OFFSET, Y_OFFSET } from "./Constants.jsx";

export function mouseCoords(e) {
  return [e.clientX - X_OFFSET, e.clientY - Y_OFFSET];
}

export function coordsDiff(coords1, coords2){
  return [coords2[0] - coords1[0], coords2[1] - coords1[1]];
}

