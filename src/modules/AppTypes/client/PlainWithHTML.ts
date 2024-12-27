import { createFile } from "../../../helpers/createDirsFiles";
import ErrorHandler from "../../../helpers/ErrorHandler";

export default async function PlainWithHTMl() {
  try {
    const files = [
      { file: "index.html", content: `<script src="./app.js"></script>` },
      { file: "style.css", content: "/*CSS Stylesheet*/" },
      { file: "app.js", content: "// JavaScript code" },
    ];
    files.forEach((file) => {
      createFile(file.file, file.content);
    });
  } catch (error) {
    new ErrorHandler(
      error,
      "There was an error creating the Plain Js with HTML project"
    ).handleError();
  }
}
