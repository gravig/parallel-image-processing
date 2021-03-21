import getImageData from "./getImageData";
import imageFromData from "./imageFromData";

export default function transform(image) {
  return new Promise((res) => {
    const imageData = getImageData(image);

    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = 0;
    }

    const src = imageFromData(imageData, image.width, image.height);

    setTimeout(() => {
      res(src);
    }, 2000);
  });
}
