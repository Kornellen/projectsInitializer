import { FileHelper } from "../../helpers/FileHelper";
import projectSummary from "../../helpers/ProjectSummary";

export default function Pwsh(
  projectType: projectAppType,
  projectInfos: projectDetailsType
) {
  try {
    console.log(`Initialization of PowerShell project...`.blue);
    projectInfos.projectPath = FileHelper.createDir(projectInfos.projectPath);

    FileHelper.createFile(
      `${projectInfos.projectPath}/script.ps1`,
      "# PowerShell script code goes here"
    );
    projectSummary(projectInfos, projectType);
  } catch (error) {
    FileHelper.cleanUpInCaseOfError(
      projectInfos.projectPath,
      error instanceof Error
        ? error.message
        : new Error(
            `There was an error creating ${projectInfos.language} project`
          )
    );
  }
}
