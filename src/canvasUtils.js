const getPixelRatio = () => {
  var ctx = document.createElement("canvas").getContext("2d"),
    dpr = window.devicePixelRatio || 1,
    bsr = ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio || 1;

  return dpr / bsr;
}

export const createHiDPICanvas = (
  width,
  height,
  baseCanvas = document.createElement("canvas"),
  ratio = getPixelRatio()) => {
  const hdCanvas = baseCanvas;
  hdCanvas.width = width * ratio;
  hdCanvas.height = height * ratio;
  hdCanvas.style.width = width + "px";
  hdCanvas.style.height = height + "px";
  hdCanvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
  return hdCanvas;
}

export const registerRegion = (
  xPos, yPos, xLength, yLength, blocks
) => {
  const rect = { xPos, yPos, xLength, yLength };
  if (rect.x === undefined) return blocks;
  if (blocks[rect.x]) {
    blocks[rect.x].shapes.push(curr);
    blocks[rect.x].endEdge = Math.max(blocks[rect.x].endEdge, rect.width + rect.x)
  } else blocks[rect.x] = {
    shapes: [rect],
    startEdge: rect.x,
    endEdge: rect.width + rect.x
  };
  blocks.push(rect);
}
