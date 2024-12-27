import { execSync } from "child_process";
import inquirer from "inquirer";
import { npmPackageInstaller } from "../../../helpers/packageInstallers";
import additionalLibraries from "../../../helpers/additionalLibraries";
import { createDir } from "../../../helpers/createDirsFiles";

export default async function ServerApp(language: "JavaScript" | "TypeScript") {
  execSync("npm init -y");

  const { isHTTPS } = await inquirer.prompt({
    type: "confirm",
    name: "isHTTPS",
    message: "Is Backend APP use HTTPS Protocol?",
  });

  const typeScriptPack = [
    "typescript",
    "ts-node",
    "tsc",
    "@types/node",
    "@types/express",
    "@types/cors",
    "@types/express-validator",
  ];

  const dirs = [
    "src",
    "src/config",
    "src/routes",
    "src/controllers",
    "src/middlewares",
    "src/helpers",
  ];

  const defautlLib = [
    "express",
    "express-validator",
    "cors",
    "dotenv",
    "https",
    "http",
  ];

  if (language === "TypeScript") {
    try {
      npmPackageInstaller(true, typeScriptPack);

      execSync("tsc --init");
    } catch (error) {}
  }

  npmPackageInstaller(false, defautlLib);

  const { isAdditionalLibraries } = await inquirer.prompt({
    type: "confirm",
    name: "isAdditionalLibraries",
    message: `Is Backend App use other libraries? (Currently installed: ${
      language === "TypeScript"
        ? defautlLib.concat(typeScriptPack).join(", ")
        : defautlLib.join(", ")
    })`,
  });

  if (isAdditionalLibraries) {
    additionalLibraries("JavaScript");
  }

  if (isHTTPS) {
    dirs.push("certificates");
  }

  dirs.forEach((dir) => {
    createDir(dir);
  });

  console.log(`Creating app at ${process.cwd()}...`);
}
