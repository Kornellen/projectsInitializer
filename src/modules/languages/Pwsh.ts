import { createDir, createFile } from "../../helpers/createDirsFiles";
import projectSummary from "../../helpers/creatingSummary";
import ErrorHandler from "../../helpers/ErrorHandler";

export default async function Pwsh(
  projectType: "Plain",
  projectInfos: { projectName: string; projectPath: string }
) {
  try {
    console.log(`Initialization of PowerShell project...`.blue);
    projectInfos.projectPath = createDir(projectInfos.projectPath);

    createFile(
      `${projectInfos.projectPath}/script.ps1`,
      "# PowerShell script code goes here"
    );
    await projectSummary(projectInfos, projectType);
  } catch (error) {
    new ErrorHandler(
      error,
      `There was an error creating the PowerShell project`
    ).handleError();
  }
}
