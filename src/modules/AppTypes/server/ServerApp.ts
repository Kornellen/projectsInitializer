import { execSync } from "child_process";
import inquirer from "inquirer";
import { npmPackageInstaller } from "../../../helpers/packageInstallers";
import additionalLibraries from "../../../helpers/additionalLibraries";
import { createDir } from "../../../helpers/createDirsFiles";
import ErrorHandler from "../../../helpers/ErrorHandler";

function configureHTTPS(dirs: string[], isHTTPS: boolean) {
  if (isHTTPS) {
    dirs.push("certificates");
  }
}

async function setupTypeScript(typeScriptPack: string[]) {
  try {
    console.log("Setting up TypeScript...".blue);
    npmPackageInstaller(true, typeScriptPack);

    execSync("tsc --init");
  } catch (error) {
    new ErrorHandler(
      error,
      "There was an error setting up TypeScript"
    ).handleError();
  }
}

export default async function ServerApp(language: "JavaScript" | "TypeScript") {
  try {
    console.log("Initialization of Server App...".blue);
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
      await setupTypeScript(typeScriptPack);
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

    configureHTTPS(dirs, isHTTPS);

    console.log(`Creating app at ${process.cwd()}...`);

    dirs.forEach((dir) => {
      createDir(dir);
    });
  } catch (error) {
    new ErrorHandler(
      error,
      "There was an error creating Server App"
    ).handleError();
  }
}
