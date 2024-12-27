import inquirer from "inquirer";
import { createDir, createFile } from "../../helpers/createDirsFiles";
import { execSync } from "child_process";
import additionalLibraries from "../../helpers/additionalLibraries";
import projectSummary from "../../helpers/creatingSummary";
import ErrorHandler from "../../helpers/ErrorHandler";

export default async function Python(
  projectType: "Plain",
  projectInfos: { projectName: string; projectPath: string }
) {
  try {
    projectInfos.projectPath = createDir(projectInfos.projectPath);

    process.chdir(projectInfos.projectPath);

    createFile(`main.py`, "# Python code goes here");

    const { isVenv } = await inquirer.prompt({
      type: "confirm",
      name: "isVenv",
      message: "Is your app use virual environment for packages?",
      default: true,
    });

    if (isVenv) {
      try {
        console.log("Creating virtual environment...".blue);
        execSync("python -m venv venv");
      } catch (error) {
        new ErrorHandler(
          error,
          `There was an error creating the Python Virtual Environment`
        ).handleError();
      }
    }

    const { isAdditionalLibraries } = await inquirer.prompt({
      type: "confirm",
      name: "isAdditionalLibraries",
      message: "Is your app use additional libraries?",
    });

    if (isAdditionalLibraries) {
      additionalLibraries("Python");
    }

    await projectSummary(projectInfos, projectType);
  } catch (error) {
    new ErrorHandler(
      error,
      `There was an error creating the Python project`
    ).handleError();
  }
}
