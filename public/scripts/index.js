const getImageData = (image) => {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0);
  ctx.stroke();

  return ctx.getImageData(0, 0, image.width, image.height);
};

const imageFromData = (imageData, w, h) => {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  ctx.putImageData(imageData, 0, 0);
  const dataUrl = canvas.toDataURL();

  return dataUrl;
};

const transform = (image) =>
  new Promise((res) => {
    const imageData = getImageData(image);

    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = 0;
    }

    const src = imageFromData(imageData, image.width, image.height);

    setTimeout(() => {
      res(src);
    }, 7000);
  });

window.onload = () => {
  const WIDTH = 960;
  const HEIGHT = 480;
  const socket = io("http://localhost:3000/");
  const input = document.getElementById("input");
  const start = document.getElementById("start");
  // canvas
  const canvas = document.getElementById("preview");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const context = canvas.getContext("2d");
  let area = null;

  input.onchange = (e) => {
    const files = e.target.files;
    if (files.length <= 0) return;

    const img = document.createElement("img");
    const file = files[0];
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result;

      img.onload = () => {
        context.drawImage(img, 0, 0);
        context.stroke();

        area = new Area(img, 1);
        area.subdivide();
      };
    };

    reader.readAsDataURL(file);
  };

  start.addEventListener("click", () => {
    if (!area) throw new Error(`Image undefined`);

    area.forEachFragment((area) => {
      socket.emit("image", area.image.src, (result) => {
        const img = document.createElement("img");
        img.src = result;

        img.onload = () => {
          document.getElementById("tmp").append(img);
        };
      });
    });
  });

  socket.on("process-image", (image, callback) => {
    // change image here
    const img = document.createElement("img");
    img.src = image;

    img.onload = () => {
      transform(img).then((r) => {
        img.src = r;
        document.getElementById("tmp").append(img);
        callback(r);
      });
    };
  });
};
