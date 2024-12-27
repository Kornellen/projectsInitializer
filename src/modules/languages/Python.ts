import inquirer from "inquirer";
import { createFile } from "../../helpers/createDirsFiles";
import fs from "fs";
import { execSync } from "child_process";
import additionalLibraries from "../../helpers/additionalLibraries";
import projectSummary from "../../helpers/creatingSummary";

export default async function Python(
  projectType: "Plain",
  projectInfos: { projectName: string; projectPath: string }
) {
  if (!fs.existsSync(projectInfos.projectPath)) {
    fs.mkdirSync(projectInfos.projectPath, { recursive: true });
  }

  createFile(`${projectInfos.projectPath}/main.py`, "# Python code goes here");

  const { isVenv } = await inquirer.prompt({
    type: "confirm",
    name: "isVenv",
    message: "Is your app use virual environment for packages?",
    default: true,
  });

  process.chdir(projectInfos.projectPath);

  if (isVenv) {
    execSync("python -m venv venv");

    console.log("Creating virtual environment...");
  }

  const { isAdditionalLibraries } = await inquirer.prompt({
    type: "confirm",
    name: "isAdditionalLibraries",
    message: "Is your app use additional libraries?",
  });

  if (isAdditionalLibraries) {
    additionalLibraries("Python");
  }

  projectSummary(projectInfos, projectType);
}
