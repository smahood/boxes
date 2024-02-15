export const X_OFFSET = 20;
export const Y_OFFSET = 20;
const V_RESIZE_DIM = [20, 10];
const H_RESIZE_DIM = [10, 20];
const CORNER_RESIZE_DIM = [10, 10];

export const BOX_RESIZE_HANDLES = {
  n: {
    cursor: "ns-resize",
    left: (width) => width / 2 - V_RESIZE_DIM[0] / 2,
    top: () => -V_RESIZE_DIM[1] / 2 - 1,
    width: V_RESIZE_DIM[0],
    height: V_RESIZE_DIM[1],
    resizeDims: ({ y, height, handleOffset }) => {
      return { y: y + handleOffset[1], height: Math.max(height - handleOffset[1], 0) };
    },
  },
  e: {
    cursor: "ew-resize",
    left: (width) => width - H_RESIZE_DIM[0] / 2 - 2,
    top: (height) => height / 2 - H_RESIZE_DIM[1] / 2,
    width: H_RESIZE_DIM[0],
    height: H_RESIZE_DIM[1],
    resizeDims: ({ x, width, handleOffset }) => {
      return { x: x, width: Math.max(width + handleOffset[0], 0) };
    },
  },
  w: {
    cursor: "ew-resize",
    left: () => -(H_RESIZE_DIM[0] / 2) - 1,
    top: (height) => height / 2 - H_RESIZE_DIM[1] / 2,
    width: H_RESIZE_DIM[0],
    height: H_RESIZE_DIM[1],
    resizeDims: ({ x, width, handleOffset }) => {
      return { x: x + handleOffset[0], width: Math.max(width - handleOffset[0],0) };
    },
  },
  s: {
    cursor: "ns-resize",
    left: (width) => width / 2 - V_RESIZE_DIM[0] / 2,
    top: (height) => height - V_RESIZE_DIM[1] / 2 - 2,
    width: V_RESIZE_DIM[0],
    height: V_RESIZE_DIM[1],
    resizeDims: ({ height, handleOffset }) => {
      return { height: height + handleOffset[1] };
    },
  },
  nw: {
    cursor: "nwse-resize",
    left: () => 0 - CORNER_RESIZE_DIM[0] / 2,
    top: () => 0 - CORNER_RESIZE_DIM[1] / 2,
    width: CORNER_RESIZE_DIM[0],
    height: CORNER_RESIZE_DIM[1],
    resizeDims: ({ x, y, width, height, handleOffset }) => {
      return {
        x: x + handleOffset[0],
        y: y + handleOffset[1],
        width: Math.max(width - handleOffset[0],0),
        height: Math.max(height - handleOffset[1],0),
      };
    },
  },
  ne: {
    cursor: "nesw-resize",
    left: (width) => width - CORNER_RESIZE_DIM[0] / 2 - 2,
    top: () => 0 - CORNER_RESIZE_DIM[1] / 2,
    width: CORNER_RESIZE_DIM[0],
    height: CORNER_RESIZE_DIM[1],
    resizeDims: ({ y, width, height, handleOffset }) => {
      return {
        width: Math.max(width + handleOffset[0],0),
        y: y + handleOffset[1],
        height: Math.max(height - handleOffset[1],0),
      };
    },
  },
  sw: {
    cursor: "nesw-resize",
    left: () => 0 - CORNER_RESIZE_DIM[0] / 2 - 1,
    top: (height) => height - CORNER_RESIZE_DIM[1] / 2 - 2,
    width: CORNER_RESIZE_DIM[0],
    height: CORNER_RESIZE_DIM[1],
    resizeDims: ({ x, width, height, handleOffset }) => {
      return {
        x: x + handleOffset[0],
        width: Math.max(width - handleOffset[0],0),
        height: Math.max(height + handleOffset[1],0),
      };
    },
  },
  se: {
    cursor: "nwse-resize",
    left: (width) => width - CORNER_RESIZE_DIM[0] / 2 - 2,
    top: (top) => top - CORNER_RESIZE_DIM[1] / 2 - 2,
    width: CORNER_RESIZE_DIM[0],
    height: CORNER_RESIZE_DIM[1],
    resizeDims: ({ width, height, handleOffset }) => {
      return {
        width: Math.max(width + handleOffset[0],0),
        height: Math.max(height + handleOffset[1],0),
      };
    },
  },
};
