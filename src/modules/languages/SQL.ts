import { FileHelper } from "../../helpers/FileHelper";
import projectSummary from "../../helpers/ProjectSummary";

export default function SQL(
  projectType: projectAppType,
  projectInfos: projectDetailsType
) {
  try {
    console.log(`Initialization of SQL project...`.blue);

    projectInfos.projectPath = FileHelper.createDir(projectInfos.projectPath);

    process.chdir(projectInfos.projectPath);

    FileHelper.createFile(
      `${projectInfos.projectName}.sql`,
      "-- SQL code goes here"
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
