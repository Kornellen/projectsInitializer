import { createFile } from "../../../helpers/createDirsFiles";

export default async function PlainWithHTMl() {
  const files = ["index.html", "style.css", "app.js"];
  console.log("Hi");

  files.forEach((file) => {
    createFile(file);
  });
}
