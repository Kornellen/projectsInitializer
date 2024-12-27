import { createDir, createFile } from "../../helpers/createDirsFiles";
import projectSummary from "../../helpers/creatingSummary";
import ErrorHandler from "../../helpers/ErrorHandler";

export default async function SQL(
  projectType: "Plain",
  projectInfos: { projectName: string; projectPath: string }
) {
  try {
    console.log(`Initialization of SQL project...`.blue);
    projectInfos.projectPath = createDir(projectInfos.projectPath);
    process.chdir(projectInfos.projectPath);

    createFile(`database.db`, "-- SQL code goes here");

    await projectSummary(projectInfos, projectType);
  } catch (error) {
    new ErrorHandler(
      error,
      `There was an error creating the PowerShell project`
    ).handleError();
  }
}
