import shortid from "shortid";
import splitImage from "./splitImage";

export default class ImageMesh {
  constructor(image) {
    image.key = shortid.generate();

    this.images = [image];
  }

  divide = async (maxDepth, currentDepth = 0) => {
    if (maxDepth <= currentDepth) return;

    const fragments = await Promise.all(
      this.images.map((image) => splitImage(image))
    );

    this.images = fragments.reduce((agg, chunk) => [...agg, ...chunk], []);

    return this.divide(maxDepth, currentDepth + 1);
  };
}
