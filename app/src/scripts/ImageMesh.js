import { cloneDeep } from "lodash";
import ImageFragment from "./ImageFragment";

export default class ImageMesh {
  constructor(image) {
    this.root = new ImageFragment(image);
  }

  divide = async (maxDepth = 1) => {
    return this.root.divide(0, maxDepth);
  };

  cloneDeep() {
    return cloneDeep(this);
  }
}
