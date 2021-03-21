import shortid from "shortid";

/** Returns image */
export default function getImageFragment(image, sx, sy, ex, ey) {
  let canvas = document.createElement("canvas");
  const { width, height } = image;
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d");
  const fragment = document.createElement("img");

  ctx.drawImage(image, 0, 0, width, height);
  const data = ctx.getImageData(sx, sy, ex, ey);

  canvas = document.createElement("canvas");
  canvas.width = ex - sx;
  canvas.height = ey - sy;
  ctx = canvas.getContext("2d");

  ctx.putImageData(data, 0, 0);

  fragment.key = shortid.generate();
  fragment.src = canvas.toDataURL();

  return new Promise((res) => {
    fragment.onload = () => res(fragment);
  });
}
