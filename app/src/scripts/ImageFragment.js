import shortid from "shortid";
import imageFromBase64 from "./imageFromBase64";
import splitImage from "./splitImage";

export default class ImageFragment {
  constructor(image) {
    this.image = image;
    this.key = shortid.generate();
    this.isLoading = false;
    this.isDivided = false;
    this.fragments = [];
  }

  forEachFragment = async (fn) => {
    if (!this.isDivided) return fn(this);

    return Promise.all(this.fragments.map((f) => f.forEachFragment(fn)));
  };

  divide = async (depth, maxDepth = 1) => {
    if (depth >= maxDepth) return Promise.resolve();
    this.isDivided = true;

    this.fragments = await (await splitImage(this.image)).map(
      (f) => new ImageFragment(f)
    );

    return Promise.all(
      this.fragments.map((fragment) => fragment.divide(depth + 1, maxDepth))
    );
  };

  async setImageBase64(base64) {
    const img = await imageFromBase64(base64);

    this.image = img;
  }
}
