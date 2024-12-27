import { createFile } from "../../../helpers/createDirsFiles";

export default async function PlainWithHTMl() {
  const files = [
    { file: "index.html", content: `<script src="./app.js"></script>` },
    { file: "style.css", content: "/*CSS Stylesheet*/" },
    { file: "app.js", content: "// JavaScript code" },
  ];
  files.forEach((file) => {
    createFile(file.file, file.content);
  });
}
