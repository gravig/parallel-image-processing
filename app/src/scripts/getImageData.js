export default function getImageData(image) {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d");

  context.beginPath();
  context.drawImage(image, 0, 0);
  context.stroke();
  context.closePath();

  const data = context.getImageData(0, 0, image.width, image.height);

  return data;
}
