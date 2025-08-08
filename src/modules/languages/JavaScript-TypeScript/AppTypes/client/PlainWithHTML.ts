import { FileHelper } from "../../../../../helpers/FileHelper";

export default function PlainWithHTMl() {
  try {
    const files = [
      { file: "index.html", content: `<script src="./app.js"></script>` },
      { file: "style.css", content: "/*CSS Stylesheet*/" },
      { file: "app.js", content: "// JavaScript code" },
    ];
    files.forEach((file) => {
      FileHelper.createFile(file.file, file.content);
    });
  } catch (error) {
    throw new Error(`There was an error creating vanilla JavaScript Project`);
  }
}
