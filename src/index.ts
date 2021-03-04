import App from "./App";

const PORT = process.env.PORT || 3000;
const app = new App();

app.getServer().listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
