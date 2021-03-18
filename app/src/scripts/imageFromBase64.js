export default function imageFromBase64(base64) {
  const image = new Image();
  image.src = base64;

  return new Promise((res) => {
    image.onload = () => res(image);
  });
}
