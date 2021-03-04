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

        area = new Area(img, 2);
        area.subdivide();
      };
    };

    reader.readAsDataURL(file);
  };

  start.addEventListener("click", () => {
    if (!area) throw new Error(`Image undefined`);

    area.forEachFragment((area) => {
      socket.emit("image", area.image.src, (result) => {
        console.log({ result });
      });
    });

    // socket.emit("image", { image: "elo" });
  });

  socket.on("process-image", (image) => {
    console.log({ image });
  });
};
