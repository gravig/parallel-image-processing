import { cloneDeep } from "lodash";
import ImageFragment from "./ImageFragment";
import splitImage from "./splitImage";

export default class ImageMesh {
  constructor(image) {
    this.images = [new ImageFragment(image)];
  }

  divide = async (maxDepth, currentDepth = 0) => {
    if (maxDepth <= currentDepth) return;

    const fragments = await Promise.all(
      this.images.map((fragment) => splitImage(fragment.image))
    );

    const reduceFn = (agg, images) => {
      return [...agg, ...images.map((image) => new ImageFragment(image))];
    };

    this.images = fragments.reduce(reduceFn, []);

    return this.divide(maxDepth, currentDepth + 1);
  };

  cloneDeep() {
    return cloneDeep(this);
  }
}
