const flr = (v) => Math.floor(v);

class Area {
  constructor(image, maxDepth = 0) {
    this.subareas = [];
    this.image = image;
    this.maxDepth = maxDepth;
    this.isDivided = false;
  }

  forEachFragment(fn) {
    if (this.isDivided) {
      this.subareas.forEach((area) => {
        area.forEachFragment(fn);
      });
    } else {
      fn(this);
    }
  }

  subdivide(depth = 0) {
    const { maxDepth } = this;

    if (depth === maxDepth) return;
    const { width: w, height: h } = this.image;
    console.log(`Subdividing image...`);

    this.isDivided = true;

    Promise.all([
      Area.getImageFragment(this.image, 0, 0, flr(w / 2), flr(h / 2)),
      Area.getImageFragment(this.image, 0, flr(h / 2) + 1, flr(w / 2), h),
      Area.getImageFragment(this.image, flr(w / 2) + 1, 0, w, flr(h / 2)),
      Area.getImageFragment(this.image, flr(w / 2) + 1, flr(h / 2) + 1, w, h),
    ]).then((images) => {
      this.subareas = images.map((img) => new Area(img, maxDepth));

      this.subareas.forEach((area) => {
        // document.getElementById("tmp").append(area.image);
        area.subdivide(depth + 1, maxDepth);
      });
    });
  }

  static getImageFragment(img, sx, sy, ex, ey) {
    console.log(`get image fragment ${sx} ${sy} ${ex} ${ey}`);
    return new Promise((res, rej) => {
      let canvas = document.createElement("canvas");
      const { width, height } = img;
      canvas.width = width;
      canvas.height = height;

      let ctx = canvas.getContext("2d");
      const result = document.createElement("img");

      ctx.drawImage(img, 0, 0, width, height);
      const data = ctx.getImageData(sx, sy, ex, ey);

      canvas = document.createElement("canvas");
      canvas.width = ex - sx + 1;
      canvas.height = ey - sy + 1;
      ctx = canvas.getContext("2d");

      ctx.putImageData(data, 0, 0);

      result.src = canvas.toDataURL();

      result.onload = () => {
        res(result);
      };
    });
  }
}
