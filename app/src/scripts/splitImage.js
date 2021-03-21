import getImageFragment from "./getImageFragment";

const f = (v) => Math.floor(v);

/**
 * Splits image in two subimages
 * Returns array of images
 */
export default function splitImage(image) {
  const { width: w, height: h } = image;

  return Promise.all([
    getImageFragment(image, 0, 0, f(w / 2), f(h / 2)),
    getImageFragment(image, f(w / 2), 0, w, f(h / 2)),
    getImageFragment(image, 0, f(h / 2), f(w / 2), h),
    getImageFragment(image, f(w / 2), f(h / 2), w, h),
  ]);
}
