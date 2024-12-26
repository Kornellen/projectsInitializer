import { execSync } from "child_process";
import fs from "fs";
import inquirer from "inquirer";
import additionalLibraries from "../../../helpers/additionalLibraries";

export default async function ConsoleApp() {
  execSync("npm init -y");

  const { isAdditionalLibraries } = await inquirer.prompt({
    type: "confirm",
    name: "isAdditionalLibraries",
    message: "Is your app use additional libraries?",
  });

  if (isAdditionalLibraries) {
    additionalLibraries("JavaScript");
  }

  fs.mkdir("./src", { recursive: true }, (err) => {
    if (err) {
      console.error(`Error creating - src/ - dir: ` + err);
    }
  });
}
