import c from "chalk";

export default function log(...messages) {
  const parsed = messages.map((message) => {
    if (typeof message === "object") {
      return Object.keys(message).reduce(
        (prev, key) =>
          `${prev} ${c.red(key)}${c.white("=")}${c.whiteBright(message[key])}`,
        ""
      );
    }
    return message;
  });

  console.log(parsed.join(" "));
}
