export default function imageToBase64(image) {
  return new Promise((res) => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    context.drawImage(image);

    res(canvas.toDataURL());
  });
}
