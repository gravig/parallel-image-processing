import shortid from "shortid";
import imageFromBase64 from "./imageFromBase64";

export default class ImageFragment {
  constructor(image) {
    this.image = image;
    this.key = shortid.generate();
    this.isLoading = false;
  }

  async setImageBase64(base64) {
    const img = await imageFromBase64(base64);

    this.image = img;
  }
}
