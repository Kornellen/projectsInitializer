import { execSync } from "child_process";
import projectSummary from "../../helpers/ProjectSummary";
import { FileHelper } from "../../helpers/FileHelper";
import { UserInterations } from "../../helpers/UserInteractions";
import { DependencyInstaller } from "../../helpers/DependencyInstaller";
export default async function Python(
  projectType: projectAppType,
  projectInfos: projectDetailsType
) {
  try {
    projectInfos.projectPath = FileHelper.createDir(projectInfos.projectPath);

    process.chdir(projectInfos.projectPath);

    FileHelper.createFile(`main.py`, "# Python code goes here");

    const { isVenv } = await UserInterations.prepareQuestion(
      {
        type: "confirm",
        name: "isVenv",
        message:
          "Would you like to create Virttual Environment for dependencies?",
      },
      { default: true }
    );

    if (isVenv) {
      try {
        console.log("Creating virtual environment...".blue);
        execSync("python -m venv venv");
      } catch (error) {
        throw new Error(
          `There was an error creating the Python Virtual Environment!\n${error}`
        );
      }
    }

    const { isAdditionalLibraries } = await UserInterations.prepareQuestion(
      {
        type: "confirm",
        name: "isAdditionalLibraries",
        message: "Are you using any of additional dependencies?",
      },
      { default: false }
    );

    if (isAdditionalLibraries)
      await DependencyInstaller.dependencyHandler("Python");

    projectSummary(projectInfos, projectType);
  } catch (error) {
    throw new Error(`There was an error creating the Python project\n${error}`);
  }
}
