export default function imageFromData(imageData, w, h) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  ctx.putImageData(imageData, 0, 0);
  const dataUrl = canvas.toDataURL();

  return dataUrl;
}
