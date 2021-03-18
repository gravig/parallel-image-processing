import imageFromBase64 from "./imageFromBase64";

export default function imageFromFile(file) {
  const fr = new FileReader();

  const promise = new Promise((res) => {
    fr.onload = () => imageFromBase64(fr.result).then(res);
  });

  fr.readAsDataURL(file);

  return promise;
}
